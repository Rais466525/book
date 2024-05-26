import Bg from './components/videoBg/Bg'
import "./globals.css";
import Header from './components/Header'

export const metadata = {
  title: "Раритет",
  description: "Фирма «Раритет»",
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
