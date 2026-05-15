---
description: "NodeAuth Ghost Mode Detailed Explanation. Achieves an instant 15px Gaussian blur overlay upon background switching by monitoring browser visibility, effectively preventing task manager snapshot leaks. Combined with the \"Privacy Long Press to View\" mechanism and operation desensitization prompts, it provides a physical-level privacy barrier for your 2FA dynamic codes in public social scenarios like subways and elevators."
---
# Ghost Mode

Ghost Mode is designed to protect your data privacy in physical social settings, preventing snooping or accidental screen leaks via screen previews.

---

## 👻 Core Features

### 1. Automatic Gaussian Blur
Once enabled, NodeAuth will monitor the browser's `visibilitychange` event in real-time:
*   **Background Instant Activation**: When you swipe up to switch apps on your phone or switch windows on your computer, a **15px Gaussian blur** will immediately cover the NodeAuth interface.
*   **Prevent Task Snapshots**: This effectively prevents the operating system from generating thumbnails containing your 2FA dynamic codes in the "Task Manager / App Switcher" preview.

### 2. Privacy Long-Press to View
By default, the verification codes in the list are masked as `••••`:
*   **Long-Press to Reveal**: You must long-press the item with your finger for more than 250ms for the real code to fade in.
*   **Anti-Accidental Contact**: The code is masked again as soon as you release your finger, greatly reducing the probability of code leakage in crowded subways or elevators.

### 3. Sensitive Operation Desensitization
When performing high-risk operations such as importing, exporting, or resetting the master key, the system automatically lowers the background transparency and removes obvious red dot reminders.

## 🛠️ How to Configure
1. Go to "System Settings" -> "**Ghost Mode Settings**".
2. Respectively enable "**Anti-snooping Mode (Background Blur)**" and "**Privacy List Display**".

<!-- [📸 UI Mockup Tip: Comparison diagram showing the blur effect in the phone's app switcher after enabling Ghost Mode] -->
