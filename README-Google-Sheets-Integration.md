# Google Sheets Integration Setup

This guide will help you set up Google Sheets integration for form submissions from your Apply page.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete the default code in the script editor
3. Copy and paste the code from `google-apps-script.js`
4. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual spreadsheet ID
5. Save the script (Ctrl+S or Cmd+S)

## Step 3: Deploy the Web App

1. Click the **Deploy** button (blue button)
2. Select **New deployment**
3. Choose type: **Web app**
4. Configure:
   - **Description**: "Application Form Handler"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Copy the **Deployment URL** - you'll need this for your React app

## Step 4: Update Your React App

1. Open `src/pages/Apply.tsx`
2. Find the line: `const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL_HERE';`
3. Replace it with your actual deployment URL from Step 3

Example:
```javascript
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

## Step 5: Test the Integration

1. Fill out and submit the form on your Apply page
2. Check your Google Sheet - new submissions should appear as new rows
3. Each submission will include:
   - Timestamp
   - All form fields
   - Automatic formatting

## Troubleshooting

### Common Issues:

1. **"Script function not found" error**
   - Make sure your Apps Script function is named `doPost` (case-sensitive)
   - Ensure the web app is deployed and accessible

2. **CORS errors**
   - Google Apps Script handles CORS automatically for web app deployments

3. **Data not appearing in sheet**
   - Check that your spreadsheet ID is correct
   - Verify the sheet name matches (default: "Applications")
   - Make sure the script has edit permissions for the sheet

### Sheet Structure:

Your Google Sheet will automatically create headers:
- Timestamp
- First Name
- Last Name
- Email
- Phone
- Company
- Position
- Service Type
- Project Description
- Budget
- Timeline
- Additional Info

## Security Notes

- This setup allows anyone to submit data to your sheet
- Consider adding CAPTCHA or other validation if you need to prevent spam
- The deployment URL is public, so don't share sensitive configuration

## Alternative Solutions

If you prefer a different approach, you could also use:
- **Netlify Functions** or **Vercel Functions** with Google Sheets API
- **Firebase** with Google Sheets integration
- **Custom backend** with Google Sheets API
- **Zapier** or **Make.com** for no-code integration
