// Supports weights 100-900
import "@fontsource-variable/inter";
import "../styles/global.css";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full bg-red-400">
        <div>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-9QTNRHVRN8"></Script>
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-9QTNRHVRN8');
            `}
          </Script>
          {children}
        </div>
      </body>
    </html>
  );
}
