// Google Apps Script for handling form submissions to Google Sheets
// To use this:
// 1. Create a new Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Replace the default code with this script
// 4. Update the SPREADSHEET_ID variable with your sheet ID
// 5. Deploy as web app (Execute as: Me, Who has access: Anyone)
// 6. Copy the deployment URL and use it in your React app

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Your Google Sheet ID - replace this with your actual sheet ID
    const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
    const SHEET_NAME = 'Applications';

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      const newSheet = spreadsheet.insertSheet(SHEET_NAME);
      const headers = [
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Company',
        'Position',
        'Service Type',
        'Project Description',
        'Budget',
        'Timeline',
        'Additional Info'
      ];
      newSheet.appendRow(headers);
      newSheet = spreadsheet.getSheetByName(SHEET_NAME);
    }

    // Prepare the data row
    const timestamp = new Date().toLocaleString();
    const rowData = [
      timestamp,
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.company,
      data.position,
      data.serviceType,
      data.projectDescription,
      data.budget,
      data.timeline,
      data.additionalInfo
    ];

    // Append the data to the sheet
    sheet.appendRow(rowData);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Application submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error processing application: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function testSubmission() {
  const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    company: 'Test Company',
    position: 'Manager',
    serviceType: 'Data Analytics Consulting',
    projectDescription: 'Test project description',
    budget: '$10,000 - $25,000',
    timeline: 'Within 2-3 months',
    additionalInfo: 'Test additional information'
  };

  const testEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(testEvent);
  Logger.log(result.getContent());
}
