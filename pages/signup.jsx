import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../public/logo.svg";
import React, { useState } from "react";
import { Input } from "@material-tailwind/react";

export default function SignupPage({ username }) {
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
            <div className="bg-[#152335] min-h-screen flex flex-col w-full items-center pb-16 px-[34rem]">
                <Image src={logo} width={205} height={164} alt="ZYPHER" />
                {msg ? <h3 className="red">{msg}</h3> : <></>}
                <div className="flex flex-col ml-1 gap-8 w-full items-center">
                    <div
                        id="Welcome"
                        className="text-center text-4xl font-primary font-bold text-[#6dadec]"
                    >
                        Welcome{" "}
                    </div>
                    <div className="flex flex-col gap-6 w-full items-start">
                        <form
                            action="/api/signup"
                            method="POST"
                            className="flex flex-col justify-between gap-5 w-full items-start"
                        >
                            <div className="flex w-full flex-col items-end gap-6">
                                <Input
                                    label="Username"
                                    name="username"
                                    id="username"
                                    type="text"
                                    color="blue"
                                />
                            </div>
                            {!showPasswordFields && (
                                <>
                                    {" "}
                                    <button
                                        className="text-center text-xl font-['Inter'] font-semibold text-white border-solid border-[#6dadec] bg-[#6dadec] flex flex-row justify-center pt-6 w-full h-20 items-start border-2 rounded-[30px]"
                                        onClick={handleContinue}
                                    >
                                        Continue
                                    </button>
                                    <div className="flex flex-row ml-12 gap-2 w-2/3 items-start">
                                        <div className="text-center text-base font-['Inter'] text-white">
                                            Already have an account?
                                        </div>
                                        <Link
                                            className="text-center text-base font-['Inter'] text-[#6dadec]"
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
                                    />
                                    <br />
                                    <Input
                                        minLength="5"
                                        name="passwordagain"
                                        label="Password"
                                        id="passwordagain"
                                        type="password"
                                        color="blue"
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
                                    className="text-center text-xl font-['Inter'] font-medium text-white border-solid border-[#6dadec] bg-[rgba(217,_217,_217,_0)] flex flex-row justify-center ml-px pt-6 w-full h-20 items-start border-2 rounded-[30px]"
                                    onClick={() => handleGoogleAuth()}
                                >
                                    Login with Google
                                </button>

                                <button
                                    className="text-center text-xl font-['Inter'] font-medium text-white border-solid border-[#6dadec] bg-[rgba(217,_217,_217,_0)] flex flex-row justify-center ml-px pt-6 w-full h-20 items-start border-2 rounded-[30px]"
                                    onClick={() => handleAppleAuth()}
                                >
                                    Login with Apple
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
    var username = getCookie("username", { req, res });

    if (username !== undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        };
    }

    return { props: { username: false } };
}
