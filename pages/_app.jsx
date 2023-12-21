import "../styles/global.css";
import { CookiesProvider } from "react-cookie";
import { Input } from "@material-tailwind/react";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";

export default function App({
    Component,
    pageProps: { session, ...pageProps }
}) {
    return (
        <AuthContextProvider>
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>
        </AuthContextProvider>
    );
}
