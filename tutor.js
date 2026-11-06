exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 503, body: JSON.stringify({ error: "AI tutor is not configured" }) };
  }
  try {
    const { message, history = [] } = JSON.parse(event.body || "{}");
    if (!message || typeof message !== "string") {
      return { statusCode: 400, body: JSON.stringify({ error: "Message is required" }) };
    }
    const safeHistory = Array.isArray(history)
      ? history.filter(x => x && ["user", "assistant"].includes(x.role) && typeof x.content === "string")
          .slice(-8).map(x => ({ role: x.role, content: x.content.slice(0, 1200) }))
      : [];
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.5,
        messages: [
          {
            role: "system",
            content: `You are English Buddy, a warm and patient English tutor for Indonesian A1 beginners.
Speak mostly in very simple English (CEFR A1). Keep replies short, usually 2-5 sentences.
Ask only one simple follow-up question at a time. Encourage the learner.
When the learner makes a grammar or vocabulary mistake, gently show:
Correction: [correct sentence]
Why: [very short explanation in simple English or Indonesian if needed]
Then continue the conversation naturally. Do not shame the learner. Adapt to their level.
Practice everyday topics: introductions, family, routines, food, school, hobbies, places, and basic questions.
If the learner writes in Indonesian, explain briefly in Indonesian and invite them to try in English.`
          },
          ...safeHistory,
          { role: "user", content: message.slice(0, 2000) }
        ]
      })
    });
    const data = await response.json();
    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify({ error: data.error?.message || "AI request failed" }) };
    }
    const reply = data.choices?.[0]?.message?.content || "Let's practice another sentence!";
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Unable to process the conversation" }) };
  }
};
