import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import clientPromise from "../lib/mongodb";

export default function ProfilePage({ email, created }) {
    return (
        <Layout pageTitle="Profile">
            <Link href="/">Home</Link>
            <br />
            <h2>{email}'s Profile</h2>
            <p>
                Account created at <strong>{created}</strong>
            </p>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    var email = getCookie("email", { req, res });
    if (email == undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        };
    }
    const client = await clientPromise;
    const db = client.db("Users");
    const users = await db
        .collection("Profiles")
        .find({ email: email })
        .toArray();
    const userdoc = users[0];
    const created = userdoc["Created"];
    return {
        props: { email: email, created: created }
    };
}
