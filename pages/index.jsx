import React, { use, useState, useEffect, Fragment } from "react";
import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg";
import guest from "../public/guest.svg";
import zypher from "../public/zypher.svg";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { UserAuth } from "../context/AuthContext";
import { FaClockRotateLeft } from "react-icons/fa6";
import Modal from "../components/Modal";

export default function HomePage({ email }) {
    const { user, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("loading");

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     try {
    //         fetch("http://localhost:8080/api/home")
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 console.log(data);
    //                 setMessage(data.message);
    //                 console.log(message);
    //             });
    //     } catch (error) {
    //         console.error("Model is currently not available", error);
    //         console.log("error");
    //     }
    // }, []);

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    return (
        <Layout pageTitle="Zypher AI">
            {loading ? null : !!user || email ? (
                <>
                    <div className="bg-white dark:bg-black flex flex-col justify-center py-2 gap-4 w-full items-end overflow-hidden noscroll ">
                        <Fragment>
                            <Image
                                src={guest}
                                alt="Y"
                                className="mr-5"
                                height={50}
                                width={50}
                                onClick={() => setShowModal(true)}
                            />
                            <Modal
                                isVisible={showModal}
                                onClose={() => setShowModal(false)}
                            >
                                {/* <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"> */}
                                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Hello
                                    </h1>
                                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        {!!user ? user.displayName : email}
                                    </h1>
                                    <p>{!!user ? user.email : email}</p>

                                    <div className="mb-6">
                                        <Link
                                            className="text-xl font-sans font-bold text-[#fffefe] bg-[#2145c5] px-4 py-2 w-1/2 h-12 items-start rounded-lg  hover:shadow-md hover:shadow-blue-700/70  hover:duration-300  "
                                            href="/api/logout"
                                            onClick={handleSignOut}
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                                {/* </div> */}
                            </Modal>
                        </Fragment>
                    </div>

                    <div className="bg-blue-50 min-h-screen flex w-auto rounded-3xl items-start justify-center">
                        <input
                            type="text"
                            placeholder="What you are looking for today ?                                                                                                                                                            > "
                            className="text-sm bg-black p-4 text-white mb-4 rounded-full w-3/5 mt-12 font-style: italic items-center justify-center"
                        />

                        <FaClockRotateLeft className=" bg-black text-white rounded-3xl w-14 h-11 mt-12 ml-4" />
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-white dark:bg-[#1d1d1f] max-w-8xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-center ml-0 sm:ml-10 pb-4">
                            <Image
                                src={zypher}
                                width={284}
                                height={60}
                                alt="ZYPHER"
                            />
                            <div className="flex flex-row mr-0 sm:mr-10 mt-1 gap-6 ml-0 sm:ml-auto w-1/2 sm:w-1/4 items-center">
                                <Link
                                    className="text-xl font-sans font-bold text-[#fffefe] bg-[#2145c5] flex flex-row justify-center pt-2 w-1/2 h-12 items-start rounded-lg  hover:shadow-md hover:shadow-blue-700/70  hover:duration-300 "
                                    href="/login"
                                >
                                    Login
                                </Link>

                                <Link
                                    className="text-xl font-sans font-bold text-white bg-[#2145c5] flex flex-row justify-center pt-2 w-1/2 h-12 items-start rounded-lg  hover:shadow-md hover:shadow-blue-700/70  hover:duration-300"
                                    href="/signup"
                                >
                                    Signup
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#1d1d1f] flex flex-col justify-end gap-4 w-full items-center">
                        <div className="bg-[#b4d3f3] flex flex-col justify-center pt-16 w-full items-center rounded-tl-[50px] rounded-tr-[50px] md:pt-4">
                            <div className="bg-[#fefafa] flex flex-col-reverse md:flex-row justify-end gap-16 w-5/6 items-start mt-4 mb-4 pt-8 px-10 rounded-[50px] ">
                                <div className="flex flex-col mt-0 mb-12 md:mb-0 md:mt-32 gap-8 w-2/5 items-start">
                                    <div className="text-4xl font-primary text-left leading-[50px]">
                                        <motion.div
                                            variants={fadeIn("right", 0.4)}
                                            initial="hidden"
                                            whileInView={"show"}
                                            viewport={{
                                                once: false,
                                                amount: 0.5
                                            }}
                                            className="text-4xl"
                                        >
                                            Elevate Efficiency with <br />
                                            AI Excellence.
                                        </motion.div>
                                    </div>
                                    <Link
                                        className="text-xl font-sans font-bold text-white bg-[#2145c5] flex flex-row justify-center pt-0 px-2 sm:pt-5 w-full md:w-2/3 sm:h-16 items-start rounded-[20px] drop-shadow-2xl hover:shadow-md hover:shadow-blue-700/70  hover:duration-300"
                                        href="/signup"
                                    >
                                        Sign up for free
                                    </Link>
                                </div>
                                <Image
                                    src={logo}
                                    width={453}
                                    height={440}
                                    alt="ZYPHER"
                                />
                            </div>
                            <div>
                                <div className="flex flex-col justify-center ">
                                    <label className="flex justify-center md:mb-3 text-center">
                                        © 2024 FOZZIL .All Rights Reserved
                                    </label>
                                    <div className="flex gap-3 py-3 text-xs justify-center text-gray-700 ">
                                        <a
                                            rel="noreferrer"
                                            class="cursor-pointer font-normal underline hover:text-black"
                                            target="_blank"
                                            href="https://privacyterms.io/view/zK2RPg8f-bEvdH1oq-CoIEQC/"
                                        >
                                            Terms of use
                                        </a>
                                        <span class="text-gray-600">|</span>
                                        <a
                                            rel="noreferrer"
                                            class="cursor-pointer font-normal underline hover:text-black"
                                            target="_blank"
                                            href="https://privacyterms.io/view/nE9hLqwo-Pg7WoDWg-oewWNc/"
                                        >
                                            Privacy policy
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    var email = getCookie("email", { req, res });
    if (email == undefined) {
        email = false;
    }
    return { props: { email } };
}
