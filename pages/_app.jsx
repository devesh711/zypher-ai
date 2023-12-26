import "../styles/global.css";
import { CookiesProvider } from "react-cookie";
import { Input } from "@material-tailwind/react";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "../context/AuthContext";
import { NextUIProvider } from "@nextui-org/react";

export default function App({
    Component,
    pageProps: { session, ...pageProps }
}) {
    return (
        <AuthContextProvider>
            <CookiesProvider>
                <NextUIProvider>
                    <Component {...pageProps} />
                </NextUIProvider>
            </CookiesProvider>
        </AuthContextProvider>
    );
}
