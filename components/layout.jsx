// layout.jsx

import Head from "next/head";
import logo from "../public/logo.svg";

export const siteTitle = "Zypher AI";

export default function Layout({ pageTitle, children }) {
    return (
        <div>
            <Head>
                <link rel="shortcut icon" href={logo} />
                <meta
                    name="description"
                    content="Portal Based Simulation Process Data Management"
                />
                <meta property="og:image" content={logo} />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="og:site_name" content={siteTitle} />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="Website" />
                <title>{pageTitle}</title>
            </Head>
            <main>{children}</main>
        </div>
    );
}
