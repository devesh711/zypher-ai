import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg";
import zypher from "../public/zypher.svg";

export default function HomePage({ username }) {
    return (
        <Layout pageTitle="Home">
            {username ? (
                <>
                    <div className="bg-white flex flex-col justify-end pt-8 gap-4 w-full items-start overflow-hidden noscroll">
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
                    <div className="bg-white flex flex-col justify-end pt-8 gap-4 w-full items-start md:w-full">
                        <div className="flex flex-row justify-between ml-24 w-5/6 items-start ">
                            <Image
                                src={zypher}
                                width={284}
                                height={60}
                                alt="ZYPHER"
                            />
                            <div className="flex flex-row mt-1 gap-6 w-1/4 items-start">
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
                        <div className="bg-[#b4d3f3] flex flex-row justify-center pt-16 w-full items-start rounded-tl-[50px] rounded-tr-[50px] 2xl:px-90 ">
                            <div className="bg-[#fefafa] flex flex-row justify-end gap-16 w-5/6 items-start mt-4 mb-16 pt-8 px-10 rounded-[50px]">
                                <div className="flex flex-col mt-32 gap-8 w-2/5 items-start">
                                    <div className="text-4xl font-primary text-left leading-[50px]">
                                        Elevate Efficiency with <br />
                                        AI Excellence.
                                    </div>
                                    <Link
                                        className="text-xl font-sans font-bold text-white bg-[#2145c5] flex flex-row justify-center pt-5 w-2/3 h-16 items-start rounded-[20px]"
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
