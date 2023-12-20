import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg";
import zypher from "../public/zypher.svg";

export default function HomePage({ username }) {
    return (
        <Layout pageTitle="Zypher AI">
            {username ? (
                <>
                    <div className="bg-white dark:bg-black flex flex-col justify-end pt-8 gap-4 w-full items-start overflow-hidden noscroll">
                        <div>
                            <h2 className="text-3xl font-bold ">
                                Hi {username}.
                            </h2>
                            <div className="mb-6">
                                <Link
                                    className="px-10 py-4 rounded font-bold ease-in text-black duration-150 hover:bg-[#5b2d90] hover:text-white "
                                    href="/profile"
                                >
                                    Profile
                                </Link>
                            </div>
                            <br />
                            <div className="mb-6">
                                <Link
                                    className="px-10 py-4 rounded ease-in text-black duration-150 hover:bg-[#5b2d90] hover:text-white"
                                    href="/api/logout"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-white dark:bg-[#1d1d1f] max-w-8xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-center ml-0 sm:ml-10 py-4">
                            <Image
                                src={zypher}
                                width={284}
                                height={60}
                                alt="ZYPHER"
                            />
                            <div className="flex flex-row mr-0 sm:mr-10 mt-1 gap-6 ml-0 sm:ml-auto w-1/2 sm:w-1/4 items-center">
                                <Link
                                    className="text-xl font-sans font-bold text-[#fffefe] bg-[#2145c5] flex flex-row justify-center pt-2 w-1/2 h-12 items-start rounded-lg"
                                    href="/login"
                                >
                                    Login
                                </Link>

                                <Link
                                    className="text-xl font-sans font-bold text-white bg-[#2145c5] flex flex-row justify-center pt-2 w-1/2 h-12 items-start rounded-lg"
                                    href="/signup"
                                >
                                    Signup
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#1d1d1f] flex flex-col justify-end gap-4 w-full items-center">
                        <div className="bg-[#b4d3f3] flex flex-row justify-center pt-16 w-full items-start rounded-tl-[50px] rounded-tr-[50px] md:pt-4">
                            <div className="bg-[#fefafa] flex flex-col-reverse md:flex-row justify-end gap-16 w-5/6 items-start mt-4 mb-16 pt-8 px-10 rounded-[50px] ">
                                <div className="flex flex-col mt-0 mb-12 md:mb-0 md:mt-32 gap-8 w-2/5 items-start">
                                    <div className="text-4xl font-primary text-left leading-[50px]">
                                        Elevate Efficiency with <br />
                                        AI Excellence.
                                    </div>

                                    <Link
                                        className="text-xl font-sans font-bold text-white bg-[#2145c5] flex flex-row justify-center pt-0 px-2 sm:pt-5 w-full md:w-2/3 sm:h-16 items-start rounded-[20px]"
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
                        </div>
                        <div className="flex flex-col justify-center ">
                            <label className="flex justify-center md:mb-3 text-center">
                                © 2023 FOZZIL .All Rights Reserved
                            </label>
                            <div className="flex gap-3 py-3 text-xs justify-center text-gray-700">
                                <a
                                    rel="noreferrer"
                                    class="cursor-pointer font-normal underline"
                                    target="_blank"
                                    href="https://privacyterms.io/view/zK2RPg8f-bEvdH1oq-CoIEQC/"
                                >
                                    Terms of use
                                </a>
                                <span class="text-gray-600">|</span>
                                <a
                                    rel="noreferrer"
                                    class="cursor-pointer font-normal underline"
                                    target="_blank"
                                    href="https://privacyterms.io/view/nE9hLqwo-Pg7WoDWg-oewWNc/"
                                >
                                    Privacy policy
                                </a>
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
    var username = getCookie("username", { req, res });
    if (username == undefined) {
        username = false;
    }
    return { props: { username } };
}
