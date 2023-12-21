import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import logo from "../public/logo.svg";
import Image from "next/image";
import { Input } from "@material-tailwind/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth, linkWithPopup, OAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";

export default function SignupPage({ email }) {
    const handleGoogle = async (e) => {
        const provider = await new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
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
        <Layout pageTitle="Signup">
            <div className="bg-[#152335] min-h-screen flex flex-col w-full items-center pb-16 px-4 ">
                <div className="flex flex-col gap-0 w-full items-center md:w-2/5 lg:w-1/3">
                    <div
                        id="Welcome"
                        className="text-center text-2xl sm:text-4xl font-['Inter'] font-bold text-[#6dadec] pt-8"
                    >
                        Welcome{" "}
                    </div>

                    {/* <div className="text-center"></div> */}
                    <Link className="cursor-default" href="/">
                        <Image
                            src={logo}
                            width={205}
                            height={164}
                            alt="ZYPHER"
                        />
                    </Link>
                    {msg ? <h3 className="red ">{msg}</h3> : <></>}

                    <div className="flex flex-col gap-6 w-full items-start">
                        <form
                            action="/api/signup"
                            method="POST"
                            className="flex flex-col justify-between gap-5 w-full items-start"
                        >
                            <div className="flex w-full flex-col items-end gap-6">
                                <Input
                                    label="Email"
                                    name="email"
                                    id="email"
                                    type="email"
                                    color="blue"
                                    autoComplete="off"
                                    required={true}
                                />
                            </div>
                            {!showPasswordFields && (
                                <>
                                    <button
                                        className="text-center text-lg sm:text-xl font-['Inter'] font-semibold text-white border-solid border-[#6dadec] bg-[#6dadec] flex flex-row justify-center pt-6 w-full h-20 items-start border-2 rounded-[30px]"
                                        onClick={handleContinue}
                                    >
                                        Continue
                                    </button>
                                    <div className="flex flex-row gap-2 w-full items-center justify-center">
                                        <div className="text-center text-base font-light sm:font-normal font-['Inter'] text-white">
                                            Already have an account?
                                        </div>
                                        <Link
                                            className="text-center text-base font-light sm:font-normal font-['Inter'] text-[#6dadec]"
                                            href="/login"
                                        >
                                            log in
                                        </Link>
                                    </div>
                                </>
                            )}
                            {showPasswordFields && (
                                <>
                                    <br />
                                    <Input
                                        minLength="5"
                                        type="password"
                                        label="Password"
                                        name="password"
                                        id="password"
                                        color="blue"
                                        autoComplete="off"
                                        required={true}
                                    />
                                    <br />
                                    <Input
                                        minLength="5"
                                        name="passwordagain"
                                        label="Password"
                                        id="passwordagain"
                                        type="password"
                                        color="blue"
                                        autoComplete="off"
                                        required={true}
                                    />
                                    <br />
                                    <input
                                        className="cursor-pointer text-center text-xl font-['Inter'] font-semibold text-white border-solid border-[#6dadec] bg-[#6dadec] flex flex-row justify-center w-full h-20 items-start border-2 rounded-[30px]"
                                        type="submit"
                                        value="Signup"
                                    />
                                </>
                            )}
                        </form>
                        {!showPasswordFields && (
                            <div className="flex flex-col justify-between gap-5 w-full items-start">
                                {/* Add Google and Apple authentication options */}
                                <div className="relative flex flex-row justify-center w-full items-start">
                                    <div
                                        id="Line"
                                        className="border-solid border-[#6dadec] w-full h-px absolute top-2 left-0 border-t border-b-0 border-x-0"
                                    />
                                    <div className="w-12 h-3 bg-[#152335] absolute top-1" />
                                    <div className="text-center text-base font-['Inter'] text-white relative">
                                        OR
                                    </div>
                                </div>
                                <button
                                    className="text-center text-lg sm:text-xl font-['Inter'] font-medium text-white border-solid border-[#6dadec] bg-[rgba(217,_217,_217,_0)] flex flex-row justify-center ml-px pt-6 w-full h-20 items-start border-2 rounded-[30px]"
                                    onClick={handleGoogle}
                                >
                                    Login with Google
                                    <FaGoogle className=" text-2xl ml-3 mt-0" />
                                </button>
                                <button
                                    className="text-center text-lg sm:text-xl font-['Inter'] font-medium text-white border-solid border-[#6dadec] bg-[rgba(217,_217,_217,_0)] flex flex-row justify-center ml-px pt-6 w-full h-20 items-start border-2 rounded-[30px]"
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
