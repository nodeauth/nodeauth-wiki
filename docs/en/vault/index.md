---
description: "NodeAuth Vault Management Comprehensive Guide. Covers core operations of adding, deleting, modifying, and querying 2FA tokens, as well as advanced features like site-wide search, smart sorting, and deep classification to help you build an orderly digital identity vault."
---
# 👤 Vault Management

The core of NodeAuth is managing your Two-Factor Authentication (2FA) accounts. All operations are executed in a **fully encrypted** environment.

---

## ➕ Adding an Account
Click the **"+"** or **"Add"** button on the main interface. The system supports three minimalist ways to add accounts:

### 1. Camera Scan (Recommended)
Directly scan the 2FA QR code provided by the third-party platform (e.g., GitHub, Google) using your camera.

### 2. Image Recognition
If the QR code is saved in your phone's photo album or is a screenshot sent by someone else, you can use the "Image Recognition" feature to extract the key directly.

### 3. Manual Entry
If you cannot scan the code (e.g., screen damage or the key is provided in text format), choose this option. You will need to fill in the following fields:
*   **Service Name**: e.g., `Google` or `GitHub`.
*   **Account Identity**: Usually your email address or username.
*   **Secret Key**: Enter the key in Base32 format.
*   **Advanced Parameters (Default settings usually sufficient)**:
    *   **Algorithm**: Supports SHA1 (default), SHA256, and SHA512.
    *   **Digits**: Supports 6 digits (default) or 8 digits.
    *   **Updating Period**: Supports 30 seconds (default) or 60 seconds.
*   **Category**: Optional. Classify the account into folders like "Work" or "Personal".

> [!TIP]
> **Steam Specific**: When you manually enter a key that contains `steam://` or is identified as Steam format, NodeAuth will automatically adjust the **Digits** to 5 and adapt the Steam-exclusive algorithm without manual configuration.

<!-- [📸 UI Mockup Tip: Tabs for adding accounts, highlighting form details for "Manual Entry"] -->

## 📝 Modifying an Account
Click the **"Edit"** icon on the right side of the account list:
*   You can modify the account label, category, or notes.
*   For security reasons, the original Secret is hidden by default.

## 🗑️ Deleting an Account
In the edit interface, or if you decide it's no longer needed after exporting, click **"Delete"**:
1. To prevent accidental deletion, a secondary confirmation box will pop up.
2. **Note**: Deletion is **irreversible**. Please ensure you have backups on other devices or have disabled 2FA on the respective platform.

## 📤 Exporting a Single Account
If you only need to share a specific account with someone else:
1. Click the **"Share"** icon on the right side of the account.
2. The system will generate a temporary QR code with the `otpauth://` protocol.

<!-- [📸 UI Mockup Tip: Popup window for adding accounts, including the scan button and manual entry fields] -->

---

## 📁 Advanced: Category Management
You can classify accounts based on different purposes (e.g., Work, Social, Finance):
1. Switch to "Category Management" in the sidebar or Tab page.
2. Create a new icon and category name.
3. Select the corresponding category when editing an account.
4. Click on the category label at the top of the main list to filter all accounts under that category with one click.

## 🔍 Advanced: Real-time Search
*   **Keyword Matching**: The search bar above the main list supports real-time fuzzy search for "Account Name", "Notes", and "Issuer".
*   **Quick Clear**: The search status will automatically reset when switching Tabs or clicking the clear button.

## 📶 Advanced: Custom Sorting
NodeAuth provides multiple sorting methods to satisfy different usage habits:

### 1. Drag-and-Drop Sorting
*   Enable sorting mode (or long-press a card) to manually drag cards and adjust their order.
*   Sorting results are persisted in the cloud in real-time, ensuring consistency across devices.

### 2. Policy-Based Sorting
In the Settings page, you can choose from preset sorting logic:
*   **Alphabetical (A-Z)**: Arrange alphabetically by account name.
*   **Most Used**: Place accounts most frequently clicked to copy at the very top.
*   **Added Time**: Arrange in the order they were added.

## 🎚️ Display Density Adjustment
In "Appearance Settings", you can switch between:
*   **Card Mode**: Default mode, shows icons, clearer visibility.
*   **List Mode (Compact)**: Single-line display with high screen utilization, suitable for users with a large number of accounts.

<!-- [📸 UI Mockup Tip: Show category label filtering and the drag-and-drop sorting state on the main page] -->
