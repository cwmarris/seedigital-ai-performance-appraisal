# Azure DevOps Setup Guide

This guide will help you set up the seedigital.ai Performance Appraisal System project in Azure DevOps.

## Setup Method for seedigital-ai-performance-appraisal-system

### 1. Initial Setup (Manual)

#### Step 1: Create Azure DevOps Project

- **Organization**: `seedigitalAI`
- **Project**: `seedigital-performance-appraisal-system`
- **Repository**: `seedigital-performance-appraisal-system`

1. **Log in to Azure DevOps**
   - Go to: https://dev.azure.com
   - Sign in with your Microsoft account (seedigital.ai account)

2. **Navigate to Organization**
   - Select organization: `seedigitalAI`

3. **Create a New Project**
   - Click "New Project"
   - **Project name**: `seedigital-performance-appraisal-system`
   - **Description**: "seedigital.ai Performance Appraisal System - Employee Performance Review Platform"
   - **Visibility**: Choose Private or Public
   - **Version control**: Select "Git"
   - Click "Create"

4. **Get Repository URL**
   - After creating the project, navigate to "Repos" > "Files"
   - Click "Clone" button
   - Copy the HTTPS URL: `https://dev.azure.com/seedigitalAI/seedigital-performance-appraisal-system/_git/seedigital-performance-appraisal-system`

#### Step 2: Add Azure Remote to Local Repository

Run these commands in your local repository:

```bash
cd /Users/craigmarris/seedigital-ai-performance-appraisal

# Add Azure DevOps as a remote
git remote add azure https://dev.azure.com/seedigitalAI/seedigital-performance-appraisal-system/_git/seedigital-performance-appraisal-system

# Verify remotes
git remote -v
```

#### Step 3: Initial Push

```bash
# Push main branch to Azure DevOps
git push -u azure main
```

### 2. Automatic Sync (GitHub Actions)

**Method**: GitHub Actions workflow that syncs GitHub → Azure DevOps

**Workflow file**: `.github/workflows/sync-to-azure-devops.yml`

#### How It Works

- **Trigger**: Automatically runs on every push to `main` branch
- **Process**:
  1. Checks out the GitHub repository
  2. Adds Azure DevOps as a remote
  3. Pushes to Azure DevOps `main` branch

#### Secrets Required in GitHub

Go to your GitHub repository: **Settings > Secrets and variables > Actions**

Add these secrets:

- `AZURE_DEVOPS_PAT` - Personal Access Token from Azure DevOps
  - Go to Azure DevOps: User Settings > Personal Access Tokens
  - Create new token with "Code (read & write)" permissions
  - Copy the token

- `AZURE_DEVOPS_ORG` - Organization name: `seedigitalAI`

- `AZURE_DEVOPS_PROJECT` - Project name: `seedigital-performance-appraisal-system`

- `AZURE_DEVOPS_REPO` - Repository name: `seedigital-performance-appraisal-system`

#### GitHub Actions Workflow

The workflow file `.github/workflows/sync-to-azure-devops.yml` is already created in the repository. Once you add the secrets above, it will automatically sync on every push to `main`.

#### Manual Trigger

You can also manually trigger the sync:
- Go to GitHub repository → **Actions** tab
- Select "Sync to Azure DevOps" workflow
- Click "Run workflow"

### 3. Current Remotes

After setup, your remotes should be:

- `origin` → GitHub (`https://github.com/YOUR_USERNAME/seedigital-ai-performance-appraisal.git`)
- `azure` → Azure DevOps (`https://dev.azure.com/seedigitalAI/seedigital-performance-appraisal-system/_git/seedigital-performance-appraisal-system`)

To verify:
```bash
git remote -v
```

### 4. Workflow

1. **Push to GitHub** → GitHub Actions runs → Auto-syncs to Azure DevOps
2. **Manual push to Azure DevOps** → Requires PR (branch protection)
3. **Both repos stay in sync automatically**

## Step 4: Verify Code is in Azure DevOps

1. Go to your Azure DevOps project
2. Navigate to "Repos" > "Files"
3. Verify you see:
   - `index.html`
   - `README.md`
   - `.gitignore`
   - `azure-pipelines.yml`
   - All documentation files

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
git remote add azure https://dev.azure.com/seedigitalAI/seedigital-performance-appraisal-system/_git/seedigital-performance-appraisal-system

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
