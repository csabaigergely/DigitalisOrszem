export async function onRequestPost({ request }) {
  try {
    const { q, source, target } = await request.json();

    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q, source, target }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message, translatedText: q }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
