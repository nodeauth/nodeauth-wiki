---
description: "NodeAuth Zero-Knowledge Architecture Underlying Principle Popularization. Explains the design philosophy of \"No Touch, No Peek, No Hold\" in an easy-to-understand way. Deeply explores how the master password is derived via PBKDF2 to achieve local data decryption, revealing why your 2FA assets remain absolutely secure even if the server is compromised."
---
# Zero-Knowledge Architecture (Zero-Knowledge)

NodeAuth utilizes a "Zero-Knowledge" architecture, officially aligning its security standards with top-tier password managers like 1Password and Bitwarden.

## Core Architectural Design

To make NodeAuth completely blind (Zero-Knowledge), we created a highly sophisticated "double blind" mechanism:

### Move 1: Frontend Masking (Preventing Server Prying)
We no longer allow the frontend to send the 2FA seed directly to the backend.
Instead, the moment you click "Save" for an authenticator, the browser uses a **Masking Key known only to your device** to encrypt the long seed locally, turning it into a ciphertext starting with `nodeauth:`.
The server receives this `nodeauth:` string. The server doesn't know what it contains and can only safely store it.

### Move 2: Who acts as the "Master Password"? (Environment as Password)
In Bitwarden, you memorize a "Master Password" to generate that key. But NodeAuth uses third-party accounts (OAuth) to log in, so you've never set a Master Password. What do we do?

**Solution:**

When your system starts and verifies your identity, the server securely distributes a unique "Device Salt" to your browser. Your browser combines its environmental lock in a secure black box (Web Crypto API) to calculate a **Masking Key** and stores it in the browser's core safe (Session/IndexedDB).
This key is **never sent back to the server over the network**.
Meaning: even if a hacker compromises the server, the `nodeauth:` ciphertext they get is useless because the decryption key resides only inside your personal browser!

### Move 3: Anti-Interception Secure Delivery (RSA Handshake)
If the server distributes the "Device Salt" to the frontend over the network, what if a hacker intercepts it (Man-in-the-Middle)?

**Solution:**

We constructed an espionage-level handshake:
1. Every time the browser starts, it generates a one-time "small silver lock" (RSA Public Key) and throws it to the server.
2. The server puts the "salt" inside the lock, snaps it shut, and throws it back over the network.
3. Even if hackers intercept the package, they can't open it. Only your browser, possessing the matching "key" (RSA Private Key), can open it and retrieve the actual salt. This thoroughly prevents all prying attempts, including Man-in-the-Middle attacks.

### Move 4: What is the server's job? (Matryoshka Encryption)
Does the server's database encryption still matter then?

**Solution: Matryoshka!**

After the server receives your `nodeauth:` ciphertext, even though it can't read it, it still faithfully uses the original "database encryption key" (`ENCRYPTION_KEY`) to put **another layer of bulletproof vest** on it before writing it to the disk.

When you need to view a 2FA code:
1. The server strips off the outer vest (decrypts SSE).
2. It spits the intact `nodeauth:` ciphertext out to the frontend.
3. The frontend uses its own key to strip the inner vest and renders the jumping 6-digit confirmation code on your screen.

## Summary
This is the essence of NodeAuth's Zero-Knowledge architecture: **By combining "Asymmetric Handshake + Frontend Masking," we transformed your "Current Browser Environment" into an invisible Bitwarden Master Password.**

The final result: NodeAuth's backend has become a thoroughly "blind storage." It diligently protects your data and syncs it across devices, but from beginning to end, it has never even seen a glimpse of your 2FA verification codes—achieving core asset protection completely equivalent to that of commercial-grade password managers.
