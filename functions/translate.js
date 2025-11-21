// functions/translate.js

export async function onRequestPost(context) {
    try {
        // Try to parse request body
        let body = {};
        try {
            body = await context.request.json();
        } catch (err) {
            return new Response(
                JSON.stringify({ error: "Invalid JSON in request body", details: err.message }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const text = body.text || "";

        // Log for debugging
        console.log("Received text:", text);

        const apiKey = context.env.OPENAI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Missing OPENAI_API_KEY" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Call OpenAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Translate the following text to English. Keep meaning unchanged." },
                    { role: "user", content: text }
                ]
            })
        });

        const raw = await response.text();  // Read as text!
        console.log("OpenAI raw response:", raw);

        let data;
        try {
            data = JSON.parse(raw);
        } catch {
            return new Response(
                JSON.stringify({ error: "OpenAI returned invalid JSON", raw }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ translatedText: data.choices?.[0]?.message?.content || "" }),
            { headers: { "Content-Type": "application/json" } }
        );

    } catch (err) {
        console.error("Fatal error:", err);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
