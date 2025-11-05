# Authentication Setup for Microsoft 365 (seedigital.ai)

The application is **configured** to work with Microsoft 365 authentication, but requires **Azure AD App Registration** to be set up first.

## Current Status

✅ **Authentication library installed**: MSAL.js (Microsoft Authentication Library)
✅ **Authentication flow implemented**: Login, token acquisition, SharePoint integration
⚠️ **Configuration needed**: Azure AD App Registration details

## Required Setup Steps

### Step 1: Create Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Sign in with your **seedigital.ai** Microsoft 365 account
3. Navigate to **Azure Active Directory** > **App registrations**
4. Click **New registration**
5. Configure:
   - **Name**: `Performance Appraisal System`
   - **Supported account types**: **Accounts in this organizational directory only (seedigital.ai only - Single tenant)**
   - **Redirect URI**: 
     - For local testing: `http://localhost:8000` or `http://localhost:3000`
     - For production: Your deployed app URL (e.g., `https://your-app.azurestaticapps.net`)
6. Click **Register**
7. **Copy the Application (client) ID** and **Directory (tenant) ID**

### Step 2: Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission** > **Microsoft Graph** > **Delegated permissions**
3. Add these permissions:
   - `Files.ReadWrite.All` - Required for SharePoint file access
   - `Sites.ReadWrite.All` - Required for SharePoint site access
   - `User.Read` - Required to read user profile
4. Click **Add permissions**
5. **IMPORTANT**: Click **Grant admin consent for seedigital.ai** (requires admin rights)

### Step 3: Update Configuration in index.html

Open `index.html` and update lines 407-408:

```javascript
const msalConfig = {
    auth: {
        clientId: 'YOUR_CLIENT_ID_HERE', // Replace with your Client ID from Step 1
        authority: 'https://login.microsoftonline.com/seedigital.ai', // or use your Tenant ID
        redirectUri: window.location.origin
    },
    // ...
};
```

**For seedigital.ai**, you can use:
- **Tenant ID**: Your specific tenant ID (from Azure AD)
- **OR Tenant domain**: `https://login.microsoftonline.com/seedigital.ai` (if configured)

### Step 4: Configure SharePoint Site URL

Update the SharePoint configuration in `index.html` (around line 425):

```javascript
const sharePointConfig = {
    siteUrl: 'https://seedigital.sharepoint.com/sites/YOUR_SITE_NAME',
    libraryName: 'Performance Appraisals',
    folderPath: ''
};
```

## How Authentication Works

1. **User clicks "Save to SharePoint"**
2. **Application checks** if user is logged in
3. **If not logged in**: Opens Microsoft 365 login popup
4. **User authenticates** with their seedigital.ai credentials
5. **Application receives access token** with SharePoint permissions
6. **Files are saved** to SharePoint using Microsoft Graph API

## Testing Authentication

Once configured:
1. Open the application
2. Fill in an appraisal form
3. Click "Save to SharePoint"
4. You should see a Microsoft 365 login popup
5. Sign in with your seedigital.ai account
6. Grant permissions if prompted
7. File should save to SharePoint

## Troubleshooting

### "Invalid client" error
- Verify Client ID is correct
- Check redirect URI matches exactly

### "Insufficient privileges" error
- Verify admin consent was granted
- Check API permissions are added correctly

### "Cannot access SharePoint" error
- Verify SharePoint site URL is correct
- Check user has access to the SharePoint site
- Verify document library name is correct

