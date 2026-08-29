import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DialecTrek handles cookies and analytics data.",
};

const PrivacyPage = () => {
  return (
    <div className="page">
      <PageHeader
        title="Privacy Policy"
        subtitle="Last updated August 2026"
      />

      <div className="about-content">
        <h2>What we collect</h2>
        <p>
          DialecTrek doesn&apos;t require an account, and verb lookups,
          conjugation practice, and flashcards don&apos;t send us any
          personal information. If you use the feedback widget, we receive
          whatever you write and, only if you choose to share it, your email
          address so we can reply.
        </p>

        <h2>Cookies and analytics</h2>
        <p>
          We use Google Analytics to understand which pages and features get
          used, so we can improve them. Google Analytics is off by default:
          it only sets cookies and starts measuring after you accept
          analytics cookies in the banner shown on your first visit. If you
          decline, no Google Analytics cookies are set and no analytics data
          is sent for you.
        </p>
        <p>
          We also use Vercel Analytics and Vercel Speed Insights to track
          overall traffic and page performance. These run without cookies or
          any personal identifiers and don&apos;t require consent.
        </p>

        <h2>Your choices</h2>
        <p>
          You can change your analytics cookie choice at any time using the
          &quot;Cookie preferences&quot; link in the footer of any page.
        </p>

        <h2>Third parties</h2>
        <p>
          We share data with Google (Google Analytics) and Vercel (hosting,
          analytics, and speed insights) only as described above. We
          don&apos;t sell your data or use it for advertising.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Reach out through the feedback button
          in the corner of any page.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
