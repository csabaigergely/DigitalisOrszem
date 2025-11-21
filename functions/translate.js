export async function onRequestPost(context) {
  try {
    const { texts } = await context.request.json();
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
          {
            role: "system",
            content: "Translate all texts to English. Return the result as a JSON array, same order."
          },
          {
            role: "user",
            content: JSON.stringify(texts)
          }
        ]
      })
    });

    const data = await response.json();
    const translatedTexts = JSON.parse(data.choices[0].message.content);

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
