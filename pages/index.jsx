import React, { use, useState, useEffect, Fragment } from "react";
import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg";
import guest from "../public/guest.svg";
import zypher from "../public/zypher.svg";
import { motion } from "framer-motion";
import { fadeIn } from "../components/variants";
import { UserAuth } from "../context/AuthContext";
import { FaClockRotateLeft } from "react-icons/fa6";
import Modal from "../components/Modal";
import Profile from "../components/Profile";
import Heart from "../components/Heart";
import bg from "../public/bg.png";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button
} from "@nextui-org/react";

export default function HomePage({ email }) {
    const { user, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("loading");
    const [selectedKeys, setSelectedKeys] = React.useState(
        new Set(["Zypher-Chat"])
    );

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };
    const handleChat = (e) => {
        e.preventDefault();
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
                    <div className="bg-white dark:bg-black flex flex-col sm:flex-row items-center justify-between h-20 z-10 ml-0 sm:ml-10 pb-2 overflow-hidden noscroll ">
                        <div className="flex items-center gap-2">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        color="primary"
                                        variant="faded"
                                        className="capitalize dark"
                                    >
                                        {selectedValue}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeys}
                                    onSelectionChange={setSelectedKeys}
                                >
                                    <DropdownItem key="zypher-chat">
                                        Zypher-Chat
                                    </DropdownItem>
                                    <DropdownItem key="heart">
                                        Heart{" "}
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div class="absolute left-1/2 -translate-x-1/2"></div>
                        <div className="flex gap-2 pr-1">
                            <Fragment>
                                <Image
                                    src={
                                        !!user
                                            ? user.photoURL
                                                ? user.photoURL
                                                : guest
                                            : guest
                                    }
                                    alt="Y"
                                    className="mr-5 rounded-full transition-transform active:scale-75 "
                                    height={50}
                                    width={50}
                                    title="Profile"
                                    onClick={() => setShowModal(true)}
                                />
                                <Modal
                                    isVisible={showModal}
                                    onClose={() => setShowModal(false)}
                                >
                                    <Profile
                                        User={user}
                                        handleSignOut={handleSignOut}
                                    ></Profile>
                                </Modal>
                            </Fragment>
                        </div>
                    </div>
                    <div className=" bg-[#b4d3f3] min-h-screen justify-center rounded-3xl">
                        {selectedValue === "zypher-chat" ? (
                            <div className="bg-[#b4d3f3] flex w-auto rounded-3xl items-start justify-center">
                                <form className="flex bg-black p-4 mb-4 rounded-full w-3/5 mt-12 items-start justify-start ">
                                    <input
                                        type="text"
                                        placeholder="What you are looking for today ?"
                                        className="text-sm w-11/12 bg-black outline-non border-none active:border-none focus:border-none text-white   font-Inter "
                                    />
                                    <input
                                        type="submit"
                                        className="text-white pl-[6%] "
                                        value=">"
                                        onClick={handleChat}
                                    />
                                </form>

                                <FaClockRotateLeft
                                    className=" bg-black text-white rounded-full p-2 w-14 h-14 mt-12 ml-4 cursor-pointer"
                                    title="History"
                                />
                            </div>
                        ) : null}
                        {selectedValue === "heart" ? (
                            <div className="pt-4">
                                <Heart></Heart>
                            </div>
                        ) : null}
                    </div>
                </>
            ) : (
                <>
            <div className="bg-cover bg-center h-full w-full"
            style={{backgroundImage: `url(${bg})`}} >
                    <div className=" max-w-8xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-center ml-0 sm:ml-10 pb-4">
                            <Image
                                src={zypher}
                                width={200}
                                height={100}
                                alt="ZYPHER"
                            />
                            <div className="flex flex-row font-['Hind Guntur fonts'] mr-0 sm:mr-14 mt-1 gap-4 ml-0 sm:ml-auto w-1/2 sm:w-1/3 items-center">
                            <Link
                                    className="text-xl font-semibold text-[#fffefe] flex flex-row justify-center pt-2 w-1/3 h-12 items-start rounded-lg "
                                    href="/login"
                                >
                                   Pricing
                                </Link>
                                <Link
                                    className="text-xl font-semibold text-[#fffefe]  flex flex-row justify-center pt-2 w-1/3 h-12 items-start rounded-lg "
                                    href="/login"
                                >
                                    Help
                                </Link>
                                <Link
                                    className="text-xl font-semibold text-[#fffefe]  flex flex-row justify-center pt-2 w-1/3 h-12 items-start rounded-lg"
                                    href="/login"
                                >
                                    Solution
                                </Link>
                                <Link
                                    className="text-xl font-semibold text-[#fffefe] border-3 border-sky-500 flex flex-row justify-center pt-2 w-2/5 h-12 items-start rounded-lg  hover:shadow-md hover:shadow-blue-700/70  hover:duration-300 "
                                    href="/login"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    className="text-xl font-semibold text-black bg-[#ffff] flex flex-row justify-center pt-2 w-2/5 h-12 items-start rounded-lg  hover:shadow-md hover:shadow-blue-700/70  hover:duration-300"
                                    href="/signup"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-center bg-cover justify-end gap-4 w-full items-center" 
                    >
                    
                        <div className=" flex flex-col h-screen md:flex-row justify-end pt-16 w-5/6 items-center rounded-tl-[50px] rounded-tr-[50px] md:pt-4 ml-9">
                            {/* <div className="bg-[#fefafa] flex flex-col-reverse md:flex-row justify-end gap-12 w-3/4 items-start mt-4 mb-4 pt-8 px-10 rounded-[50px] "> */}
                                <div className="flex flex-col mx-13 md:mb-14 rem gap-6 w-full items-start">
                               
                                   <Image
                               src={logo}
                               width={550}
                               height={550}
                               alt="ZYPHER"

                           />  
                           </div>
                           <div className=" text-5xl text-white font-['Hind Guntur fonts'] font-bold text-left leading-[50px] ">      
                                <motion.div
                                            variants={fadeIn("right", 0.4)}
                                            initial="hidden"
                                            whileInView={"show"}
                                            viewport={{
                                                once: false,
                                                amount: 0.5
                                            }}
                                            // className="text-5xl"
                                        >
                                            Elevate Efficiency with
                                           <span className="text-7xl mt-3 bg-gradient-to-r from-[#1E438E] to-[#CBD7F0]  inline-block text-transparent bg-clip-text"> AI Explanans</span>
                                           <p className="text-lg mt-3 font-normal">We’re revolutionizing the way businesses leverage AI.<br></br>
Ready to unlock the potential of using AI for your success?<br></br>
Let’s embark on this transformative journey together</p>
                                        </motion.div>
                                        
                                  
                                    <Link
                                        className="text-xl font-['Hind Guntur fonts'] font-bold text-black bg-blue-gray-50 flex flex-row w-40 justify-center ml-16 mt-5 sm:pt-3 pb-2 h-2/5 rounded-[10px] drop-shadow-2xl hover:shadow-md hover:shadow-blue-700/70 hover:duration-300"
                                        href="/signup"
                                    >
                                        Get Started
                                    </Link>
                                    </div>
                                
                             
                            </div>
                            {/* <div>
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
                            </div> */}
                        </div>
                    </div>
                    {/* </div> */}
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
