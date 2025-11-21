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

        const translatedTexts = [];

        for (const t of texts) {
            try {
                const res = await fetch("/api/translate", { // note the /api/ prefix for Pages Functions
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ texts }),
                });

                const json = await res.json();
                translatedTexts.push(json.translatedText || t);
            } catch (err) {
                console.error("Translation error:", err);
                translatedTexts.push(t); // fallback to original text
            }
        }

        return new Response(JSON.stringify({ translatedTexts }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        console.error("Worker error:", err);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
