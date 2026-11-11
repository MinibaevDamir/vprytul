<script setup lang="ts">
// Англійська частина Google Docs «(Оновлено) Політика захисту даних мобільного
// застосунку «Впритул» (VPRYTUL)» (10.11.2026); українська версія — /data-protection-policy
</script>

<template>
  <LegalPage
    lang="en"
    title="Data Protection Policy"
    description="Data Protection Policy of the VPRYTUL app: organizational and technical security measures, the registry of subprocessors and the data breach protocol."
    path="/en/data-protection-policy"
    alt="/data-protection-policy"
  >
    <p>This Data Protection Policy (the "Policy") is an internal and public document of the <strong>SERHIY PRYTULA CHARITY FOUNDATION (EDRPOU code: 43720363)</strong> (hereinafter referred to as the "Foundation" or "Data Controller"). The document defines the specific technical, engineering, and organizational measures implemented to protect the Personal Data of users of the "VPRYTUL" mobile application and the official website www.vprytul.app (collectively, the "Service"), in accordance with the Law of Ukraine "On Personal Data Protection," the European GDPR, and the US CCPA.</p>
    <h2>1. Organizational Security Measures</h2>
    <p>The Foundation implements strict internal access controls for users' Personal Data:</p>
    <p>1.1. <strong>Principle of Least Privilege:</strong> Access to the user database and the administrator panel is granted exclusively to a limited number of Foundation employees who require this information to perform their job duties (authorized technical, communication, and administrative specialists of the Foundation).</p>
    <p>1.2. <strong>Non-Disclosure Agreements (NDA):</strong> All Foundation employees and engaged specialists with access to Personal Data have signed individual confidentiality agreements, prohibiting the disclosure of information to third parties.</p>
    <p>1.3. <strong>Logging and Auditing:</strong> Any administrator actions within the system (e.g., viewing data, changing statuses, approving quests) are automatically recorded in the system's security logs. This allows us to track exactly who accessed the information and when.</p>
    <h2>2. Technical and Engineering Protection Measures</h2>
    <p>To ensure the confidentiality and integrity of data, a modern security technology stack is applied:</p>
    <p>2.1. <strong>Encryption in Transit (Data in Transit):</strong> All interactions between the user's device (the mobile app or web browser on the www.vprytul.app Site) and the backend servers are protected by the TLS/SSL cryptographic protocol using automatically validated SSL certificates (Amazon Issued). Intercepting data over networks is technically impossible.</p>
    <p>2.2. <strong>Encryption at Rest (Data at Rest):</strong> Databases and file storages containing user information are encrypted using the AES-256 standard at the cloud infrastructure level.</p>
    <p>2.3. <strong>Anti-Brute Force Protection:</strong> Registration and authentication processes are protected by algorithms that prevent automated guessing of email addresses or phone numbers (protecting the login flow from external scanning).</p>
    <h2>3. Registry of Authorized Subprocessors and Third Parties</h2>
    <p>To ensure stable technical operations, send notifications, and process payments, the Foundation engages reliable third-party services (Subprocessors). Data is transferred exclusively to the extent necessary to perform a specific technical function.</p>
    <div class="legal-table">
      <table>
        <thead>
          <tr>
            <th scope="col">Sub-processor / Service</th>
            <th scope="col">Role and Function in the Project</th>
            <th scope="col">Categories of Data Transferred</th>
            <th scope="col">Security Measures and Processing Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Microsoft Azure</th>
            <td>Cloud infrastructure, database, and app server hosting managed by the <strong>SERHIY PRYTULA CHARITY FOUNDATION (EDRPOU code: 43720363)</strong>.</td>
            <td>All user profiles (email, name, phone number), geolocation, quest logs, and device analytics.</td>
            <td>Servers are located in secure EU data centers (West Europe / North Europe regions and others). AES-256 encryption, network isolation (Virtual Network / Network Security Groups), ISO 27001, SOC 1/2/3 certifications.</td>
          </tr>
          <tr>
            <th scope="row">Qela Inc.</th>
            <td>Platform vendor (White-label developer). Provides technical support, code updates, and debugging at the request of the <strong>SERHIY PRYTULA CHARITY FOUNDATION</strong></td>
            <td>Access to backend technical logs during troubleshooting (without the right to independent use or copying of databases).</td>
            <td>Access is governed by a Data Processing Agreement (DPA). Restricted access via secure IAM roles exclusively on the servers of the <strong>SERHIY PRYTULA CHARITY FOUNDATION</strong>.</td>
          </tr>
          <tr>
            <th scope="row">LLC "LIVECODES"</th>
            <td>Sub-licensor of the platform in Ukraine, intermediary in technical support.</td>
            <td>Access to technical logs and anonymized analytics (at the Foundation's request).</td>
            <td>Strict access control, signed Non-Disclosure Agreements (NDA).</td>
          </tr>
          <tr>
            <th scope="row">LiqPay (JSC CB PrivatBank)</th>
            <td>Payment gateway for one-time donations and monthly recurring subscriptions.</td>
            <td>Phone number, email, donation amount, unique transaction ID. <strong>Important:</strong> payment card data is entered on the bank's secure page and is not collected by the <strong>SERHIY PRYTULA CHARITY FOUNDATION</strong></td>
            <td>Data centers in Ukraine/EU. Full compliance with the international Payment Card Industry Data Security Standard (PCI DSS).</td>
          </tr>
          <tr>
            <th scope="row">Apple Pay / Google Pay</th>
            <td>Native mobile payment systems for charitable contributions.</td>
            <td>Transaction ID, tokenized payment data, donation amount.</td>
            <td>Reliable tokenization at the OS level, direct bank card data is not transmitted.</td>
          </tr>
          <tr>
            <th scope="row">SendGrid (Twilio Inc.)</th>
            <td>Automated transactional email service (sending welcome emails and registration confirmations).</td>
            <td>Email address, user's name (for personalizing system emails).</td>
            <td>TLS encryption in transit. Data centers in the US/EU compliant with GDPR / Privacy Shield standards.</td>
          </tr>
          <tr>
            <th scope="row">Google LLC — Gmail SMTP</th>
            <td>Sending transactional emails (User portal, MobileHost).</td>
            <td>Recipient's email address, name, and email content.</td>
            <td>US; TLS encryption in transit; Google Cloud DPA.</td>
          </tr>
          <tr>
            <th scope="row">Google LLC — Firebase Cloud Messaging</th>
            <td>Delivery of push notifications (backend-initiated, Android and iOS clients).</td>
            <td>FCM push token, Device ID, notification content, UserId, IP address.</td>
            <td>US / global Google infrastructure; encryption in transit; Firebase Terms / Google Cloud DPA.</td>
          </tr>
          <tr>
            <th scope="row">Google LLC — Firebase Crashlytics</th>
            <td>Collection of app crash reports (Android, iOS).</td>
            <td>Device model, OS/app version, stack trace, Device ID, IP address.</td>
            <td>US; Firebase Terms / Google Cloud DPA.</td>
          </tr>
          <tr>
            <th scope="row">Google LLC — Firebase App Check</th>
            <td>Protection of API requests from abuse/bot traffic via device attestation (iOS).</td>
            <td>Technical device attestation token, Device ID.</td>
            <td>US / global Google infrastructure; Firebase Terms / Google Cloud DPA.</td>
          </tr>
          <tr>
            <th scope="row">Google LLC — Google Maps Platform</th>
            <td>Map display, geocoding, and geolocation for geo-quests and delivery addresses (Android, iOS).</td>
            <td>GPS coordinates, IP address, entered address, Device ID.</td>
            <td>US / EU; Google Maps Platform Terms / Google Cloud DPA.</td>
          </tr>
          <tr>
            <th scope="row">Google LLC — Google Sign-In / Identity Services</th>
            <td>Authentication via Google account (backend, Android, iOS).</td>
            <td>Email address, name, Google User ID / ID token, profile picture, OAuth tokens.</td>
            <td>US / EU; Google API Services User Data Policy / Google Cloud DPA.</td>
          </tr>
          <tr>
            <th scope="row">Google LLC — YouTube Player (IFrame Player / YouTubePlayerKit)</th>
            <td>Video playback in quests (Android, iOS).</td>
            <td>IP address, Device ID, viewing data.</td>
            <td>US; YouTube API Services Terms / Google Privacy Policy.</td>
          </tr>
          <tr>
            <th scope="row">Google LLC — Google Play Services (App Update API, Advertising ID)</th>
            <td>Enforcement of app updates; device advertising identifier (Android).</td>
            <td>Advertising ID (AD_ID), app version.</td>
            <td>US; Google Play Services Terms.</td>
          </tr>
          <tr>
            <th scope="row">Microsoft Azure — App Service (Backend/API Hosting)</th>
            <td>Hosting of the app's API/backend.</td>
            <td>All Personal Data passing through the API — profile data, phone number, email address, and content.</td>
            <td>West Europe; HTTPS/TLS encryption in transit; Microsoft Products and Services DPA.</td>
          </tr>
          <tr>
            <th scope="row">Microsoft Azure Blob Storage</th>
            <td>Storage of user-uploaded files/images.</td>
            <td>User files/photos associated with UserId/OrganizationId.</td>
            <td>West Europe; encryption at rest; Microsoft Products and Services DPA.</td>
          </tr>
          <tr>
            <th scope="row">Microsoft Azure Key Vault</th>
            <td>Storage of encryption keys for the DataProtection keyring.</td>
            <td>Does not directly store Personal Data — only the cryptographic keys used to protect Personal Data.</td>
            <td>West Europe; provider's hardware HSM module; Microsoft Products and Services DPA.</td>
          </tr>
          <tr>
            <th scope="row">Azure DevOps (Microsoft Corporation)</th>
            <td>CI/CD — building and storing app artifacts.</td>
            <td>Does not directly process users' Personal Data — only source code/build artifacts.</td>
            <td>West Europe; Microsoft Products and Services DPA.</td>
          </tr>
          <tr>
            <th scope="row">Stripe</th>
            <td>International payment processing.</td>
            <td>Payer's email, masked card data (last 4 digits), amount, transaction ID.</td>
            <td>USA; PCI-DSS standard on Stripe's side, card data is not stored by the app.</td>
          </tr>
          <tr>
            <th scope="row">Apple Inc. — Sign in with Apple</th>
            <td>Authentication via Apple ID (iOS app + backend token validation).</td>
            <td>Email address (possibly an Apple Private Relay address), Apple User ID (sub).</td>
            <td>US; token signature verified via Apple's public keys; Apple Developer Agreement.</td>
          </tr>
          <tr>
            <th scope="row">SignalR Backend (real-time server)</th>
            <td>Real-time messaging and data synchronization.</td>
            <td>User ID, Organization ID, messages, service events, technical logs.</td>
            <td>Within the infrastructure of the <strong>SERHIY PRYTULA CHARITY FOUNDATION (EDRPOU code: 43720363)</strong>; Internal Data Processing Agreement (DPA).</td>
          </tr>
          <tr>
            <th scope="row">Backend API (via Alamofire/Moya)</th>
            <td>Execution of app business logic and processing of API requests.</td>
            <td>Account data, User ID, Organization ID, and Personal Data transmitted via the API.</td>
            <td>Within the infrastructure of the <strong>SERHIY PRYTULA CHARITY FOUNDATION (EDRPOU code: 43720363)</strong>; Internal Data Processing Agreement (DPA).</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2>4. Data Breach Protocol</h2>
    <p>The Foundation has a clear action plan in the event of a cyber threat or unauthorized access to our servers:</p>
    <p>4.1. <strong>Isolation and Containment:</strong> Upon detecting a breach attempt, the technical team immediately blocks compromised sessions, isolates the affected segments of the AWS servers, and terminates any suspicious processes.</p>
    <p>4.2. <strong>Investigation:</strong> Within the first few hours, a detailed technical audit of the logs is conducted to determine the scope of the incident.</p>
    <p>4.3. <strong>Notification (72-Hour Rule):</strong> If a risk of a Personal Data breach that could harm users is identified, the Foundation commits to the following within 72 hours of becoming aware of the incident:</p>
    <ul>
      <li>Notify the Ukrainian Parliament Commissioner for Human Rights (or the relevant Data Protection Authorities in the EU if the incident affects EU residents);</li>
      <li>Send official email notifications to the affected users with clear instructions (e.g., a recommendation to update passwords).</li>
    </ul>
    <h2>5. Policy Control and Updates</h2>
    <p>5.1. This Policy is reviewed at least once every six months, or more frequently if necessary, as well as whenever new technical integrations are implemented, payment gateways are changed, or the cloud architecture of the application is updated.</p>
    <p>5.2. The current version of this document is always available in digital format for the Foundation's internal IT team and legal department.</p>
  </LegalPage>
</template>
