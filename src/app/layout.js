// Supports weights 100-900
import "@fontsource-variable/inter";
import "../styles/global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9QTNRHVRN8"
        ></script>
        <script src="./index.js"></script>
      </head>
      <body className="h-full bg-red-400">{children}</body>
    </html>
  );
}
