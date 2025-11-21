export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle /translate endpoint
    if (url.pathname === "/translate" && request.method === "POST") {
      try {
        const body = await request.json();
        const texts = body.texts;

        if (!texts || !Array.isArray(texts)) {
          return new Response(
            JSON.stringify({ error: "Missing 'texts' array" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const translatedTexts = [];

        for (const t of texts) {
          const res = await fetch("https://libretranslate.de/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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

    // Let Cloudflare Pages handle static files
    return env.ASSETS.fetch(request);
  }
};
