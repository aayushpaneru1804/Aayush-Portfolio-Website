import "./globals.css";

export const metadata = {
  title: "Aayush Paneru — Full-Stack Developer & Tech Facilitator",
  description:
    "Portfolio of Aayush Paneru — Full-Stack Developer, AI & Cloud Computing Facilitator, and Cybersecurity Trainer building high-impact digital experiences.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const runtime = "nodejs";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

