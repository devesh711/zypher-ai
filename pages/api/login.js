import Cookies from "cookies";
import { app, auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createHash } from "crypto";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const email = req.body["email"];
        const password = req.body["password"];

        try {
            // Hash the password
            const hashedPassword = createHash("sha256")
                .update(password)
                .digest("hex");

            // Sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                hashedPassword
            );

            // Access the user data
            const user = userCredential.user;

            // Set a cookie or perform any additional actions
            const cookies = new Cookies(req, res);
            cookies.set("email", email);

            res.redirect("/");
        } catch (error) {
            console.error("Firebase Authentication Error: ", error);
            res.redirect("/login?msg=Incorrect email or password");
        }
    } else {
        res.redirect("/");
    }
}
