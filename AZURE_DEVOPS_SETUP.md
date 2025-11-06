# Azure DevOps Setup Guide

This guide will help you set up the seedigital.ai Performance Appraisal System project in Azure DevOps.

## Prerequisites

- Azure DevOps account and organization
- Access to create repositories in your Azure DevOps organization
- Git installed on your machine

## Step 1: Create Azure DevOps Repository

1. **Log in to Azure DevOps**
   - Go to: https://dev.azure.com
   - Sign in with your Microsoft account

2. **Create or Select Organization**
   - If you don't have an organization, create one
   - Note your organization name (e.g., `seedigitalAI`)

3. **Create a New Project**
   - Click "New Project" or navigate to your existing project
   - Project name: `seedigital-performance-appraisal-system` (or your preferred name)
   - Description: "seedigital.ai Performance Appraisal System - Employee Performance Review Platform"
   - Visibility: Choose Private or Public
   - Version control: Select "Git"
   - Click "Create"

4. **Get Repository URL**
   - After creating the project, navigate to "Repos" > "Files"
   - Click "Clone" button
   - Copy the HTTPS or SSH URL (e.g., `https://dev.azure.com/seedigitalAI/seedigital-performance-appraisal-system/_git/seedigital-performance-appraisal-system`)

## Step 2: Add Azure DevOps Remote

After creating the repository in Azure DevOps, run these commands:

```bash
cd /Users/craigmarris/seedigital-ai-performance-appraisal

# Add Azure DevOps as a remote (replace with your actual URL)
git remote add azure https://dev.azure.com/YOUR_ORG/YOUR_PROJECT/_git/seedigital-performance-appraisal-system

# Verify remotes
git remote -v

# Push to Azure DevOps
git push -u azure main
```

## Step 3: Verify Code is in Azure DevOps

1. Go to your Azure DevOps project
2. Navigate to "Repos" > "Files"
3. Verify you see:
   - `index.html`
   - `README.md`
   - `.gitignore`
   - `azure-pipelines.yml`
   - All documentation files

## Step 4: Set Up Automatic Sync from GitHub to Azure DevOps

To automatically sync GitHub → Azure DevOps whenever you push to GitHub, set up GitHub Actions:

### Prerequisites

1. **Create Azure DevOps Personal Access Token (PAT)**
   - Go to Azure DevOps: User Settings > Personal Access Tokens
   - Create new token with "Code (read & write)" permissions
   - Copy the token (you'll need it for GitHub secrets)

2. **Add Secrets to GitHub Repository**
   - Go to your GitHub repository: Settings > Secrets and variables > Actions
   - Click "New repository secret" and add these secrets:
     - `AZURE_DEVOPS_PAT` - Your Azure DevOps PAT token
     - `AZURE_DEVOPS_ORG` - Your Azure DevOps organization name (e.g., `seedigitalAI`)
     - `AZURE_DEVOPS_PROJECT` - Your Azure DevOps project name (e.g., `seedigital-performance-appraisal-system`)
     - `AZURE_DEVOPS_REPO` - Your Azure DevOps repository name (e.g., `seedigital-performance-appraisal-system`)

3. **GitHub Actions Workflow is Already Created**
   - The workflow file `.github/workflows/sync-to-azure-devops.yml` is already in the repository
   - Once you add the secrets above, it will automatically sync on every push to `main`

### How It Works

- When you push to GitHub's `main` branch, GitHub Actions automatically:
  1. Checks out the code
  2. Adds Azure DevOps as a remote
  3. Pushes the changes to Azure DevOps `main` branch
  4. Both repositories stay in sync automatically

### Manual Trigger

You can also manually trigger the sync:
- Go to GitHub repository → Actions tab
- Select "Sync to Azure DevOps" workflow
- Click "Run workflow"

## Step 5: Create Deployment Pipeline

Once the code is in Azure DevOps, you can create a deployment pipeline:

### Option 1: Azure Static Web Apps (Recommended for Static Sites)

1. In Azure DevOps, go to "Pipelines" > "New Pipeline"
2. Select your repository
3. Choose "Azure Static Web Apps" template
4. Configure:
   - Azure subscription
   - App name
   - Resource group
   - Location
5. Save and run the pipeline

### Option 2: Azure App Service (For Web Apps)

1. In Azure DevOps, go to "Pipelines" > "New Pipeline"
2. Select your repository
3. Choose "Azure Web App" template
4. Configure:
   - Azure subscription
   - App service name
   - Runtime stack
5. Save and run the pipeline

### Option 3: Custom YAML Pipeline

The repository already includes `azure-pipelines.yml` for deployment. To set it up:

1. In Azure DevOps, go to "Pipelines" > "New Pipeline"
2. Select your repository
3. Choose "Existing Azure Pipelines YAML file"
4. Select `azure-pipelines.yml` from the main branch
5. Configure variables:
   - Go to "Pipelines" > "Library"
   - Create Variable Group: `PerformanceAppraisalVariables`
   - Add variables:
     - `AZURE_STATIC_WEB_APPS_API_TOKEN` (if using Static Web Apps)
     - `azureSubscription` (your Azure subscription)
     - `azureStaticWebAppName` (your app name)
     - `resourceGroupName` (your resource group)
6. Save and run the pipeline

## Step 6: Configure Application Settings

After deployment, configure:

1. **SharePoint Configuration**
   - Set SharePoint site URL in application settings or environment variables
   - Update `sharePointConfig` in `index.html` if needed

2. **Azure AD Authentication**
   - Configure MSAL.js settings for Microsoft 365 authentication
   - Set client ID and tenant ID in application settings

3. **API Keys**
   - Store API keys securely in Azure Key Vault
   - Reference in application settings

## Troubleshooting

### Authentication Issues

If you encounter authentication issues:

1. **Generate Personal Access Token (PAT)**
   - Go to: User Settings > Personal Access Tokens
   - Create new token with "Code (read & write)" permissions
   - Use token when prompted for password

2. **Use SSH instead of HTTPS**
   - Generate SSH key: `ssh-keygen -t rsa -b 4096`
   - Add to Azure DevOps: User Settings > SSH Public Keys
   - Use SSH URL for remote

### Push Issues

If push fails:

```bash
# Check remote configuration
git remote -v

# Remove and re-add remote if needed
git remote remove azure
git remote add azure YOUR_AZURE_DEVOPS_URL

# Force push (use with caution)
git push -u azure main --force
```

## Next Steps

1. ✅ Code is in GitHub
2. ✅ Code is in Azure DevOps (after following steps above)
3. ✅ Automatic sync configured (GitHub Actions syncs GitHub → Azure DevOps)
4. ⏳ Create deployment pipeline (your developer can help with this)
5. ⏳ Configure production environment
6. ⏳ Set up CI/CD workflows

## Support

For issues or questions:
- Check Azure DevOps documentation: https://docs.microsoft.com/azure/devops
- Review project README.md for application-specific details
