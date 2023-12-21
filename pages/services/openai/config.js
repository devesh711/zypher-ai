import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

export default async function createAnswer(prompt) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Use the GPT-3.5-turbo engine
        prompt: `
            You act as ${prompt.persona}.
            Desired Behaviour:
            - You answer to the user from ${prompt.persona}'s perspective.
            - Use the same lingo as ${prompt.persona} would use.
            - You can only answer concepts that exist during your lifetime.
            - You can only answer topics with your expertise.
            - Answer in 3 sentences maximum

            User: ${prompt.message}
        `,
        max_tokens: 2048,
        temperature: 1
    });

    return response.data.choices[0].text.trim();
}
