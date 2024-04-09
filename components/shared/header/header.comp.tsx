import Link from 'next/link'
import Nav from '../nav/nav.comp'
import Script from 'next/script'
import styles from '../header/header.module.css'

export default function Header() {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TTX4WPE230"></Script>
      <Script
        id="g-tag" 
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TTX4WPE230')`,
        }} />
      <header className='row border-bottom border-info mb-4'>
        <div className="col-md-4 pt-3 mb-2">
          <Link href="/">
            <img src="/images/logo.jpg" alt="logo" width={227} height={46} title="PK Apparel Home" />
          </Link>
        </div>
        <div className='col-md-8 mt-3 text-end'>
          <Nav></Nav>
        </div>
      </header>
    </>
)}
