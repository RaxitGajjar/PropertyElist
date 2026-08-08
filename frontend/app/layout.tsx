import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "PropertyElist",
  description: "Real Estate Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* 📊 Google Analytics Live Tracking Code */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R391PLVGSR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R391PLVGSR');
          `}
        </Script>
      </body>
    </html>
  );
}