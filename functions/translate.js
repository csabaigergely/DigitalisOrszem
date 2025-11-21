export async function onRequestPost(context) {
  try {
    const { texts } = await context.request.json();

    const apiKey = context.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing OPENAI_API_KEY" }), {
        status: 500
      });
    }

    // 🔥 ÚJ OpenAI endpoint
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content:
              "Translate each string in the incoming JSON array to English. Return ONLY a valid JSON array of strings."
          },
          {
            role: "user",
            content: JSON.stringify(texts)
          }
        ]
      })
    });

    const raw = await response.text();

    // Debug: lásd pontosan mit küld a modell
    console.log("RAW FROM OPENAI:", raw);

    const data = JSON.parse(raw);

    let content = data.output_text || "";

    content = content.replace(/```json|```/g, "").trim();

    const translatedTexts = JSON.parse(content);

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
