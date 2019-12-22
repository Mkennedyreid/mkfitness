import "./styles.css";
import $ from "jquery";

// event listener to catch form submission
window.addEventListener("submit", function(event) {
  // prevent default form submission and page redirecting
  event.preventDefault();

  // get form data from ID of 'fields' and put into an array of names and values
  var formData = $("#fields").serializeArray();

  // call the function to submit form
  submitFormToHubspot(formData);
});

// function to submit the form
function submitFormToHubspot(inputData) {
  // Create the new HTTP request 
  var xhr = new XMLHttpRequest();

  // URL for POST request
  var url = 'https://api.hsforms.com/submissions/v3/integration/submit/5349881/6cede8a6-e507-4e25-92d2-42c2e2d68371';
  
  // JSON blob for Hubspot API
  var formattedData = {
    "fields": inputData,
    "legalConsentOptions": { // Include this object when GDPR options are enabled
      "consent": {
        "consentToProcess": true,
        "text": "I agree to allow Example Company to store and process my personal data.",
        "communications": [
          {
            "value": true,
            "subscriptionTypeId": 999,
            "text": "I agree to receive marketing communications from Example Company."
          }
        ]
      }
    }
  }

  // turn JSON --> a string
  var finalData = JSON.stringify(formattedData);

  // The XMLHttpRequest method open() initializes a newly-created request, or re-initializes an existing one.
  xhr.open('POST', url);
  // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Sends the request 
  xhr.send(finalData);
}