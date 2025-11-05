# Performance Appraisal System Setup Guide

This guide will help you set up the seedigital.ai Performance Appraisal System for deployment on Microsoft Azure with SharePoint integration.

## Features

- **Self-Assessment**: Up to 6 core competencies with ratings and comments
- **Self-Reflection**: Review of previous 6 months performance
- **Performance Goals**: Template for next 6 months goals
- **Manager Assessment**: Manager's evaluation and feedback
- **AI Assistance**: AI-powered suggestions for completing appraisal sections
- **SharePoint Integration**: Save and load appraisals from SharePoint
- **Azure Compatible**: Ready for deployment on Azure Static Web Apps or App Service

## Prerequisites

1. Microsoft Azure account
2. Azure AD tenant
3. SharePoint site or OneDrive for Business
4. Azure OpenAI or OpenAI API key (for AI assistance)

## Step 1: Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Configure:
   - **Name**: `Performance Appraisal System`
   - **Supported account types**: Accounts in this organizational directory only
   - **Redirect URI**: `http://localhost:3000` (for local testing) or your production URL
5. Click **Register**
6. Note the **Application (client) ID** and **Directory (tenant) ID**

### Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission** > **Microsoft Graph** > **Delegated permissions**
3. Add the following permissions:
   - `Files.ReadWrite.All`
   - `Sites.ReadWrite.All`
   - `User.Read`
4. Click **Add permissions**
5. Click **Grant admin consent** (if you have admin rights)

### Create Client Secret

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Add description and expiration
4. Click **Add**
5. **Copy the secret value immediately** (you won't be able to see it again)

## Step 2: Configure SharePoint Site

1. Create a SharePoint site or use an existing one
2. Create a document library named `Performance Appraisals`
3. Note the site URL (e.g., `https://yourtenant.sharepoint.com/sites/PerformanceAppraisals`)

## Step 3: Update Configuration in index.html

Update the following configuration in `index.html`:

```javascript
const msalConfig = {
    auth: {
        clientId: 'YOUR_CLIENT_ID', // Replace with your Client ID from Step 1
        authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Replace with your Tenant ID
        redirectUri: window.location.origin
    },
    // ...
};

const sharePointConfig = {
    siteUrl: 'YOUR_SHAREPOINT_SITE_URL', // Replace with your SharePoint site URL
    libraryName: 'Performance Appraisals' // Your SharePoint library name
};
```

## Step 4: Configure AI Assistance

For AI assistance to work, you need to integrate with an AI service. Options:

### Option A: Azure OpenAI

1. Create an Azure OpenAI resource in Azure Portal
2. Deploy a model (e.g., GPT-4 or GPT-3.5)
3. Get your API key and endpoint
4. Update the `mockAIResponse` function to call Azure OpenAI API

Example:
```javascript
async function mockAIResponse(fieldId, context, currentValue) {
    const response = await fetch('YOUR_AZURE_OPENAI_ENDPOINT/openai/deployments/YOUR_DEPLOYMENT/completions?api-version=2023-12-01-preview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'YOUR_API_KEY'
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{
                role: 'user',
                content: `Context: ${context}\n\nCurrent input: ${currentValue}\n\nProvide helpful suggestions for this performance appraisal section.`
            }],
            max_tokens: 500
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
}
```

### Option B: OpenAI API

Similar to Option A, but use OpenAI's direct API endpoint.

### Option C: Mock Responses (Current)

The current implementation uses mock responses for demonstration. Replace with actual API calls in production.

## Step 5: Deploy to Azure

### Option A: Azure Static Web Apps (Recommended)

1. In Azure Portal, create a new **Static Web App**
2. Configure:
   - Resource group
   - App name
   - Region
   - Source: GitHub, Azure DevOps, or Other
3. Build details:
   - Build preset: Custom
   - App location: `/`
   - Output location: `/`
4. After deployment, update the `redirectUri` in your MSAL config to match the Static Web App URL

### Option B: Azure App Service

1. Create a new **Web App** in Azure Portal
2. Configure:
   - Runtime stack: Node.js or .NET (depending on your backend)
   - Operating system: Linux or Windows
3. Deploy your application
4. Update the `redirectUri` in your MSAL config

### Option C: Azure Storage Static Website

1. Create a **Storage Account** in Azure Portal
2. Enable **Static website hosting**
3. Upload your `index.html` file
4. Access via the static website endpoint

## Step 6: Environment Variables (if using backend)

If you create a backend API for SharePoint integration, set these environment variables:

```
AZURE_CLIENT_ID=your_client_id
AZURE_CLIENT_SECRET=your_client_secret
AZURE_TENANT_ID=your_tenant_id
SHAREPOINT_SITE_URL=your_sharepoint_url
OPENAI_API_KEY=your_openai_key (if using OpenAI)
```

## Step 7: Testing

1. Open your deployed application
2. Fill in employee information
3. Add competencies and complete self-assessment
4. Test AI assistance buttons
5. Test save to SharePoint functionality
6. Test load from SharePoint functionality

## Security Considerations

1. **Never expose secrets in client-side code**
   - Use environment variables or Azure Key Vault
   - Consider creating a backend API for sensitive operations

2. **Enable HTTPS**
   - Always use HTTPS in production
   - Update redirect URIs to use HTTPS

3. **Limit API permissions**
   - Only request minimum required permissions
   - Regularly review and audit permissions

4. **Secure SharePoint access**
   - Use SharePoint site permissions to control access
   - Consider using Azure AD groups for access management

## Troubleshooting

### SharePoint Authentication Issues

- Verify app registration permissions are granted
- Check that admin consent is granted
- Ensure redirect URI matches exactly
- Check browser console for detailed error messages

### AI Assistance Not Working

- Verify API key is correct
- Check API endpoint is accessible
- Review network tab for API errors
- Ensure CORS is configured if using cross-origin requests

### File Save Issues

- Verify SharePoint site URL is correct
- Check document library name matches
- Ensure user has write permissions to SharePoint
- Review browser console for detailed errors

## Next Steps

1. Customize the appraisal form to match your organization's needs
2. Add additional competencies or sections as required
3. Implement PDF export functionality
4. Add email notifications for completed appraisals
5. Create reporting dashboard for managers
6. Add multi-language support if needed

## Support

For issues or questions:
- Check Azure documentation: https://docs.microsoft.com/azure
- Review Microsoft Graph API documentation: https://docs.microsoft.com/graph
- SharePoint API documentation: https://docs.microsoft.com/sharepoint/dev

