// /functions/translate.js
export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const text = body.text || "";

        console.log("Received text:", text.substring(0, 100));

        const response = await fetch("https://translate.astian.org/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                q: text,
                source: "hu",
                target: "en",
                format: "text"
            })
        });

        const data = await response.json();

        console.log("LibreTranslate response:", data);

        return new Response(JSON.stringify({ translatedText: data.translatedText }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}