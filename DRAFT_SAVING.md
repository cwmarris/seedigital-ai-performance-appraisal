# Saving Drafts - How It Works

## Multiple Ways to Save Drafts

The Performance Appraisal System has **three ways** to save drafts (incomplete forms):

### ✅ 1. Auto-Save (Automatic)

**What happens:**
- **Saves automatically** every 1 second after you stop typing
- **Saves to browser** localStorage (no button click needed)
- **Works for drafts** - saves incomplete forms
- **No data loss** - even if you close the browser

**When it saves:**
- Every time you type in a field
- Every time you select a rating
- Every time you check a checkbox
- **Status:** Automatically marked as "draft" if incomplete

**Where it saves:**
- Browser's localStorage
- Keyed by Appraisal ID: `appraisal_APP-20241104-143022-A3B7`

---

### ✅ 2. Save Draft Button (Manual)

**What happens:**
- Click **"Save Draft"** button
- **Saves to browser** localStorage
- **Downloads file** as backup (JSON file)
- **Works for incomplete forms** - no need to complete everything

**When to use:**
- Before closing the browser
- To get a backup file
- When you want to ensure draft is saved

**What you get:**
- ✅ Saved to browser (auto-saved)
- ✅ Downloaded file: `Performance_Appraisal_DRAFT_APP-20241104-143022-A3B7_EmployeeName_ReviewPeriod.json`
- ✅ Status message: "Draft saved successfully!"

---

### ✅ 3. Save to SharePoint Button (For Drafts Too!)

**What happens:**
- Click **"Save to SharePoint"** button
- **Saves to SharePoint** (if configured)
- **Works for drafts** - doesn't require form completion
- **Falls back** to download if SharePoint unavailable

**When to use:**
- When you want to save draft to SharePoint
- When you want to share draft with manager/employee
- When you want cloud backup

**What you get:**
- ✅ Saved to SharePoint (if configured)
- ✅ Filename includes "DRAFT_" prefix if incomplete
- ✅ Status message: "Draft saved to SharePoint successfully!"
- ✅ OR: Downloaded file if SharePoint unavailable

---

## How Drafts Are Identified

### In Filename

**Draft files:**
```
Performance_Appraisal_DRAFT_APP-20241104-143022-A3B7_John_Smith_Jan2024-Jun2024.json
```

**Completed files:**
```
Performance_Appraisal_APP-20241104-143022-A3B7_John_Smith_Jan2024-Jun2024.json
```

### In JSON Data

**Draft status:**
```json
{
  "appraisalId": "APP-20241104-143022-A3B7",
  "status": "draft",
  "employeeInfo": { ... },
  ...
}
```

**Completed status:**
```json
{
  "appraisalId": "APP-20241104-143022-A3B7",
  "status": "completed",
  "employeeInfo": { ... },
  ...
}
```

---

## What Gets Saved

**All drafts save:**
- ✅ **Appraisal ID** - Unique identifier
- ✅ **Employee Information** - Whatever is filled
- ✅ **Competencies** - Even if only 1 is filled
- ✅ **Self-Reflection** - Even if partially filled
- ✅ **Goals** - Even if only 1 is filled
- ✅ **Manager Assessment** - Even if partially filled
- ✅ **Status** - "draft" or "completed"
- ✅ **Last Saved** - Timestamp

**You can save:**
- ✅ Empty form (just ID)
- ✅ Partially filled form
- ✅ Employee section only
- ✅ Manager section only
- ✅ Complete form

---

## Workflow Examples

### Example 1: Employee Starts Appraisal

1. **Employee opens** app → Gets ID: `APP-20241104-143022-A3B7`
2. **Employee fills** name and department → **Auto-saves** (draft)
3. **Employee clicks** "Save Draft" → Downloads backup file
4. **Employee continues** filling form → **Auto-saves** continue
5. **Employee clicks** "Save to SharePoint" → Saves draft to cloud
6. **Employee shares** link with manager → Manager can see draft
7. **Manager completes** their sections → **Auto-saves** continue
8. **Manager clicks** "Save to SharePoint" → Saves as completed

### Example 2: Quick Save Before Closing

1. **User opens** app → Gets ID
2. **User fills** some fields → **Auto-saves** (draft)
3. **User clicks** "Save Draft" → Downloads backup
4. **User closes** browser → Data is safe (auto-saved + backup)
5. **User opens** link later → All data loads automatically

---

## Important Notes

### ✅ Drafts Are Always Saved

- **Auto-save** happens every second
- **No data loss** - even incomplete forms are saved
- **Browser storage** persists even after closing
- **SharePoint save** works for drafts too

### ✅ No Completion Required

- **You can save** with any amount of data
- **Empty form** can be saved (just has ID)
- **Partially filled** form can be saved
- **Complete form** can be saved

### ✅ Multiple Save Options

1. **Auto-save** - Automatic, no action needed
2. **Save Draft** - Manual, downloads backup
3. **Save to SharePoint** - Cloud save, works for drafts

---

## Summary

**Drafts are saved automatically:**
- ✅ Every second while typing (auto-save)
- ✅ Click "Save Draft" for backup file
- ✅ Click "Save to SharePoint" for cloud save

**No completion required:**
- ✅ Save empty form
- ✅ Save partial form
- ✅ Save complete form

**All saves include:**
- ✅ Appraisal ID
- ✅ All filled data
- ✅ Status (draft/completed)
- ✅ Timestamp

**Your data is safe:**
- ✅ Auto-saved to browser
- ✅ Can download backup
- ✅ Can save to SharePoint
- ✅ No data loss

