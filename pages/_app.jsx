import "../styles/global.css";
import { CookiesProvider } from "react-cookie";
import { Input } from "@material-tailwind/react";

export default function App({
    Component,
    pageProps: { session, ...pageProps }
}) {
    return (
        <CookiesProvider>
            <Component {...pageProps} />
        </CookiesProvider>
    );
}
