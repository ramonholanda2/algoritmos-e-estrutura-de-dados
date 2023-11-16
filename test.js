

import ABSL;
import AP.PDI.Utilities;
import AP.Common.GDT;
import AP.CRM.Global;
import BASIS.Global as basis;

foreach(var docusign in this) {
	// update the tokens
	docusign.getTokenJWTDocuSign();
	docusign.dateTimeLastRun = Context.GetCurrentSystemDateTime();

    // here I am doing a status negotiation
	if(docusign.envelopeStatus == "02" || docusign.envelopeStatus == "03") {
		docusign.msgError = "Este envelope já está concluído. Status - " + docusign.envelopeStatus.GetDescription();
		raise MsgDocuSign.Create("W", docusign.msgError);
		continue;
	}

    // we will reuse the same scenario and communication system created previously
	var ScenarioName = "ManageEnvelopeCS";
	var ServiceName = "ManageEnvelopeWithDocuSign";
	var HttpMethod = "GET";
	// adds the parameters to fetch the status of the envelope UserId + /envelopes/ + EnvelopeID
    // we already know that the UserId is the same as previously saved
	var HttpResource = "UserId"+ "/envelopes/" + docusign.envelopeID;
	var ContentType = "application/json"; 
	var HeaderParameters : collectionof NameAndValue;
	var HeaderParameter :  NameAndValue;
    
	// add oauth token received from docusign
	HeaderParameter.Name = "Authorization";
	HeaderParameter.Value = "Bearer " + docusign.tokenOAuthDocusign;
	HeaderParameters.Add(HeaderParameter);
	var URLParameter : collectionof NameAndValue;
	
	var result = WebServiceUtilities.ExecuteRESTService(	
														ScenarioName, 
														ServiceName,
														HttpMethod,
														HttpResource,
														URLParameter,
														HeaderParameters,
														ContentType,
														""
													);
	if(result.Code.StartsWith("20")) {
		var content = result.Content;
		var resultJSON : JsonResult;

		var keys : collectionof LANGUAGEINDEPENDENT_Text;
		var key;

		key = "status";
		keys.Add(key);
		
		resultJSON = Json.ParseKeyValues(keys, content);
		var isDownloadPDFCompleted = false;
		// check the status of the envelope
		if(!resultJSON.KeyValue.GetByIndex(1).Error) {
			if(resultJSON.KeyValue.GetByIndex(1).Value == "completed") {
				isDownloadPDFCompleted = true;
			} else {
				raise MsgDocuSign.Create("W", "o envelope " + docusign.envelopeID + " ainda não foi concluído.");
			}
		}

		// if the pdf has not yet been completed it returns
		if(!isDownloadPDFCompleted) continue;

		// add pdf parameters to download with Base64 encoding
		// UserId + /envelopes/ + EnvelopeID + /documents/ + DocumentID
		HttpResource = "UserId"+ "/envelopes/" + docusign.envelopeID + "/documents/" + docusign.IDCustomerQuote.content.RemoveLeadingZeros();
		HeaderParameter.Name = "Content-Transfer-Encoding";
		HeaderParameter.Value = "Base64";
		HeaderParameters.Add(HeaderParameter);

		var resultPDF = WebServiceUtilities.ExecuteRESTService(	
														ScenarioName, 
														ServiceName,
														HttpMethod,
														HttpResource,
														URLParameter,
														HeaderParameters,
														ContentType,
														""
													);
		if(resultPDF.Code.StartsWith("20")) {
			// turns base64 into response text in BinaryObject from SDK
			var pdfDocument = resultPDF.Content;
			var pdfBase64 : basis:BinaryObject;
			pdfBase64.content = Binary.ParseFromBase64String(pdfDocument);
			var quote = CustomerQuote.Retrieve(docusign.IDCustomerQuote);
			if(quote.IsSet()) {
				// create the attachment in the quotation
				if (!quote.AttachmentFolder.IsSet()) {
					quote.AttachmentFolder.Create();
				}
				var ATTACHMENT_TYPE_DOCUMENT : DocumentTypeCode;
				ATTACHMENT_TYPE_DOCUMENT.content = "10001";
				var description : Description;
				description.content = "Cotação " + docusign.IDCustomerQuote.content.RemoveLeadingZeros();
				description.languageCode = Library::LanguageCode.ParseFromString("EN");
				quote.AttachmentFolder.CreateFile(ATTACHMENT_TYPE_DOCUMENT, "Cotação_" + docusign.IDCustomerQuote.content.RemoveLeadingZeros() + ".pdf" , "Cotação " + docusign.IDCustomerQuote.content.RemoveLeadingZeros(), description, pdfBase64);
				
				// set the status of the envelope as completed
				docusign.envelopeStatus = "02";
			}
		} else {
			docusign.msgError = "Erro " + result.Code.Trim() + " ao baixar o Base64 do envelope concluído.";
			raise MsgDocuSign.Create("W", docusign.msgError);
		}
	

	} else {
		docusign.msgError = "Erro " + result.Code.Trim() + " ao buscar o status do envelope desta cotação.";
		raise MsgDocuSign.Create("W", docusign.msgError);
	}

}