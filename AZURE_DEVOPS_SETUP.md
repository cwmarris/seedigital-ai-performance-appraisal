# Azure DevOps Setup Guide - Performance Appraisal System

This guide will help you set up the **Performance Appraisal System** in Azure DevOps and configure bi-directional sync with GitHub.

## Project Information

- **Project Name**: `seedigital-performance-appraisal-system`
- **Purpose**: Employee Performance Appraisal System for seedigital.ai
- **Application**: Web-based performance review platform with SharePoint integration

## Prerequisites

- Azure DevOps account and organization
- Access to create repositories in your Azure DevOps organization
- Git installed on your machine
- GitHub repository already set up (we'll sync from there)

## Step 1: Create Azure DevOps Project and Repository

1. **Log in to Azure DevOps**
   - Go to: https://dev.azure.com
   - Sign in with your Microsoft account (seedigital.ai account)

2. **Create or Select Organization**
   - If you don't have an organization, create one
   - Note your organization name (e.g., `seedigitalAI`)

3. **Create a New Project**
   - Click "New Project" or navigate to your existing project
   - **Project name**: `seedigital-performance-appraisal-system`
   - **Description**: "seedigital.ai Performance Appraisal System - Employee Performance Review Platform"
   - **Visibility**: Choose Private or Public
   - **Version control**: Select "Git"
   - **Work item process**: Choose "Agile" (or your preference)
   - Click "Create"

4. **Get Repository URL**
   - After creating the project, navigate to "Repos" > "Files"
   - Click "Clone" button
   - Copy the HTTPS URL (e.g., `https://dev.azure.com/seedigitalAI/seedigital-performance-appraisal-system/_git/seedigital-performance-appraisal-system`)

## Step 2: Add Azure DevOps Remote to Your Local Repository

Run these commands in your local repository:

```bash
cd /Users/craigmarris/seedigital-ai-performance-appraisal

# Check current remotes
git remote -v

# Add Azure DevOps as a remote (replace with your actual URL)
git remote add azure https://dev.azure.com/YOUR_ORG/seedigital-performance-appraisal-system/_git/seedigital-performance-appraisal-system

# Verify remotes (you should see both 'origin' for GitHub and 'azure' for Azure DevOps)
git remote -v
```

## Step 3: Push to Azure DevOps

```bash
# Push main branch to Azure DevOps
git push -u azure main

# If you have other branches, push them too
git push azure --all
```

## Step 4: Verify Code is in Azure DevOps

1. Go to your Azure DevOps project
2. Navigate to "Repos" > "Files"
3. Verify you see all files:
   - `index.html`
   - `README.md`
   - `azure-pipelines.yml`
   - All documentation files

## Step 5: Set Up Bi-Directional Sync

You have two options for keeping GitHub and Azure DevOps in sync:

### Option A: GitHub Actions (Recommended - Syncs GitHub → Azure DevOps)

This syncs automatically when you push to GitHub.

1. **Create GitHub Personal Access Token (PAT)**
   - Go to GitHub: Settings > Developer settings > Personal access tokens > Tokens (classic)
   - Generate new token with `repo` scope
   - Copy the token (you'll need it for Azure DevOps)

2. **Create Azure DevOps Personal Access Token (PAT)**
   - Go to Azure DevOps: User Settings > Personal Access Tokens
   - Create new token with "Code (read & write)" permissions
   - Copy the token

3. **Add Secrets to GitHub Repository**
   - Go to your GitHub repository: Settings > Secrets and variables > Actions
   - Add these secrets:
     - `AZURE_DEVOPS_PAT` - Your Azure DevOps PAT token
     - `AZURE_DEVOPS_ORG` - Your Azure DevOps organization name
     - `AZURE_DEVOPS_PROJECT` - Your Azure DevOps project name
     - `AZURE_DEVOPS_REPO` - Your Azure DevOps repository name

4. **Create GitHub Actions Workflow**

Create `.github/workflows/sync-to-azure-devops.yml`:

```yaml
name: Sync to Azure DevOps

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:  # Allows manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout GitHub repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Configure Git
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"

      - name: Add Azure DevOps remote
        run: |
          git remote add azure https://${{ secrets.AZURE_DEVOPS_PAT }}@dev.azure.com/${{ secrets.AZURE_DEVOPS_ORG }}/${{ secrets.AZURE_DEVOPS_PROJECT }}/_git/${{ secrets.AZURE_DEVOPS_REPO }}

      - name: Push to Azure DevOps
        run: |
          git push azure main --force
```

### Option B: Azure DevOps Pipeline (Syncs Azure DevOps → GitHub)

This syncs automatically when you push to Azure DevOps.

1. **Create GitHub Personal Access Token (PAT)**
   - Go to GitHub: Settings > Developer settings > Personal access tokens > Tokens (classic)
   - Generate new token with `repo` scope
   - Copy the token

2. **Add Secret to Azure DevOps**
   - Go to your Azure DevOps project: Pipelines > Library
   - Create a new Variable Group: `GitHubSync`
   - Add variable: `GITHUB_PAT` (mark as secret)
   - Add variable: `GITHUB_REPO` (e.g., `seedigital-ai-performance-appraisal`)
   - Add variable: `GITHUB_ORG` (your GitHub username or organization)

3. **Create Sync Pipeline**

Create `azure-sync-pipeline.yml`:

```yaml
# Azure DevOps Pipeline to Sync to GitHub
trigger:
  branches:
    include:
    - main
    - master

pool:
  vmImage: 'ubuntu-latest'

variables:
  - group: GitHubSync

steps:
  - checkout: self

  - task: Bash@3
    displayName: 'Configure Git'
    inputs:
      targetType: 'inline'
      script: |
        git config user.name "Azure DevOps"
        git config user.email "devops@seedigital.ai"

  - task: Bash@3
    displayName: 'Add GitHub remote and push'
    inputs:
      targetType: 'inline'
      script: |
        git remote add github https://$(GITHUB_PAT)@github.com/$(GITHUB_ORG)/$(GITHUB_REPO).git
        git push github main --force
    env:
      GITHUB_PAT: $(GITHUB_PAT)
```

## Step 6: Set Up Deployment Pipeline

The repository already includes `azure-pipelines.yml` for deployment. To set it up:

1. **Go to Pipelines in Azure DevOps**
   - Navigate to "Pipelines" > "Pipelines"
   - Click "New Pipeline"

2. **Select Repository**
   - Choose "Azure Repos Git"
   - Select your repository

3. **Configure Pipeline**
   - Choose "Existing Azure Pipelines YAML file"
   - Select `azure-pipelines.yml` from the main branch
   - Click "Continue"

4. **Review and Run**
   - Review the pipeline configuration
   - Click "Run" to test the pipeline

5. **Configure Variables**
   - Go to "Pipelines" > "Library"
   - Create Variable Group: `PerformanceAppraisalVariables`
   - Add variables:
     - `AZURE_STATIC_WEB_APPS_API_TOKEN` (if using Static Web Apps)
     - `azureSubscription` (your Azure subscription)
     - `azureStaticWebAppName` (your app name)
     - `resourceGroupName` (your resource group)

## Step 7: Configure Branch Policies (Optional but Recommended)

1. **Go to Repos > Branches**
   - Select the `main` branch
   - Click "Branch policies"

2. **Enable Policies**
   - Require a minimum number of reviewers: 1
   - Require linked work items: Optional
   - Require comment resolution: Optional
   - Build validation: Link your pipeline

## Step 8: Test the Sync

### Test GitHub → Azure DevOps Sync

1. Make a change locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test sync to Azure DevOps"
   git push origin main
   ```
3. Check GitHub Actions (if using Option A)
4. Verify the change appears in Azure DevOps

### Test Azure DevOps → GitHub Sync

1. Make a change in Azure DevOps (via web interface or push)
2. Push to Azure DevOps:
   ```bash
   git add .
   git commit -m "Test sync to GitHub"
   git push azure main
   ```
3. Check Azure DevOps pipeline (if using Option B)
4. Verify the change appears in GitHub

## Troubleshooting

### Authentication Issues

**GitHub Actions failing:**
- Verify PAT token has correct permissions
- Check that secrets are correctly named in GitHub
- Review GitHub Actions logs for specific errors

**Azure DevOps push failing:**
- Generate new PAT token with "Code (read & write)" permissions
- Use token as password when prompted
- Or use SSH instead of HTTPS

### Sync Conflicts

If both repos have diverged:
```bash
# Pull from both remotes
git fetch origin
git fetch azure

# Merge or rebase as needed
git merge origin/main
git merge azure/main

# Push to both
git push origin main
git push azure main
```

### Force Sync (Use with Caution)

If you need to force one repo to match another:
```bash
# Force Azure DevOps to match GitHub
git push azure main --force

# Force GitHub to match Azure DevOps
git push origin main --force
```

## Best Practices

1. **Primary Repository**: Choose GitHub or Azure DevOps as your primary repository
   - Most teams use GitHub for development
   - Use Azure DevOps for deployment pipelines

2. **Branch Strategy**: Keep branches in sync
   - Push feature branches to both remotes
   - Keep main/master branches synchronized

3. **Commit Messages**: Use clear, descriptive commit messages
   - Helps track changes across both repositories

4. **Regular Syncs**: Set up automated syncs to avoid divergence
   - Use GitHub Actions or Azure DevOps pipelines
   - Sync on every push to main branch

5. **Backup**: Both repositories serve as backups for each other

## Next Steps

1. ✅ Code is in GitHub
2. ✅ Code is in Azure DevOps (after following steps above)
3. ⏳ Set up bi-directional sync (choose Option A or B)
4. ⏳ Configure deployment pipeline
5. ⏳ Set up branch policies
6. ⏳ Configure production environment

## Support

For issues or questions:
- Check Azure DevOps documentation: https://docs.microsoft.com/azure/devops
- Check GitHub Actions documentation: https://docs.github.com/actions
- Review project README.md for application-specific details

