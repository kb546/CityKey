# 🚀 Deployment Guide for CityKey

Since your API keys are private, you cannot simply push them to GitHub. Here are the two best ways to share your working app with judges and friends.

## Option 1: Live Web Demo (Recommended for Judges) 🏆

The most professional way is to deploy a live link using Vercel.

1.  **Create a Vercel Account**
    *   Go to [vercel.com](https://vercel.com) and sign up with GitHub.

2.  **Import Project**
    *   Click **"Add New"** > **"Project"**.
    *   Select your `CityKey` repository.

3.  **Configure Environment Variables** (Critical!)
    *   Before clicking Deploy, look for the **"Environment Variables"** section.
    *   Add the following keys (copy them from your `.env.local` file):
        *   `OPENAI_API_KEY`: `sk-proj-...`
        *   `LINGODOTDEV_API_KEY`: `api_...`

4.  **Deploy**
    *   Click **"Deploy"**.
    *   Wait ~1 minute.
    *   🎉 You will get a live URL (e.g., `citykey.vercel.app`) to share with judges.

---

## Option 2: Friend Running Locally 💻

If your friend needs to run the code on their own laptop:

1.  **Friend Clones the Repo**
    ```bash
    git clone https://github.com/kb546/CityKey.git
    cd CityKey
    npm install
    ```

2.  **Send the Keys Securely**
    *   Send your `.env.local` file to your friend via **Slack, WhatsApp, or Email**.
    *   **DO NOT** upload this file to Discord public channels or GitHub.

3.  **Friend Sets Up**
    *   They must place the `.env.local` file inside the `CityKey` folder.
    *   Then they run:
        ```bash
        npm run dev
        ```

---

## ⚠️ SECURITY WARNING

**NEVER push your `.env.local` file to GitHub.**
If you push your OpenAI key to a public repository, OpenAI's automated scanners will detect it and **revoke/delete your key immediately** to prevent fraud. Always keep keys local or in build settings (like Vercel).
