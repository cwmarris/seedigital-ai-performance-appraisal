# Performance Appraisal System

A comprehensive web-based performance appraisal system for seedigital.ai staff, featuring AI-powered assistance and SharePoint integration.

## Overview

The Performance Appraisal System enables staff members to:
- Complete self-assessments across core competencies (up to 6)
- Reflect on their performance over the previous 6 months
- Set performance goals for the next 6 months
- Receive manager feedback and assessment
- Save appraisals directly to SharePoint

## Features

### Core Functionality

1. **Employee Information Management**
   - Employee details, department, manager information
   - Review period and date tracking

2. **Self-Assessment (Core Competencies)**
   - Up to 6 customizable core competencies
   - 1-5 rating scale for each competency
   - Self-assessment comments with AI assistance
   - Dynamic add/remove competency functionality

3. **Self-Reflection (Previous 6 Months)**
   - Key achievements section
   - Challenges and learnings
   - Areas for improvement
   - AI-powered suggestions for each section

4. **Performance Goals (Next 6 Months)**
   - Multiple goal creation with templates
   - Goal title, description, success criteria
   - Target dates and priority levels
   - AI assistance for SMART goal creation

5. **Manager Assessment**
   - Overall performance rating (1-5 scale)
   - Feedback on core competencies
   - Strengths identification
   - Development areas
   - Recommendations for next period
   - Manager signature and date

6. **Employee Acknowledgment**
   - Checkbox confirmation
   - Employee signature and date

### Advanced Features

- **AI Assistance**: Get AI-powered suggestions for completing appraisal sections
- **SharePoint Integration**: Save and load appraisals from SharePoint
- **Auto-save**: Automatic saving to browser localStorage
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Azure Compatible**: Ready for deployment on Azure Static Web Apps or App Service

## Quick Start

1. **Open the application**
   ```bash
   # Simply open index.html in a web browser
   # Or serve it using a local web server:
   python -m http.server 8000
   # Then navigate to http://localhost:8000/index.html
   ```

2. **Configure Azure AD and SharePoint**
   - Follow the setup guide in `PERFORMANCE_APPRAISAL_SETUP.md`
   - Update configuration in `index.html`

3. **Start using**
   - Fill in employee information
   - Complete self-assessment
   - Add self-reflection
   - Set performance goals
   - Save to SharePoint

## File Structure

```
.
├── index.html                      # Main application file
├── PERFORMANCE_APPRAISAL_SETUP.md  # Setup and configuration guide
├── azure-pipelines.yml            # Azure DevOps deployment pipeline
├── config.example.js              # Example configuration file
├── package.json                   # Project configuration
└── README.md                      # This file
```

## Configuration

### Required Configuration

1. **Microsoft Azure AD App Registration**
   - Client ID
   - Tenant ID
   - Redirect URI

2. **SharePoint Configuration**
   - SharePoint site URL
   - Document library name

3. **AI Service** (optional)
   - Azure OpenAI endpoint and key, or
   - OpenAI API key

### Configuration Steps

See `PERFORMANCE_APPRAISAL_SETUP.md` for detailed configuration instructions.

## Usage Guide

### For Employees

1. **Start Your Appraisal**
   - Open the application
   - Fill in your employee information
   - Select your review period

2. **Complete Self-Assessment**
   - Review the core competencies (default or custom)
   - Rate yourself on a 1-5 scale for each competency
   - Add comments with specific examples
   - Use AI assistance if needed

3. **Write Self-Reflection**
   - Document key achievements from the past 6 months
   - Describe challenges faced and learnings
   - Identify areas for improvement
   - Use AI assistance to get suggestions

4. **Set Performance Goals**
   - Add goals for the next 6 months
   - Be specific and measurable (SMART goals)
   - Set target dates and priorities
   - Use AI assistance for goal formulation

5. **Review Manager Assessment**
   - Review your manager's feedback
   - Discuss any questions or concerns
   - Acknowledge the appraisal

6. **Save Your Appraisal**
   - Click "Save to SharePoint"
   - File will be saved to SharePoint document library
   - Appraisal is also auto-saved locally

### For Managers

1. **Review Employee Self-Assessment**
   - Load the employee's appraisal from SharePoint
   - Review competencies and self-reflection

2. **Complete Manager Assessment**
   - Provide overall performance rating
   - Give feedback on each competency
   - Identify strengths and development areas
   - Provide recommendations

3. **Sign and Save**
   - Add your signature and date
   - Save to SharePoint
   - Share with employee for acknowledgment

## Technical Details

### Technologies Used

- **HTML5**: Structure and content
- **Tailwind CSS**: Styling and responsive design
- **JavaScript (ES6+)**: Application logic
- **Microsoft MSAL.js**: Authentication and authorization
- **Microsoft Graph API**: SharePoint integration
- **Lucide Icons**: Icon library

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

### Data Storage

- **SharePoint**: Primary storage for completed appraisals
- **LocalStorage**: Auto-save backup and temporary storage

### Data Format

Appraisals are saved as JSON files with the following structure:
```json
{
  "employeeInfo": { ... },
  "competencies": [ ... ],
  "selfReflection": { ... },
  "goals": [ ... ],
  "managerAssessment": { ... },
  "employeeAcknowledgment": { ... },
  "savedDate": "ISO timestamp"
}
```

## Security

- Uses Microsoft Azure AD for authentication
- OAuth 2.0 / OpenID Connect for secure access
- SharePoint permissions control file access
- No sensitive data stored in client-side code
- HTTPS required for production deployment

## Deployment

### Azure Static Web Apps

1. Create Azure Static Web App resource
2. Configure build and deployment settings
3. Update MSAL redirect URI
4. Deploy using Azure DevOps pipeline or GitHub Actions

### Azure App Service

1. Create Azure Web App
2. Configure deployment settings
3. Upload files or connect to repository
4. Update MSAL redirect URI

See `azure-pipelines.yml` for Azure DevOps pipeline configuration.

## Customization

### Adding Custom Competencies

The default competencies can be modified in the `defaultCompetencies` array:
```javascript
const defaultCompetencies = [
    'Technical Skills',
    'Communication',
    // Add your custom competencies here
];
```

### Modifying Goal Templates

Customize goal structure by modifying the `addGoal()` function in the HTML file.

### Styling

The application uses Tailwind CSS. Modify styles in the `<style>` section or add custom CSS classes.

## Troubleshooting

### Common Issues

1. **SharePoint authentication fails**
   - Check Azure AD app registration permissions
   - Verify redirect URI matches exactly
   - Ensure admin consent is granted

2. **AI assistance not working**
   - Verify API key is configured
   - Check API endpoint is accessible
   - Review browser console for errors

3. **Save to SharePoint fails**
   - Verify SharePoint site URL is correct
   - Check document library name matches
   - Ensure user has write permissions

4. **Auto-save not working**
   - Check browser localStorage is enabled
   - Clear browser cache and try again
   - Verify browser supports localStorage

## Support

For support or questions:
- Review `PERFORMANCE_APPRAISAL_SETUP.md` for setup issues
- Check browser console for error messages
- Verify Azure AD and SharePoint configuration

## License

This project is part of the seedigital.ai internal tools suite.

## Version History

- **v1.0.0** (Initial Release)
  - Core appraisal functionality
  - SharePoint integration
  - AI assistance features
  - Azure deployment ready

