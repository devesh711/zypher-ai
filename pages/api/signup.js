import Cookies from "cookies";
import { app, auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createHash } from "crypto";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const email = req.body["email"];
        const password = req.body["password"];
        const passwordagain = req.body["passwordagain"];

        if (password !== passwordagain) {
            res.redirect("/signup?msg=The two passwords don't match");
            return;
        }

        try {
            // Hash the password
            const hashedPassword = createHash("sha256")
                .update(password)
                .digest("hex");

            // Sign up with Firebase Authentication
            await createUserWithEmailAndPassword(auth, email, hashedPassword);

            // Set a cookie or perform any additional actions
            const cookies = new Cookies(req, res);
            cookies.set("email", email);

            res.redirect("/");
        } catch (error) {
            console.error("Firebase Authentication Error: ", error);
            res.redirect("/signup?msg=Error creating user");
        }
    } else {
        res.redirect("/");
    }
}
