// /functions/translate.js
export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const text = body.text || "";

        const apiKey = context.env.OPENAI_API_KEY;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Translate the following text to English. Keep meaning, no summary changes." },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await response.json();

        return new Response(JSON.stringify({ translatedText: data.choices[0].message.content }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
