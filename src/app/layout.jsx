import Bg from './components/videoBg/Bg'
import "./globals.css";
import Header from './components/layout/Header'

export const metadata = {
  title: "Full-stack",
  description: "Learn mongoose and mongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Bg />
        <Header />
        {children}
      </body>
    </html>
  );
}
