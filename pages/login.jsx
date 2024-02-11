import Layout from "../components/layout";
import Cookies from "cookies";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { use, useState } from "react";
import logo from "../public/logo.svg";
import zypher from '../public/zypher.svg'
import Image from "next/image";
import { Input } from "@material-tailwind/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth, linkWithPopup, OAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import { get } from "https";
import { UserAuth } from "../context/AuthContext";
import { redirect } from "next/dist/server/api-utils";

export default function LoginPage({ email }) {
    const { user, googleSignIn, logOut } = UserAuth();

    const handleGoogle = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleMicrosoft = async (e) => {
        const provider = new OAuthProvider("microsoft.com");
        const auth = getAuth();
        return signInWithPopup(auth, provider);
    };

    const router = useRouter();
    const { msg } = router.query;

    const [showPasswordFields, setShowPasswordFields] = useState(false);

    const handleContinue = (e) => {
        e.preventDefault();
        // Toggle the visibility of the password input fields
        setShowPasswordFields(!showPasswordFields);
    };

    return (
        <Layout pageTitle="Login">
            {!user ? (
                  <div className="bg-gradient-to-r from-[#00050B] to-[#4E5C6C] min-h-screen flex flex-col w-full items-center pb-16 px-4 ">
                    <div className="flex flex-col gap-0 w-full items-center md:w-2/5 lg:w-1/3">

                    <Link className=" flex justify-start cursor-default" href="/">
                            <Image
                            className="flex justify-start"
                                src={zypher}
                                width={155}
                                height={144}
                                alt="ZYPHER"
                            />
                        </Link>

                        <div 
                         className="text-center text-xl sm:text-3xl font-['Inter'] font-bold text-[#FFFFFF] pt-8 pb-6">
                            Log In
                        </div>
                       
                        {msg ? <h3 className="red">{msg}</h3> : <></>}

                        <div className="flex flex-col gap-6 w-full items-start">
                            <form
                                className="flex flex-col justify-between gap-8 w-full items-start"
                                action="/api/login"
                                method="POST"
                            >
                              <div className="flex w-full flex-col items-end gap-6 border-2 rounded-[15px]">
                                    <Input
                                        label="Email Address"
                                        name="email"
                                        id="email"
                                        type="email"
                                        color="white"
                                        autoComplete="off"
                                        required={true}
                                    />
                                    </div>
                                    <div className="flex w-full flex-col items-end gap-6 border-2 rounded-[15px]">
                                    <Input
                                        label="Password"
                                        name="password"
                                        id="password"
                                        type="password"
                                        color="white"
                                        autoComplete="off"
                                        required={true}
                                    />
                                </div>
                                {!showPasswordFields && (
                                    <>
                                        <button
                                           className="text-center text-lg sm:text-xl font-['Inter'] font-semibold text-black border-solid bg-[#ffff] flex flex-row justify-center pt-6 w-full h-20 items-start border-2 rounded-[30px]"
                                            onClick={handleContinue}
                                        >
                                            Continue
                                        </button>
                                        <div className="flex flex-row gap-2 w-full items-center justify-center">
                                            <div className="text-center text-base font-light sm:font-normal font-['Inter'] text-white">
                                                Don’t have an account?
                                            </div>
                                            <Link
                                                className="text-center text-base font-light sm:font-normal font-['Inter'] text-[#6dadec]"
                                                href="/signup"
                                            >
                                                Sign up
                                            </Link>
                                        </div>
                                    </>
                                )}

                                {showPasswordFields && (
                                    <>
                                        <Input
                                            type="password"
                                            label="Password"
                                            name="password"
                                            id="password"
                                            color="blue"
                                            autoComplete="off"
                                            required={true}
                                        />

                                        <br />

                                        <input
                                            className="cursor-pointer text-center text-xl font-['Inter'] font-semibold text-white border-solid border-[#ffff] bg-[#6dadec] flex flex-row justify-center w-full h-20 items-start border-2 rounded-[30px]"
                                            type="submit"
                                            value="Login"
                                        />
                                    </>
                                )}
                            </form>

                            {/* Other components */}
                            {!showPasswordFields && (
                                <div className="flex flex-col justify-between gap-5 w-full items-start">
                                    {/* Add Google and Apple authentication options */}
                                    <div className="relative flex flex-row justify-center w-full items-start">
                                        <div
                                            id="Line"
                                            className="border-solid border-[#ffff] w-full h-px absolute top-2 left-0 border-t border-b-0 border-x-0"
                                        />
                                        <div className="w-14 h-4 bg-[#4E5C6C] absolute top-1 opacity-2" />
                                        <div className="text-center text-base font-['Inter'] text-white relative">
                                            OR
                                        </div>
                                    </div>
                                    <button
                                        className="text-center text-lg sm:text-xl font-['Inter'] font-medium text-white border-solid border-[#ffff] bg-[rgba(217,_217,_217,_0)] flex flex-row justify-center ml-px pt-6 w-full h-20 items-start border-2 rounded-[30px]"
                                        onClick={handleGoogle}
                                    >
                                        Login with Google
                                        <FaGoogle className=" text-2xl ml-3 mt-0" />
                                    </button>

                                    <button
                                        className="text-center text-lg sm:text-xl font-['Inter'] font-medium text-white border-solid border-[#ffff] bg-[rgba(217,_217,_217,_0)] flex flex-row justify-center ml-px pt-6 w-full h-20 items-start border-2 rounded-[30px]"
                                        onClick={handleMicrosoft}
                                    >
                                        Login with Microsoft
                                        <FaMicrosoft className=" text-2xl ml-3 mt-0" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <>{window.location.replace("/")}</>
            )}
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    var email = getCookie("email", { req, res });

    if (email !== undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        };
    }

    return { props: { email: false } };
}
