# Sharing and Collaboration Workflow

The Performance Appraisal System now supports secure sharing with unique IDs and email notifications.

## Key Features

✅ **Unique Appraisal IDs**: Each appraisal gets a unique ID (format: `APP-YYYYMMDD-HHMMSS-XXXX`)
✅ **Shareable Links**: Copy link with unique ID to share with manager/employee
✅ **Email Notifications**: Automatically generates email template with link
✅ **Data Persistence**: All form data is saved automatically and linked to unique ID
✅ **No Data Loss**: Opening shared link loads saved data automatically

## How It Works

### 1. Unique Appraisal ID

- **Generated automatically** when you first open the app
- **Format**: `APP-20241104-143022-A3B7`
- **Displayed** in the header section
- **Included in URL**: `index.html?id=APP-20241104-143022-A3B7`

### 2. Auto-Save

- **Saves automatically** 1 second after you stop typing
- **Stored in browser** localStorage keyed by appraisal ID
- **Persists** even if you close the browser
- **Visible** in "Last saved" timestamp in header

### 3. Sharing Workflow

#### Option A: Employee Starts Appraisal

1. **Employee opens** the app (gets unique ID automatically)
2. **Employee fills** in their sections (auto-saves)
3. **Employee clicks** "Email Link" button
4. **Email opens** with:
   - Subject: "Performance Appraisal - [Name] - Ready for Manager Review"
   - Body: Includes link with unique ID
   - Appraisal ID included for reference
5. **Manager receives** email and clicks link
6. **Manager opens** same appraisal (data already saved)
7. **Manager completes** their sections
8. **Manager saves** to SharePoint when done

#### Option B: Manager Starts Appraisal

1. **Manager opens** the app (gets unique ID)
2. **Manager fills** in employee info
3. **Manager clicks** "Email Link" button
4. **Email opens** with:
   - Subject: "Performance Appraisal - [Name] - Action Required"
   - Body: Includes link with unique ID
5. **Employee receives** email and clicks link
6. **Employee opens** same appraisal (employee info already filled)
7. **Employee completes** their sections
8. **Manager completes** their sections
9. **Save to SharePoint** when both are done

### 4. Share Link Button

- **Click "Share Link"** button
- **Link is copied** to clipboard automatically
- **Paste into** Outlook, Teams, or any email client
- **Link includes** unique ID, so recipient gets same appraisal

### 5. Email Link Button

- **Click "Email Link"** button
- **Automatically detects** who is sending (employee or manager)
- **Opens email client** with pre-filled:
  - Subject line
  - Email body with link
  - Appraisal ID
- **Also copies** email template to clipboard as backup

## Important Notes

### For Local File Sharing

If sharing the HTML file directly (not hosted):

1. **Each person** needs the same file
2. **Share the link** like: `file:///path/to/index.html?id=APP-20241104-143022-A3B7`
3. **Or better**: Host the file on a shared drive or SharePoint
4. **Then share**: `https://sharepoint.com/.../index.html?id=APP-20241104-143022-A3B7`

### For Hosted Version (Recommended)

If deployed to Azure Static Web Apps or similar:

1. **Share links work perfectly**: `https://your-app.com/index.html?id=APP-20241104-143022-A3B7`
2. **Everyone** can access the same appraisal
3. **Data persists** in each user's browser
4. **No file sharing** needed

## Security & Validation

### Unique ID Validation

- **Each appraisal ID** is unique and cannot be guessed
- **Format ensures** no duplicates (timestamp + random)
- **ID is included** in all saved data for validation
- **Can verify** appraisal authenticity by checking ID format

### Data Protection

- **Data stored locally** in browser (not sent to server until SharePoint save)
- **Each appraisal** is isolated by unique ID
- **No cross-user** data access
- **SharePoint save** requires authentication

## Workflow Example

```
1. Manager opens app → Gets ID: APP-20241104-143022-A3B7
2. Manager fills employee name, department, etc.
3. Manager clicks "Email Link"
4. Email opens with link: https://app.com/index.html?id=APP-20241104-143022-A3B7
5. Manager sends email to employee
6. Employee clicks link → Same ID opens → Employee info already filled
7. Employee completes self-assessment → Auto-saves
8. Employee clicks "Email Link" → Sends to manager
9. Manager clicks link → Employee sections already filled
10. Manager completes assessment
11. Both save to SharePoint when done
```

## Troubleshooting

### Link doesn't work
- **Check** if file is hosted (not just local file://)
- **Verify** unique ID is in URL: `?id=APP-...`
- **Ensure** both users have access to same file location

### Data not loading
- **Check** browser localStorage is enabled
- **Verify** URL includes the correct unique ID
- **Clear** browser cache if needed

### Email not opening
- **Check** default email client is configured
- **Use** "Share Link" button and copy/paste manually
- **Email template** is also copied to clipboard

