// Example Configuration File for Performance Appraisal System
// Copy this file to config.js and update with your actual values
// DO NOT commit config.js to version control

export const appConfig = {
    // Microsoft Azure AD Configuration
    azure: {
        clientId: 'YOUR_CLIENT_ID', // Replace with your Azure AD App Registration Client ID
        tenantId: 'YOUR_TENANT_ID', // Replace with your Azure AD Tenant ID
        authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
        redirectUri: window.location.origin, // Auto-set based on current URL
        scopes: [
            'Files.ReadWrite.All',
            'Sites.ReadWrite.All',
            'User.Read'
        ]
    },

    // SharePoint Configuration
    sharePoint: {
        siteUrl: 'YOUR_SHAREPOINT_SITE_URL', // e.g., 'https://yourtenant.sharepoint.com/sites/PerformanceAppraisals'
        libraryName: 'Performance Appraisals', // Your SharePoint document library name
        folderPath: 'Appraisals' // Optional: subfolder within the library
    },

    // AI Service Configuration
    ai: {
        // Option 1: Azure OpenAI
        provider: 'azure-openai', // or 'openai' or 'mock'
        azureOpenAI: {
            endpoint: 'https://YOUR_RESOURCE.openai.azure.com',
            apiKey: 'YOUR_API_KEY',
            deployment: 'gpt-4o', // Use GPT-4o (latest), or 'gpt-4-turbo', 'gpt-4', or 'gpt-35-turbo'
            // Note: Update to 'gpt-5.0' when available
            apiVersion: '2024-02-15-preview' // Use latest API version
        },
        
        // Option 2: OpenAI API
        openAI: {
            apiKey: 'YOUR_OPENAI_API_KEY',
            model: 'gpt-4o' // Use GPT-4o (latest), or 'gpt-4-turbo', 'gpt-4', or 'gpt-3.5-turbo'
            // Note: Update to 'gpt-5.0' when available
        },
        
        // Option 3: Mock (for testing without AI service)
        useMock: false // Set to true to use mock responses
    },

    // Application Settings
    app: {
        name: 'seedigital.ai Performance Appraisal System',
        version: '1.0.0',
        maxCompetencies: 6,
        defaultCompetencies: [
            'Technical Skills',
            'Communication',
            'Teamwork & Collaboration',
            'Problem Solving',
            'Leadership',
            'Innovation & Creativity'
        ],
        autoSave: true, // Auto-save to localStorage
        autoSaveInterval: 30000 // Auto-save interval in milliseconds (30 seconds)
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = appConfig;
}

