import Layout from "../components/layout";
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
