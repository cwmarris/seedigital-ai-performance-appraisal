# Azure DevOps Pipeline Setup Guide for Engineers

This guide provides detailed instructions for engineers setting up the Azure DevOps CI/CD pipeline for the Performance Appraisal System.

## Prerequisites

- Azure DevOps organization access
- Azure subscription with appropriate permissions
- Access to create and configure pipelines
- Understanding of Azure Static Web Apps or Azure App Service

## Overview

The Performance Appraisal System is a static web application that can be deployed to:
- **Azure Static Web Apps** (Recommended for static sites)
- **Azure App Service** (Alternative option)

The pipeline configuration file (`azure-pipelines.yml`) is already in the repository and ready to use.

## Step 1: Review Pipeline Configuration

The pipeline file `azure-pipelines.yml` is located in the repository root. Review it to understand the deployment process:

```yaml
# Key components:
- Trigger: Runs on pushes to main/master branches
- Build: Copies application files to staging directory
- Deploy: Deploys to Azure Static Web Apps or App Service
```

## Step 2: Create Azure Resources

### Option A: Azure Static Web Apps (Recommended)

1. **Create Static Web App in Azure Portal**
   - Go to Azure Portal: https://portal.azure.com
   - Search for "Static Web Apps"
   - Click "Create"
   - Configure:
     - **Subscription**: Your Azure subscription
     - **Resource Group**: Create new or use existing
     - **Name**: `performance-appraisal-system` (or your preferred name)
     - **Plan type**: Free or Standard
     - **Region**: Choose closest region
     - **Source**: "Other" (we'll configure via Azure DevOps)
   - Click "Review + create" then "Create"

2. **Get Deployment Token**
   - After creation, go to the Static Web App resource
   - Navigate to "Overview" > "Manage deployment token"
   - Copy the deployment token (you'll need this for the pipeline)

### Option B: Azure App Service

1. **Create Web App in Azure Portal**
   - Go to Azure Portal: https://portal.azure.com
   - Search for "App Services"
   - Click "Create"
   - Configure:
     - **Subscription**: Your Azure subscription
     - **Resource Group**: Create new or use existing
     - **Name**: `performance-appraisal-system` (must be globally unique)
     - **Publish**: Code
     - **Runtime stack**: Static HTML
     - **Region**: Choose closest region
     - **Plan**: Create new or use existing
   - Click "Review + create" then "Create"

## Step 3: Configure Azure DevOps Variable Group

1. **Navigate to Pipelines Library**
   - In Azure DevOps, go to your project
   - Navigate to "Pipelines" > "Library"
   - Click "+ Variable group"

2. **Create Variable Group: `PerformanceAppraisalVariables`**
   - Name: `PerformanceAppraisalVariables`
   - Description: "Variables for Performance Appraisal System deployment"

3. **Add Required Variables**

   For **Azure Static Web Apps**:
   ```
   AZURE_STATIC_WEB_APPS_API_TOKEN = <deployment-token-from-step-2>
   azureStaticWebAppName = performance-appraisal-system
   azureSubscription = <your-azure-subscription-id>
   resourceGroupName = <your-resource-group-name>
   ```

   For **Azure App Service**:
   ```
   azureSubscription = <your-azure-subscription-id>
   azureStaticWebAppName = performance-appraisal-system
   resourceGroupName = <your-resource-group-name>
   ```

4. **Mark Secrets as Secure**
   - Click the lock icon next to `AZURE_STATIC_WEB_APPS_API_TOKEN` to mark it as secret
   - This prevents the value from being displayed in logs

5. **Save the Variable Group**

## Step 4: Create Service Connection (For App Service)

If using Azure App Service, you need to create a service connection:

1. **Navigate to Project Settings**
   - Go to "Project Settings" > "Service connections"
   - Click "Create service connection"

2. **Select Azure Resource Manager**
   - Choose "Azure Resource Manager"
   - Click "Next"

3. **Configure Authentication**
   - Select "Workload Identity federation" (recommended) or "Service principal (automatic)"
   - Select your Azure subscription
   - Enter a name: `Azure-PerformanceAppraisal`
   - Click "Save"

## Step 5: Create and Configure Pipeline

1. **Navigate to Pipelines**
   - In Azure DevOps, go to "Pipelines" > "Pipelines"
   - Click "New pipeline"

2. **Select Repository**
   - Choose "Azure Repos Git"
   - Select your repository: `performance-appraisal-system`
   - Select branch: `main`

3. **Configure Pipeline**
   - Choose "Existing Azure Pipelines YAML file"
   - Path: `/azure-pipelines.yml`
   - Click "Continue"

4. **Review Pipeline**
   - Review the pipeline configuration
   - Ensure the variable group is referenced correctly
   - Click "Run" to test the pipeline

5. **Enable Pipeline**
   - After successful test run, the pipeline is enabled
   - It will automatically run on pushes to `main` branch

## Step 6: Configure Pipeline Variables

Edit the pipeline YAML file if needed to match your deployment target:

### For Azure Static Web Apps (Default)

The pipeline is already configured for Static Web Apps. Ensure:
- `AZURE_STATIC_WEB_APPS_API_TOKEN` is set in variable group
- `azureStaticWebAppName` matches your Static Web App name

### For Azure App Service

1. **Edit `azure-pipelines.yml`**
   - Uncomment the Azure App Service deployment task (line 61-67)
   - Comment out or remove the Static Web Apps task (line 52-58)
   - Update the `azureSubscription` variable reference

2. **Update Service Connection**
   - Ensure the service connection name matches in the pipeline
   - Or update the pipeline to use the service connection you created

## Step 7: Test the Pipeline

1. **Trigger Manual Run**
   - Go to "Pipelines" > "Pipelines"
   - Select your pipeline
   - Click "Run pipeline"
   - Select branch: `main`
   - Click "Run"

2. **Monitor Pipeline Execution**
   - Watch the pipeline logs in real-time
   - Check for any errors or warnings
   - Verify deployment completes successfully

3. **Verify Deployment**
   - Check Azure Portal for the deployed application
   - Access the application URL
   - Test the application functionality

## Step 8: Configure Branch Policies (Optional)

1. **Navigate to Repos > Branches**
   - Select the `main` branch
   - Click "Branch policies"

2. **Enable Build Validation**
   - Toggle "Build validation" ON
   - Select your pipeline
   - Set "Policy requirement": Required
   - Set "Display name": "Performance Appraisal System Build"
   - Click "Save"

3. **Configure Other Policies** (Optional)
   - Require a minimum number of reviewers
   - Require linked work items
   - Require comment resolution

## Step 9: Configure Application Settings

After deployment, configure application settings in Azure:

### For Azure Static Web Apps

1. **Navigate to Static Web App**
   - Go to Azure Portal > Your Static Web App
   - Navigate to "Configuration" > "Application settings"

2. **Add Application Settings** (if needed)
   - Add any environment-specific settings
   - Note: Static Web Apps typically serve static files, so configuration is usually in the code

### For Azure App Service

1. **Navigate to App Service**
   - Go to Azure Portal > Your App Service
   - Navigate to "Configuration" > "Application settings"

2. **Add Application Settings**
   - Add any environment variables needed
   - These can be referenced in the application if using build-time injection

## Troubleshooting

### Pipeline Fails at Deployment

**Error: "Azure Static Web Apps API token is invalid"**
- Verify the token in the variable group is correct
- Regenerate the token in Azure Portal if needed
- Ensure the token hasn't expired

**Error: "Subscription not found"**
- Verify the subscription ID in the variable group
- Check that the service connection has access to the subscription
- Ensure the service principal has Contributor role on the resource group

**Error: "Resource group not found"**
- Verify the resource group name in the variable group
- Ensure the resource group exists in the specified subscription
- Check spelling and case sensitivity

### Application Not Deploying

**Files not found**
- Verify the `Contents` section in `CopyFiles@2` task includes all necessary files
- Check that files exist in the repository
- Review build logs for file copy errors

**Application not accessible**
- Check the Static Web App or App Service is running
- Verify the URL is correct
- Check Azure Portal for any errors or warnings

### Build Succeeds but Deployment Fails

**Check deployment logs**
- Review detailed logs in Azure DevOps
- Check Azure Portal for deployment status
- Verify resource permissions

**Verify variable group**
- Ensure all required variables are set
- Check variable names match exactly (case-sensitive)
- Verify secret variables are marked as secure

## Pipeline Customization

### Add Build Steps

If you need to process files before deployment:

```yaml
# Example: Minify files
- task: Npm@1
  inputs:
    command: 'custom'
    customCommand: 'install -g html-minifier-terser'
  displayName: 'Install minification tools'

- task: Bash@3
  inputs:
    targetType: 'inline'
    script: |
      html-minifier --input-dir $(Build.ArtifactStagingDirectory)/app --output-dir $(Build.ArtifactStagingDirectory)/app --file-ext html --minify-css --minify-js
  displayName: 'Minify HTML/CSS/JS'
```

### Add Environment-Specific Deployments

To deploy to different environments:

```yaml
stages:
  - stage: Dev
    jobs:
      - job: DeployDev
        steps:
          # Dev deployment steps
          
  - stage: Prod
    condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
    jobs:
      - job: DeployProd
        steps:
          # Prod deployment steps
```

## Security Best Practices

1. **Never commit secrets**
   - All secrets should be in variable groups
   - Mark sensitive values as secure

2. **Use service connections**
   - Prefer service connections over PAT tokens
   - Use workload identity federation when possible

3. **Limit permissions**
   - Service principals should have minimum required permissions
   - Use resource group-level permissions when possible

4. **Review pipeline changes**
   - Require pull request reviews for pipeline changes
   - Use branch policies to protect main branch

## Monitoring and Maintenance

1. **Set up alerts**
   - Configure email notifications for pipeline failures
   - Set up Azure Monitor alerts for application issues

2. **Regular reviews**
   - Review pipeline execution logs regularly
   - Check for failed deployments
   - Update dependencies as needed

3. **Backup strategy**
   - Ensure code is backed up in both GitHub and Azure DevOps
   - Keep deployment artifacts if needed

## Support and Resources

- **Azure DevOps Documentation**: https://docs.microsoft.com/azure/devops
- **Azure Static Web Apps**: https://docs.microsoft.com/azure/static-web-apps
- **Azure App Service**: https://docs.microsoft.com/azure/app-service
- **Pipeline YAML Reference**: https://docs.microsoft.com/azure/devops/pipelines/yaml-schema

## Quick Reference

### Variable Group Name
```
PerformanceAppraisalVariables
```

### Required Variables (Static Web Apps)
- `AZURE_STATIC_WEB_APPS_API_TOKEN`
- `azureStaticWebAppName`
- `azureSubscription`
- `resourceGroupName`

### Pipeline File Location
```
/azure-pipelines.yml
```

### Trigger Branches
- `main`
- `master`

