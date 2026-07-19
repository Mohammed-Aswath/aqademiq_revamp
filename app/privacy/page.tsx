import type { Metadata } from "next";
import Link from "next/link";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Aqademiq / R13 Labs privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--aq-paper)", overflowX: "clip" }}>
      <div className={styles.grid}>
        <aside className={styles.toc}>
          <div className="tt">Contents</div>
          <a href="#s1">1. INTRODUCTION</a>
          <a href="#s2">2. DEFINITIONS</a>
          <a href="#s3">3. CATEGORIES OF PERSONAL DATA COLLECTED</a>
          <a href="#s4">4. PURPOSES OF PROCESSING PERSONAL DATA</a>
          <a href="#s5">5. DATA SHARING AND DISCLOSURE</a>
          <a href="#s6">6. DATA RETENTION AND STORAGE</a>
          <a href="#s7">
            7. SECURITY SAFEGUARDS AND REASONABLE SECURITY PRACTICES
          </a>
          <a href="#s8">8. CONSENT MANAGEMENT</a>
          <a href="#s9">9. RIGHTS OF DATA PRINCIPALS</a>
          <a href="#s10">10. PROCESSING OF CHILDREN&apos;S PERSONAL DATA</a>
          <a href="#s11">11. GRIEVANCE REDRESSAL MECHANISM</a>
          <a href="#s12">12. COOKIES AND TRACKING TECHNOLOGIES</a>
          <a href="#s13">13. POLICY UPDATES AND AMENDMENTS</a>
          <a href="#s14">14. GOVERNING LAW AND JURISDICTION</a>
        </aside>
        <div className="lg-main">
          <div className={styles.eyebrow}>
            <span className="e">Legal</span>
            <span className={styles.chip}>Draft</span>
          </div>
          <div id="legalbody">
            <h1 className={styles.title} id="lg-top">
              AQADEMIQ PRIVACY POLICY
            </h1>
            <div className={styles.meta}>Effective Date: 19/07/2026.</div>
            <div className={styles.meta}>Last Updated: 19/07/2026</div>
            <h2 className={styles.sec} id="s1">
              1. INTRODUCTION
            </h2>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>1.</span>
              <div className={styles.t}>
                This Privacy Policy (&quot;Policy&quot;) is issued by R13 Labs
                India Private Limited (&quot;Aqademiq&quot;, &quot;we&quot;,
                &quot;our&quot;, or &quot;us&quot;), the developer and operator of
                the Aqademiq application. This Policy explains how Aqademiq
                collects, Processes (as defined below), stores, uses and shares
                Personal Data (as defined below) in connection with the Platform
                (as defined below) and Services (as defined below). The Policy
                has been prepared in accordance with Applicable Laws (as defined
                below)
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>2.</span>
              <div className={styles.t}>
                This Policy applies to the collection, use, Processing, storage,
                and disclosure of digital Personal Data by Aqademiq when a Data
                Principal (as defined below) accesses or uses the Aqademiq web
                application, available at www.aqademiq.com, mobile application,
                including the “IOS” and “Android” applications, and any related
                interfaces through which the Services are made available,
                collectively referred to as the (&quot;Platform&quot;).
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>3.</span>
              <div className={styles.t}>
                This Policy applies to all individuals located in India who
                access or interact with the Platform in the capacity of a User
                (as defined below) including individuals accessing the Platform
                in Guest Mode (as defined below) prior to registration. Aqademiq
                currently offers its Services to individual Users only, and does
                not, as of the date of this Policy, offer institutional,
                enterprise, or corporate accounts. Aqademiq may introduce the
                Platform in additional jurisdictions after assessing the legal
                and regulatory requirements applicable in those jurisdictions.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>4.</span>
              <div className={styles.t}>
                By accessing or using the Platform, you acknowledge that you have
                been provided with and have had an opportunity to review this
                Policy. Where Aqademiq relies on Consent (as defined below) for
                any Processing activity, such Consent will be requested through a
                clear affirmative action and may be withdrawn in accordance with
                this Policy.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>5.</span>
              <div className={styles.t}>
                This Policy should be read together with Aqademiq&apos;s Terms of
                Service and any other notices or policies that may apply to your
                use of the Platform and Services.
              </div>
            </div>
            <h2 className={styles.sec} id="s2">
              2. DEFINITIONS
            </h2>
            <p className={styles.p}>
              For the purposes of this Policy, the terms below shall have the
              meanings assigned to them in this Section 2. Any capitalised term
              not expressly defined in this Policy shall be interpreted in
              accordance with the Applicable Laws.
            </p>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>1.</span>
              <div className={styles.t}>
                “Applicable Laws” mean the Digital Personal Data Protection Act,
                2023 (“DPDP Act”) and the Digital Personal Data Protection Rules,
                2025 (“DPDP Rules”), as and when the relevant provisions become
                applicable, and other applicable data protection laws in India.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>2.</span>
              <div className={styles.t}>
                &quot;Ada&quot; means the AI-enabled conversational and
                academic-support feature integrated into the Platform that
                assists Users with schedule management, task planning,
                study-related queries and such other functions as may be
                described on the Platform.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>3.</span>
              <div className={styles.t}>
                &quot;Child/Children&quot; means an individual who has not
                attained the age of eighteen (18) years, in accordance with
                Applicable Laws.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>4.</span>
              <div className={styles.t}>
                Consent&quot; means a freely given, specific, informed,
                unconditional, and unambiguous indication of a Data
                Principal&apos;s agreement to the Processing of their Personal
                Data, communicated through a clear affirmative action, including
                ticking a checkbox, clicking an &quot;I Agree&quot; button and
                capable of being withdrawn with ease comparable to the ease with
                which it was given in accordance with Applicable Laws.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>5.</span>
              <div className={styles.t}>
                &quot;Data Fiduciary&quot; means Aqademiq, which determines the
                purpose and means of Processing Personal Data, collected through
                the Platform, in accordance with this Policy and Applicable Laws.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>6.</span>
              <div className={styles.t}>
                &quot;Data Principal&quot; means the individual to whom the
                Personal Data relates, including any individual who downloads,
                accesses, registers on, or otherwise interacts with the Platform,
                and, where applicable, the parent or lawful guardian of a Child.
                For simplicity and readability, the terms &quot;you&quot; and
                &quot;your&quot; refer to the Data Principal.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>7.</span>
              <div className={styles.t}>
                &quot;Data Processor&quot; means any person or entity that
                Processes Personal Data on behalf of Aqademiq, including
                providers of cloud hosting, authentication, artificial
                intelligence infrastructure, communications, customer support,
                security and related technical services.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>8.</span>
              <div className={styles.t}>
                &quot;Grievance Officer&quot; means the individual designated by
                Aqademiq in accordance with Applicable Laws to receive,
                acknowledge, and address grievances raised by Data Principals
                relating to the Processing of their Personal Data.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>9.</span>
              <div className={styles.t}>
                &quot;Guest Mode&quot; means the limited, unregistered mode in
                which a User may explore certain features of the Platform prior
                to creating an account or providing Personal Data.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>10.</span>
              <div className={styles.t}>
                &quot;Personal Data&quot; means any data about an individual who
                is identifiable by or in relation to such data, and includes, in
                relation to the Platform, information such as name, email
                address, age, and university or institutional affiliation, as
                well as any other data described in Section 3.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>11.</span>
              <div className={styles.t}>
                &quot;Processing&quot; or &quot;Process&quot; means any operation
                or set of operations performed on Personal Data, whether wholly
                or partly by automated means, including the collection,
                recording, organisation, storage, adaptation, retrieval, use,
                alignment, combination, sharing, sharing, transmission,
                disclosure, restriction, erasure, or destruction of Personal
                Data.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>12.</span>
              <div className={styles.t}>
                &quot;Services&quot; means the academic planning, schedule
                management, task tracking, and grade- tracking functionality
                offered through the Platform, together with the AI-enabled
                features provided through Ada, which operate as supplementary
                tools to assist Users and do not independently determine any
                User&apos;s academic outcomes, rights, or eligibility.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>13.</span>
              <div className={styles.t}>
                &quot;User&quot; means any individual who registers for, or
                otherwise accesses or interacts with the Platform or Services,
                including Users who access the Platform in Guest Mode.
              </div>
            </div>
            <h2 className={styles.sec} id="s3">
              3. CATEGORIES OF PERSONAL DATA COLLECTED
            </h2>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>3.1.</span>
              <div className={`${styles.t} ${styles.lab}`}>General Notice</div>
            </div>
            <p className={styles.p}>
              Aqademiq collects and Processes Personal Data strictly in
              accordance with Applicable Laws and only to the extent necessary
              for the specific, explicit, and lawful purposes set out in this
              Policy.
            </p>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>3.2.</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Personal Data collected upon Registration
              </div>
            </div>
            <p className={styles.p}>
              When a User creates an account on the Platform, Aqademiq collects
              the following categories of Personal Data:
            </p>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(a)</span>
              <div className={styles.t}>
                Identity information, including the User&apos;s name;
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(b)</span>
              <div className={styles.t}>
                Contact information, including the User&apos;s email address;
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(c)</span>
              <div className={styles.t}>
                Demographic information, including the User&apos;s age;
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(d)</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Level of education and subject
              </div>
            </div>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>3.3.</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Personal Data collected during Guest Mode
              </div>
            </div>
            <p className={styles.p}>
              Where a User accesses the Platform through Guest Mode, Aqademiq
              does not collect or store the categories of Personal Data described
              in Section 3.2 above. Guest Mode enables a User to explore certain
              features of the Platform prior to registration and prior to
              providing Consent, in order to support informed and voluntary
              decision-making before Personal Data is collected.
            </p>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>3.4.</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Academic and Usage Data provided by the User
              </div>
            </div>
            <p className={styles.p}>
              In the course of using the Services, Users may input or upload
              information relating to their academic activities, including course
              names, assignment details, deadlines, schedules, and grades, for
              the purpose of using the Platform&apos;s organisation and tracking
              features. Aqademiq Processes this information to provide the
              Services selected by the User, personalise scheduling and planning
              features, maintain Platform functionality and security, and
              undertake such other purposes as are specifically disclosed in this
              Policy.
            </p>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>3.5.</span>
              <div className={styles.t}>
                Data collected through Ada and AI-enabled features Where a User
                interacts with Ada, Aqademiq Processes the prompts, queries, and
                inputs submitted by the User to Ada, together with the
                corresponding AI-generated responses (&quot;AI Interaction
                Data&quot;). AI Interaction Data may include references to a
                User&apos;s schedule, tasks, or academic information to the extent
                voluntarily shared by the User in the course of the conversation.
                Aqademiq may also Process usage and behavioural information
                generated through a User&apos;s interaction with the
                Platform&apos;s adaptive scheduling and planning features such as
                task completion patterns and study session activity, to the
                extent this is used to operate and personalise such features for
                that User (&quot;Usage Data&quot;). Further details of how AI
                Interaction Data is Processed, including its disclosure to
                Aqademiq&apos;s AI infrastructure provider, are set out in
                Sections 5.2 and 7.3 of this Policy.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>3.6.</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Payment information
              </div>
            </div>
            <p className={styles.p}>
              The Platform is currently available without charge. If Aqademiq
              introduces any paid features in the future, payments may be
              processed through third-party payment service providers. Aqademiq
              will not ordinarily collect or store complete payment card or
              banking details, but may receive limited transaction information
              for payment confirmation, account administration, and legal
              compliance.
            </p>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>3.7.</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Technical and Security Information
              </div>
            </div>
            <p className={styles.p}>
              Aqademiq may automatically Process limited technical and security
              information when a User accesses or uses the Platform, including IP
              address, device type, operating system, application version, login
              timestamps, authentication records, session identifiers, crash or
              diagnostic information, security events and usage logs. Such
              information is Processed to operate, secure and troubleshoot the
              Platform, detect and prevent unauthorised access, fraud and misuse,
              and maintain service performance.
            </p>
            <h2 className={styles.sec} id="s4">
              4. PURPOSES OF PROCESSING PERSONAL DATA
            </h2>
            <p className={styles.p}>
              Aqademiq Processes Personal Data in a lawful, fair, and transparent
              manner, solely for the specific and legitimate purposes set out
              below, and only to the extent necessary for such purposes.
            </p>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>1.</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Processing of Account and Authentication Data
              </div>
            </div>
            <p className={styles.p}>
              To create and authenticate a User&apos;s account, including through
              a third party authentication provider and to enable secure access
              to the Platform and to respond to a User&apos;s queries, feedback,
              or grievances, and to send Service-related communications, including
              onboarding information and notices required under this Policy.
            </p>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>2.</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Processing of Academic and Institutional Data
              </div>
            </div>
            <p className={styles.p}>
              To provide the Platform&apos;s core academic organisation features,
              including schedule management, task and assignment tracking, and
              grade tracking, based on the information a User chooses to input.
            </p>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>3.</span>
              <div className={styles.t}>
                Processing of AI Interaction Data and Usage Data
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(a)</span>
              <div className={styles.t}>
                to generate conversational responses and study-planning
                suggestions through Ada-,based on a User&apos;s prompts and, where
                the User shares it, their academic information;
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(b)</span>
              <div className={styles.t}>
                to personalise adaptive scheduling suggestions based on a
                User&apos;s own inputs and usage of the Platform; AI-generated
                outputs are informational and advisory in nature and do not
                independently determine a User&apos;s academic outcomes,
                eligibility, or any other legally significant decision concerning
                the User.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>4.</span>
              <div className={styles.t}>
                Processing of Account and Usage Data for Platform Security To
                maintain the security of the Platform, including through access
                controls and authentication mechanisms, to detect and prevent
                unauthorised access, and to maintain the technical functionality
                of the Platform.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>5.</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Legal basis for Processing
              </div>
            </div>
            <p className={styles.p}>
              Aqademiq Processes Personal Data on one or more of the following
              grounds, as permitted under Applicable Laws:
            </p>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(a)</span>
              <div className={styles.t}>
                Consent: Personal Data described in Section 3.2 is Processed on
                the basis of the Consent obtained from the Data Principal through
                the onboarding pop-up described in Section 8, before or at the
                time of registration;
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(b)</span>
              <div className={styles.t}>
                Performance of the Services: Processing that is necessary to
                provide the features of the Platform that a User has chosen to
                use; and
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(c)</span>
              <div className={styles.t}>
                Legal obligation: Processing that is necessary to comply with a
                statutory or regulatory requirement, or a lawful direction of a
                court or governmental authority.
              </div>
            </div>
            <h2 className={styles.sec} id="s5">
              5. DATA SHARING AND DISCLOSURE
            </h2>
            <p className={styles.p}>
              Aqademiq does not sell, rent, or trade Personal Data to any third
              party for monetary or other consideration. Save as expressly set
              out in this Section 5, Aqademiq does not disclose Personal Data to
              any third party, and any disclosure made pursuant to this Section 5
              shall be limited to the minimum extent necessary to give effect to
              the relevant purpose.
            </p>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>1.</span>
              <div className={`${styles.t} ${styles.lab}`}>
                No general third-party sharing
              </div>
            </div>
            <p className={styles.p}>
              Aqademiq does not share Personal Data with third parties for
              marketing, advertising, or analytics purposes. Aqademiq does not
              currently use analytics, advertising, or tracking cookies, as
              described in Section 12.
            </p>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>2.</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Disclosure to AI infrastructure providers
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(a)</span>
              <div className={styles.t}>
                Ada is powered by AI infrastructure provided by one or more
                third-party providers of large language models (each an &quot;AI
                Service Provider&quot;). When a User interacts with Ada, only the
                User&apos;s prompts are transmitted to the relevant AI Service
                Provider to generate a response, and any academic information
                voluntarily included by the User in such prompts is transmitted
                to the AI Service Provider’s API to generate the corresponding
                response. Aqademiq does not transmit a User&apos;s account or
                identity information (such as name or email) to any AI Service
                Provider.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(b)</span>
              <div className={styles.t}>
                Aqademiq engages each AI Service Provider under a valid contract
                incorporating the AI Service Provider&apos;s data-processing
                terms, and shall ensure that any current or future AI Service
                Provider is bound by appropriate contractual safeguards
                consistent with Applicable Laws.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(c)</span>
              <div className={styles.t}>
                Some AI Service Providers, or their infrastructure, may be located
                outside India, and AI Interaction Data may therefore be Processed
                outside India. Aqademiq will take reasonable steps to ensure that
                any such Processing is subject to appropriate contractual
                safeguards and is carried out consistently with Applicable Laws,
                including any conditions or restrictions on cross-border transfer
                under the Applicable Laws
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(d)</span>
              <div className={styles.t}>
                Users are advised not to enter sensitive personal data,
                confidential information, or the personal data of third parties
                into Ada.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>3.</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Legal and regulatory disclosure
              </div>
            </div>
            <p className={styles.p}>
              Aqademiq may disclose Personal Data, where necessary, to comply
              with Applicable Laws or a lawful order or direction of a court, law
              enforcement agency, or governmental authority; to investigate or
              prevent fraud or security incidents; or to establish, exercise, or
              defend legal rights. Any such disclosure shall be limited to what is
              required under Applicable Laws.
            </p>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>4.</span>
              <div className={`${styles.t} ${styles.lab}`}>
                International transfers
              </div>
            </div>
            <p className={styles.p}>
              Personal Data described in Section 3.2 is currently hosted on cloud
              infrastructure located in India, as described in Section 6.3. Where
              Personal Data is Processed outside India, including I Interaction
              Data Processed by AI Service Provider, such Processing shall be
              undertaken in accordance with Applicable Laws and subject to
              reasonable safeguards.
            </p>
            <h2 className={styles.sec} id="s6">
              6. DATA RETENTION AND STORAGE
            </h2>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>6.1.</span>
              <div className={`${styles.t} ${styles.lab}`}>Retention period</div>
            </div>
            <p className={styles.p}>
              Aqademiq retains Personal Data only for as long as reasonably
              necessary to fulfil the purposes described in Section 4, including
              the provision of the Services, compliance with Applicable Laws, and
              protection of Aqademiq&apos;s legal rights. Personal Data is not
              retained for longer than reasonably necessary and shall be deleted
              or anonymised upon fulfilment of the applicable purpose, unless
              continued retention is required under Applicable Laws.
            </p>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>6.2.</span>
              <div className={`${styles.t} ${styles.lab}`}>Account deletion</div>
            </div>
            <p className={styles.p}>
              (a)A User may currently request deletion of their account and
              associated Personal Data by contacting Aqademiq through the
              Grievance Officer identified in Section 11.3. Such requests are
              presently Processed manually. (b)Aqademiq intends to implement an
              automated data deletion mechanism, including deletion following
              prolonged account inactivity or subscription cancellation,
              following the initial launch of the Platform.
            </p>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>6.3.</span>
              <div className={`${styles.t} ${styles.lab}`}>Storage location</div>
            </div>
            <p className={styles.p}>
              Personal Data described in Section 3.2 is presently stored on cloud
              infrastructure located in India. Certain categories of information,
              including AI Interaction Data, may be Processed outside India by
              third-party service providers as described in Section 5.4. Any such
              Processing is carried out in accordance with Applicable Laws,
              including any restrictions on cross-border transfer . Upon expiry of
              the applicable retention period, or where Personal Data is no longer
              required for the purposes for which it was collected, such Personal
              Data shall be securely deleted or anonymised, subject to any
              overriding legal or regulatory retention obligation.
            </p>
            <h2 className={styles.sec} id="s7">
              7. SECURITY SAFEGUARDS AND REASONABLE SECURITY PRACTICES
            </h2>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>7.1.</span>
              <div className={styles.t}>
                Aqademiq implements reasonable technical and organisational
                safeguards designed to protect Personal Data against unauthorised
                access, disclosure, alteration, loss, or destruction,
                proportionate to the nature and scope of the Personal Data
                Processed through the Platform.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>7.2.</span>
              <div className={styles.t}>
                Access to Personal Data is restricted to personnel who require
                such access for legitimate operational purposes, subject to
                authentication controls.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>7.3.</span>
              <div className={styles.t}>
                Where Personal Data is Processed through Ada or other AI-enabled
                features, Aqademiq shall implement measures designed to support
                the responsible and secure operation of such features.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>7.4.</span>
              <div className={styles.t}>
                In the event of a Personal Data breach, Aqademiq shall take
                reasonable steps to investigate, contain, and mitigate the impact
                of such breach. Where required under Applicable Laws, Aqademiq
                shall notify the relevant regulatory authority and affected Data
                Principals in accordance with the timelines prescribed under
                Applicable Laws.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.dec}`}>
              <span className={styles.n}>7.5.</span>
              <div className={styles.t}>
                Where Aqademiq engages third-party service providers, such
                providers are required to maintain appropriate security safeguards
                and to Process Personal Data solely in accordance with
                Aqademiq&apos;s instructions and Applicable Laws.
              </div>
            </div>
            <h2 className={styles.sec} id="s8">
              8. CONSENT MANAGEMENT
            </h2>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>1.</span>
              <div className={styles.t}>
                At the time of registration, a User is presented with a clear
                onboarding notice describing the categories of Personal Data
                collected, the specific purposes of Processing, the services or
                functionality enabled with such processing, the manner of
                withdrawing consent together with a hyperlink to this Policy. A
                User must provide an affirmative indication of Consent before the
                Personal Data described in Section 3.2 is collected.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>2.</span>
              <div className={styles.t}>
                A User may explore certain features of the Platform in Guest Mode
                prior to providing such Consent, as described in Section 3.3, to
                support informed and voluntary decision-making.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>3.</span>
              <div className={styles.t}>
                A Data Principal may withdraw Consent previously provided at any
                time by contacting Grievance Officer identified in Section 11.3.
                Withdrawal of Consent does not affect the lawfulness of Processing
                carried out before the withdrawal. Upon withdrawal, Aqademiq shall
                cease Processing the relevant Personal Data, except to the extent
                continued Processing is required under Applicable Laws, and shall
                proceed with deletion in accordance with Section 6. Withdrawal of
                Consent may result in the relevant feature becoming unavailable.
                For example, withdrawal of Consent for AI Interaction Data may
                prevent the User from accessing Ada, while withdrawal of Consent
                necessary to maintain an account may require closure of the
                account.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>4.</span>
              <div className={styles.t}>
                Each User, including a User accessing the Platform through Guest
                Mode, represents and warrants that any Consent, declaration,
                confirmation, or information provided to Aqademiq in connection
                with the use of the Platform is true, accurate, complete, and
                given by the individual lawfully entitled to provide such Consent
                under Applicable Laws. Aqademiq shall be entitled to rely on such
                representations and shall not be responsible or liable for any
                false, inaccurate, misleading, fraudulent, or unauthorised
                Consent, declaration, or information submitted by any User or
                Guest Mode User. Where Aqademiq becomes aware that any such
                Consent or information is invalid or has been falsely provided,
                Aqademiq reserves the right to suspend or terminate access to the
                Platform and take such other measures as may be required under
                Applicable Laws.
              </div>
            </div>
            <h2 className={styles.sec} id="s9">
              9. RIGHTS OF DATA PRINCIPALS
            </h2>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>1.</span>
              <div className={styles.t}>
                In accordance with Applicable Laws, a Data Principal is entitled
                to exercise the following rights in relation to their Personal
                Data, subject to verification of identity:
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(a)</span>
              <div className={styles.t}>
                the right to obtain confirmation as to whether Personal Data
                relating to them is being Processed, and to obtain a summary of
                such Personal Data, the purposes of Processing, and the identity
                of any Data Processors with whom it has been shared;
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(b)</span>
              <div className={styles.t}>
                the right to request correction, completion, or updating of
                Personal Data that is inaccurate or incomplete;
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(c)</span>
              <div className={styles.t}>
                the right to request erasure of Personal Data that is no longer
                necessary for the purpose for which it was collected, subject to
                Section 6;
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(d)</span>
              <div className={styles.t}>
                the right to withdraw Consent at any time, in accordance with
                Section 8.3;
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(e)</span>
              <div className={styles.t}>
                the right to nominate another individual to exercise these rights
                on the Data Principal&apos;s behalf in the event of death or
                incapacity; and
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(f)</span>
              <div className={styles.t}>
                the right to grievance redressal in accordance with Section 11.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>2.</span>
              <div className={styles.t}>
                A Data Principal may exercise the above rights by contacting the
                Grievance Officer identified in Section 11.3. Aqademiq may take
                reasonable steps to verify the identity of a Data Principal before
                acting on such a request.
              </div>
            </div>
            <h2 className={styles.sec} id="s10">
              10. PROCESSING OF CHILDREN&apos;S PERSONAL DATA
            </h2>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>1.</span>
              <div className={styles.t}>
                The Platform is intended for use by university students, who have
                completed eighteen (18) years of age or older. Aqademiq does not
                currently offer the Platform to individuals below eighteen (18)
                years of age.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>2.</span>
              <div className={styles.t}>
                During onboarding, a User is required to confirm their age. Where
                a User indicates that they are under eighteen (18) years of age,
                the User will not be permitted to create an account or use the
                Platform, and any information provided during onboarding will not
                be retained beyond what is necessary to give effect to this
                restriction.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>3.</span>
              <div className={styles.t}>
                Aqademiq does not knowingly collect or Process the Personal Data
                of a Child. Aqademiq does not undertake behavioural monitoring or
                targeted advertising directed at Children, or any Processing
                likely to cause a detrimental effect on the well-being of a Child.
                If Aqademiq becomes aware that a Child has registered or that a
                Child&apos;s Personal Data has been collected, Aqademiq shall take
                reasonable steps to delete such Personal Data and suspend the
                relevant account, in accordance with Applicable Laws.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>4.</span>
              <div className={styles.t}>
                Aqademiq may, in future, enable access for Users below eighteen
                (18) years of age, subject to obtaining verifiable Consent of a
                parent or lawful guardian in accordance with Applicable Laws. Any
                such feature will be introduced only with appropriate consent and
                verification mechanisms, and this Policy will be updated before
                any such Processing begins.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>5.</span>
              <div className={styles.t}>
                Each User represents that the age information they provide is
                true. Aqademiq relies on these representations and is not
                responsible for any false or unauthorised age information (see
                clause 8.4). Where Aqademiq finds that age has been falsely
                declared, it may suspend or terminate access and delete the
                relevant Personal Data.
              </div>
            </div>
            <h2 className={styles.sec} id="s11">
              11. GRIEVANCE REDRESSAL MECHANISM
            </h2>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>1.</span>
              <div className={styles.t}>
                Aqademiq has established a grievance redressal mechanism to
                address concerns, complaints, or requests relating to the
                Processing of Personal Data, in accordance with Applicable Laws.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>2.</span>
              <div className={styles.t}>
                Any grievance, request, or query relating to the processing of
                Personal Data, including a request to exercise the rights
                described in Section 9, may be submitted to the Grievance Officer
                identified below.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>3.</span>
              <div className={`${styles.t} ${styles.lab}`}>Grievance Officer</div>
            </div>
            <p className={styles.p}>
              Aqademiq has designated a Grievance Officer responsible for
              addressing grievances raised by Data Principals. Contact details are
              as follows:
            </p>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(a)</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Name: Mohammed Aswath M
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(b)</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Designation: Grievance Officer
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(c)</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Email:{" "}
                <a href="mailto:support@aqademiq.com">support@aqademiq.com</a>
              </div>
            </div>
            <div className={`${styles.cl} ${styles.letter}`}>
              <span className={styles.n}>(d)</span>
              <div className={`${styles.t} ${styles.lab}`}>
                Contact Number: +918248547453
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>4.</span>
              <div className={styles.t}>
                Upon receipt of a grievance, Aqademiq shall take reasonable steps
                to acknowledge and address it in a timely manner in accordance
                with Applicable Laws.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>5.</span>
              <div className={styles.t}>
                Where a Data Principal is not satisfied with the resolution
                provided by Aqademiq, the Data Principal may approach the Data
                Protection Board of India or any other competent authority in
                accordance with Applicable Laws.
              </div>
            </div>
            <h2 className={styles.sec} id="s12">
              12. COOKIES AND TRACKING TECHNOLOGIES
            </h2>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>1.</span>
              <div className={styles.t}>
                The Platform uses authentication tokens and session-management
                mechanisms that are strictly necessary for a User to log in and
                maintain an active session on the Platform.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>2.</span>
              <div className={styles.t}>
                As of the date of this Policy, Aqademiq does not use analytics,
                advertising, or third-party tracking cookies. Should this change,
                this Policy shall be updated in accordance with Section 13 prior
                to the deployment of any such technology.
              </div>
            </div>
            <h2 className={styles.sec} id="s13">
              13. POLICY UPDATES AND AMENDMENTS
            </h2>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>1.</span>
              <div className={styles.t}>
                Aqademiq reserves the right to modify or update this Policy from
                time to time to reflect changes in Applicable Laws, the `Services
                offered through the Platform, or Aqademiq&apos;s data processing
                practices.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>2.</span>
              <div className={styles.t}>
                Aqademiq shall notify all Users of any material changes to this
                Policy by publishing a prominent notice on the Platform and/or the
                Aqademiq website. Such notice shall specify the effective date of
                the revised Policy. Where required under Applicable Laws, Aqademiq
                shall obtain fresh Consent before Processing Personal Data in
                accordance with the updated Policy.
              </div>
            </div>
            <div className={`${styles.cl} ${styles.num}`}>
              <span className={styles.n}>3.</span>
              <div className={styles.t}>
                Users are encouraged to periodically review this Policy to remain
                informed of how their Personal Data is collected, used, and
                protected.
              </div>
            </div>
            <h2 className={styles.sec} id="s14">
              14. GOVERNING LAW AND JURISDICTION
            </h2>
            <p className={styles.p}>
              This Policy shall be governed by and construed in accordance with
              the laws of India. Any dispute arising out of or in connection with
              this Policy, including its interpretation, validity, or enforcement,
              shall be subject to the exclusive jurisdiction of the competent
              courts in India.
            </p>
          </div>
          <div className={styles.back}>
            <Link href="/">
              <span
                className="material-icons-outlined"
                style={{ fontSize: 18 }}
              >
                arrow_back
              </span>
              Back to home
            </Link>
            <span style={{ color: "#c0bdb6" }}>·</span>
            <Link href="/terms">Terms of Use</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
