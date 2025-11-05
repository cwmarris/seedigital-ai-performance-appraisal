# Appraisal ID - Automatic Generation and Saving

## How Appraisal ID Works

### ✅ Automatic Generation

The Appraisal ID is **automatically generated** when you first open the application. You don't need to do anything - it happens automatically!

**When it's generated:**
1. **On page load** - If no ID exists in the URL, a new one is created
2. **Before saving** - Ensures ID exists before any save operation
3. **Always visible** - Displayed in the header section

**Format:** `APP-YYYYMMDD-HHMMSS-XXXX`
- Example: `APP-20241104-143022-A3B7`
- **APP** = Prefix
- **20241104** = Date (YYYYMMDD)
- **143022** = Time (HHMMSS)
- **A3B7** = Random characters for uniqueness

### ✅ How It Gets Saved

The Appraisal ID is **automatically included** in all save operations:

#### 1. **Auto-Save to Browser (localStorage)**
- **When:** Every 1 second after you stop typing
- **Where:** Browser's localStorage
- **Key:** `appraisal_APP-20241104-143022-A3B7`
- **Includes:** Full appraisal data + Appraisal ID

#### 2. **Save to SharePoint**
- **When:** You click "Save to SharePoint"
- **Where:** SharePoint document library
- **Filename:** `Performance_Appraisal_APP-20241104-143022-A3B7_EmployeeName_ReviewPeriod.json`
- **Includes:** Appraisal ID in:
  - ✅ Filename (for easy identification)
  - ✅ JSON data (inside the file)
  - ✅ PDF report (if generated)

#### 3. **Included in JSON Data**

When you save, the JSON structure includes:
```json
{
  "appraisalId": "APP-20241104-143022-A3B7",
  "employeeInfo": { ... },
  "competencies": [ ... ],
  "selfReflection": { ... },
  "goals": [ ... ],
  "managerAssessment": { ... },
  "employeeAcknowledgment": { ... },
  "savedDate": "2024-11-04T14:30:22.000Z",
  "lastSaved": "2024-11-04T14:30:22.000Z"
}
```

### ✅ Visibility and Tracking

**Where you can see the Appraisal ID:**

1. **In the Header** - Always displayed at the top
   ```
   Appraisal ID: APP-20241104-143022-A3B7
   ```

2. **In the URL** - When sharing links
   ```
   index.html?id=APP-20241104-143022-A3B7
   ```

3. **In SharePoint Filename** - When saved
   ```
   Performance_Appraisal_APP-20241104-143022-A3B7_John_Smith_Jan2024-Jun2024.json
   ```

4. **In JSON Data** - Inside the saved file
   ```json
   {
     "appraisalId": "APP-20241104-143022-A3B7",
     ...
   }
   ```

5. **In PDF/Report** - If exported
   ```
   Appraisal ID: APP-20241104-143022-A3B7
   ```

### ✅ Validation and Security

**How it prevents fake appraisals:**

1. **Unique Format** - Each ID follows a specific pattern
2. **Timestamp-based** - Contains date/time of creation
3. **Random component** - Makes it impossible to guess
4. **Included in all saves** - Can verify authenticity
5. **URL parameter** - Links data to specific appraisal

**To verify an appraisal is real:**
- Check ID format matches: `APP-YYYYMMDD-HHMMSS-XXXX`
- Verify ID is in URL, filename, and JSON data
- Check timestamp matches expected date

### ✅ What Happens When You Share

1. **Employee opens app** → Gets ID: `APP-20241104-143022-A3B7`
2. **Employee fills form** → Auto-saves with ID
3. **Employee clicks "Share Link"** → Link includes: `?id=APP-20241104-143022-A3B7`
4. **Manager opens link** → Same ID loads → Sees employee's saved data
5. **Manager completes sections** → Auto-saves with same ID
6. **Save to SharePoint** → File includes ID in filename and data

### ✅ Data Persistence

**The Appraisal ID ensures:**
- ✅ No data loss when sharing
- ✅ Both parties see same appraisal
- ✅ Easy tracking and identification
- ✅ Authentication of completed appraisals
- ✅ Organized file naming in SharePoint

### ✅ Summary

**Appraisal ID is:**
- ✅ **Automatically generated** - No action needed
- ✅ **Automatically saved** - Included in all saves
- ✅ **Always visible** - Shown in header
- ✅ **Included in filename** - When saving to SharePoint
- ✅ **Included in data** - Inside JSON file
- ✅ **Unique and trackable** - Prevents duplicates

**You don't need to do anything** - the Appraisal ID system works automatically in the background!

