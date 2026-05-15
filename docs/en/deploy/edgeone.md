---
description: "Tencent Cloud EdgeOne Edge Function Deployment NodeAuth Tutorial. Details how to utilize the Tencent Cloud edge computing platform to host the 2FA system, covering key steps like edge function creation, code injection, environment variable configuration, and route binding. Provides you with another high-performance serverless deployment option outside of Cloudflare."
---
# Tencent Cloud EdgeOne Deployment Tutorial

Tencent Cloud EdgeOne is an edge computing platform. Since NodeAuth follows standard Serverless Worker specifications, it can be easily deployed as EdgeOne edge functions.

---

## 🛠️ Deployment Steps

### 1. Create an Edge Function
1. Log in to the [Tencent Cloud EdgeOne Console](https://console.cloud.tencent.com/edgeone).
2. Go to the `Edge Functions` module and click "New Function."
3. Select "Blank Template" or upload code from your local machine.

### 2. Configure Code
Paste the contents of the built `dist/index.js` file into EdgeOne's online editor.

### 3. Set Environment Variables
In the function's "Configuration Suggestions" or "Environment Variables" tab, add the essential parameters (refer to the [Environment Variables Configuration Manual](./env)):
*   `ENCRYPTION_KEY`
*   `JWT_SECRET`
*   `OAUTH_ALLOWED_USERS`

### 4. Bind Route
In EdgeOne Domain Management, configure the corresponding trigger path for the function (typically `/*`).

---

## 📝 Notes
*   **Database Compatibility**: The method for binding the D1 database in the EdgeOne environment is slightly different from Cloudflare. Please refer to Tencent Cloud's official D1 adaptation documentation.
*   **Request Limits**: Ensure that your EdgeOne plan has sufficient quota to support the application's concurrent requests.
