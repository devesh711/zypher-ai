import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function LoginPage({ email }) {
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
            <div className="flex justify-center items-center min-h-screen m-0 p-0">
                <br />
                {msg ? <h3 className="red">{msg}</h3> : <></>}
                <div className="login-container">
                    <h2>Log in</h2>
                    <form action="/api/login" method="POST">
                        <input
                            minLength="3"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Email"
                            required
                        />
                        <br />
                        {!showPasswordFields && (
                            <button
                                className="px-10 py-4 rounded ease-in text-black duration-150 hover:bg-[#5b2d90] hover:text-white"
                                onClick={handleContinue}
                            >
                                Continue
                            </button>
                        )}
                        <br />
                        {showPasswordFields && (
                            <>
                                <input
                                    minLength="5"
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                                <br />

                                <input
                                    className="px-10 py-4 rounded ease-in text-black duration-150 hover:bg-[#5b2d90] hover:text-white"
                                    type="submit"
                                    value="Login"
                                />
                            </>
                        )}
                    </form>

                    {/* Other components */}
                    {!showPasswordFields && (
                        <div>
                            {/* Add Google and Apple authentication options */}
                            <div>
                                <button onClick={() => handleGoogleAuth()}>
                                    Login with Google
                                </button>
                                <button onClick={() => handleAppleAuth()}>
                                    Login with Apple
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
                .login-container {
                    background-color: var(--light-background);
                    border-radius: 15px;
                    padding: 20px;
                    width: 300px;
                    margin: 0 auto;
                }

                .login-container h2 {
                    color: var(--primary);
                }
            `}</style>
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
