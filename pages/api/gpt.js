import { createAnswer } from "../services/openai/config";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const answer = await createAnswer(req.body);
            return res.status(200).json({ answer });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}
