import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../index.css";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeedbackWidget from "../components/FeedbackWidget";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: "DialecTrek",
    template: "%s | DialecTrek",
  },
  description:
    "DialecTrek — look up Spanish verbs and practice conjugating them across every tense.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E7C5A",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" data-theme="light" suppressHydrationWarning>
    <head>
      {/* Runs before first paint so the resolved theme (saved preference,
          falling back to the OS setting) applies immediately instead of
          flashing the light theme -- see ThemeContext.tsx, which resolves
          the initial theme the same way. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
        }}
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap"
        rel="stylesheet"
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-YJ9ZN40RNK"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YJ9ZN40RNK');`}
      </Script>
    </head>
    <body>
      <ThemeProvider>
        <div className="App">
          <Navbar />
          {children}
          <Footer />
          <FeedbackWidget />
        </div>
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
