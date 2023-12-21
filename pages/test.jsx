import { useState } from "react";

export default function Home() {
    const [answer, setAnswer] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetcher(data) {
        try {
            setLoading(true);
            const response = await fetch("/api/gpt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                setAnswer(result.answer);
            } else {
                console.error("Bad Response");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.target);
                    const data = Object.fromEntries(formData);
                    fetcher(data);
                }}
            >
                <label htmlFor="persona">Persona:</label>
                <input
                    type="text"
                    id="persona"
                    name="persona"
                    defaultValue="Rick Sanchez"
                />
                <hr />
                <label htmlFor="message">Question:</label>
                <textarea
                    id="message"
                    name="message"
                    defaultValue="What's your problem?"
                />
                <button type="submit">Submit</button>
                {/* Added type attribute */}
            </form>
            {loading ? <p>Loading...</p> : <p>{answer?.content}</p>}
            {/* Simplified to directly access answer.content */}
        </>
    );
}
