import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import BootstrapClient from '../components/bootstrapClient.js';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import '../styles/globals.css'


export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="WlphvHVaVW1jVWUufak-1TfWkjBAvf271H95iMGwtSw" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.png" />
      </head>
      <body>
        <div className="main-wrapper">
          {children}
          <BootstrapClient />
        </div>
      </body>
    </html>
  );
}
