import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import logo from "../public/logo.svg";
import zypher from '../public/zypher.svg'
import Image from "next/image";
// import bg from "../public/bg.svg";
import { Button, Input } from "@material-tailwind/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth, linkWithPopup, OAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";

export default function SignupPage({ email }) {
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
        <Layout pageTitle="Signup">
            {!user ? (
                <div className="bg-gradient-to-r from-[#00050B] to-[#4E5C6C] min-h-screen flex flex-col w-full items-center pb-16 px-4 ">
                    <div className="flex flex-col gap-0 w-full items-center md:w-2/5 lg:w-1/3">

                    {/* <div className="flex flex-row mr-0 sm:mr-10 mt-1 gap-6 ml-0 sm:ml-auto w-1/2 sm:w-1/4 items-center"> */}
                        <Link 
                          className="flex flex-col sm:flex-row items-center ml-0 sm:ml-10"
                          href="/">
                            
                            <Image
                                src={zypher}
                                width={155}
                                height={144}
                                alt="ZYPHER"
                            />
                        </Link>
                        {/* </div> */}

                        <div
                            id="Welcome"
                            className="text-center text-xl sm:text-3xl font-['Inter'] font-bold text-[#FFFFFF] pt-10 pb-12"
                        >
                            Sign Up{" "}
                        </div>

                        {/* <div className="text-center"></div> */}
                       
                        {msg ? <h3 className="red ">{msg}</h3> : <></>}

                        <div className="flex flex-col gap-6 w-full items-start ">
                            <form
                                action="/api/signup"
                                method="POST"
                                className="flex flex-col justify-between gap-8 w-full items-start"
                            >
                                <div className="flex w-full flex-col items-end gap-6 border-2 rounded-[15px]">
                                    <Input
                                        label="User Name"
                                        name="username"
                                        id="username"
                                        type="username"
                                        color="white"
                                        autoComplete="off"
                                        required={true}
                                    />
                                    </div>
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
                                        label="Create Password"
                                        name="password"
                                        id="password"
                                        type="password"
                                        color="white"
                                        autoComplete="off"
                                        required={true}
                                    />
                                     </div>
                                     <div className="flex w-full flex-col items-end gap-6 border-2 rounded-[15px]">
                                    <Input
                                        label="Confirm Password"
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
                                        {/* <button
                                            className="text-center text-lg sm:text-xl font-['Inter'] font-semibold text-black border-solid bg-[#ffff] flex flex-row justify-center pt-6 w-full h-20 items-start border-2 rounded-[30px]"
                                            type="submit"
                                            onClick={handleContinue}  
                                        >
                                            Continue
                                        </button> */}
                                        <Link
                                         className="text-center text-lg sm:text-xl font-['Inter'] font-semibold text-black border-solid bg-[#ffff] flex flex-row justify-center pt-6 w-full h-20 items-start border-2 rounded-[30px]"
                                         type="submit"
                                         value="Login"
                                                href="/"
                                            >
                                                Continue
                                            </Link>


                                        <div className="flex flex-row gap-2 w-full items-center justify-center">
                                            <div className="text-center text-base font-light sm:font-normal font-['Inter'] text-white">
                                                Already have an account?
                                            </div>
                                            <Link
                                                className="text-center text-base font-light sm:font-normal font-['Inter'] text-[#6dadec]"
                                                href="/login"
                                            >
                                                Log in
                                            </Link>
                                        </div>
                                    </>
                                )}
                                {showPasswordFields && (
                                    <>
                                        <br />
                                        {/* <Input
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
                                        /> */}
                                       
                                       <input
                                            className="cursor-pointer text-center text-xl font-['Inter'] font-semibold text-white border-solid bg-[#ffff] flex flex-row justify-center w-full h-20 items-start border-2 rounded-[30px]"
                                            type="submit"
                                            value="Signup"
                                        />
                                    </>
                                )}
                            </form>
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
