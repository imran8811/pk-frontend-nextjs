import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import BootstrapClient from '../components/bootstrapClient.js';

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import StoreProvider from "./StoreProvider.jsx";
import { makeStore } from "../lib/store.js";
// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="WlphvHVaVW1jVWUufak-1TfWkjBAvf271H95iMGwtSw" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.png" />
      </head>
      <body>
        <div className="main-wrapper">
          <div className="container-fluid">
            <div className="row-fluid">
              {children}
              <BootstrapClient />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
