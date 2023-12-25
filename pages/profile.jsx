{
    /* import Layout from "../components/layout";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../firebase/firebaseConfig";

export default function ProfilePage({ created }) {
    return (
        <Layout pageTitle="Profile">
            <Link href="/">Home</Link>
            <br />
            <h2>Your Profile</h2>
            <p>
                Account created at <strong>{created}</strong>
            </p>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const auth = getAuth();
    const user = await new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });

    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        };
    }

    // Access the account creation time directly from the user object
    const created = user.metadata.creationTime;

    return {
        props: { created }
    };
} 
*/
}
import Image from "next/image";
import React, { Fragment, useState } from "react";
import Modal from "../components/Modal";
import guest from "../public/guest.svg";
import { UserAuth } from "../context/AuthContext";

function profile() {
    const [showModal, setShowModal] = useState(false);
    const { user } = UserAuth();
    // const [showModal1, setShowModal1]= useState(false);
    return (
        <Fragment>
            <div className="p-10 text-center">
                <h1 className="text-3xl mb-5">Profile</h1>
                <Image
                    src={
                        !user
                            ? guest
                            : !user.displayname
                            ? guest
                            : user.displayname
                    }
                    alt="Z"
                    height={100}
                    width={100}
                    onClick={() => setShowModal(true)}
                />
            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                {/* <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"> */}
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="FOZZIL.in"
                                required
                            />
                        </div>
                        <div>
                            <label
                                for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input
                                        id="remember"
                                        aria-describedby="remember"
                                        type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required
                                    />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label
                                        for="remember"
                                        class="text-gray-500 dark:text-gray-300"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <a
                                href="#"
                                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Sign in
                        </button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet?{" "}
                            <a
                                href="#"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Sign up
                            </a>
                        </p>
                    </form>
                </div>
                {/* </div> */}
            </Modal>
        </Fragment>
    );
}

export default profile;
