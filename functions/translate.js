export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const texts = body.texts;

        if (!texts || !Array.isArray(texts)) {
            return new Response(JSON.stringify({ error: "Missing 'texts' array" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Translate one by one (LibreTranslate does not support batch requests)
        const translatedTexts = [];

        for (const t of texts) {
            const res = await fetch("https://libretranslate.de/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    q: t,
                    source: "hu",
                    target: "en",
                    format: "text"
                })
            });

            const json = await res.json();

            translatedTexts.push(json.translatedText || "");
        }

        return new Response(JSON.stringify({ translatedTexts }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
