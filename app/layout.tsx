import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import BootstrapClient from '../components/BootstrapClient.js';

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title : "Jeans Manufacturer and Wholesale - Jeans Pants Jeans Jackets",
  description : "PK Apparel Specializes in jeans pants manufacturing and wholesale, jeans Jackets wholesale, Jeans Shirt and all other denim products. We stand behind all of the products that we handle and we are the company that stand behind the quality and performance of the products they build",
  keywords : "Jeans pants Manufacturers, Jeans pants Wholesalers, Jeans Pants suppliers"
}

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
