import "./globals.css";

export const metadata = {
  title: "Full-stack",
  description: "Learn mongoose and mongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
