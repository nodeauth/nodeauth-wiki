---
description: "NodeAuth End-to-End Encryption (E2EE) Implementation Standard. Details the application of the high-strength AES-GCM encryption algorithm throughout the entire lifecycle of data transmission and storage. Introduces how data is physically encrypted before leaving the browser, ensuring it always exists in ciphertext across any insecure channels to meet commercial-grade security standards."
---
# End-to-End Encryption (E2EE)

NodeAuth implements standard **End-to-End Encryption (E2EE)** for its core identity assets (2FA secrets). To ensure users understand how their data flows, we've broken down the cryptographic principles of this architecture:

## 1. What is End-to-End Encryption?

In the field of security, "end-to-end" means encryption happens at one "end" (the user's browser) and decryption happens at the other "end" (also the user's browser). All intermediary nodes (including NodeAuth servers, databases, and network connections) are physically unable to decrypt or peek into the original data.

- **Origin (Browser)**: The moment you save an authenticator seed, the data is already encrypted locally with a Masking Key.
- **Intermediary (Server/Database)**: The server receives already-encrypted text. It cannot decrypt it and acts only as a "blind storage" on your behalf.
- **Destination (Browser)**: Only when you log in and verify your identity again does the encrypted data stream return to your local environment to be decrypted.

## 2. Hybrid Encryption Strategy (E2EE + SSE)

To balance **extreme security** with an **extreme user experience**, NodeAuth employs a layered encryption strategy:

| Data Type | Encryption Method | Purpose / Advantage |
| :--- | :--- | :--- |
| **2FA Secret** | **End-to-End Encryption (E2EE)** | These assets hold the highest value. Even if the server is compromised or an admin attempts to pry, it is physically impossible to see your seed, achieving true Zero-Knowledge. |
| **Metadata (Apps/Accounts)** | **Server-Side Encryption (SSE)** | These are encrypted by the server on your behalf. This allows the server to perform **search, sorting, and pagination** in a decrypted state, ensuring the system remains smooth even with hundreds of accounts. |

## 3. Security Conclusion

NodeAuth's End-to-End Encryption mechanism ensures that your 2FA seeds remain readable only by you throughout their entire network transmission and storage lifecycle. This achieves a core asset protection level equivalent to commercial-grade password managers like 1Password and Bitwarden.
