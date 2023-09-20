// Supports weights 100-900
import "@fontsource-variable/inter";
import '../styles/global.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full bg-red-400">{children}</body>
    </html>
  );
}
