import localFont from "next/font/local";
import "./globals.css";

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Navbar from "./components/shared/Navbar";
config.autoAddCss = false;

export const metadata = {
  title: "Music Quiz",
  description: "Music quiz powered by the Deezer API.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
