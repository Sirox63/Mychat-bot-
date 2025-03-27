const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/webhook", async (req, res) => {
    const question = req.body.queryResult.queryText;

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4",
            messages: [{ role: "user", content: `أجب باللغة العربية: ${question}` }],
            temperature: 0.7
        }, {
            headers: { "Authorization": `Bearer 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` }
        });

        res.json({ fulfillmentText: response.data.choices[0].message.content });
    } catch (error) {
        console.error("❌ خطأ في الاتصال بـ OpenAI:", error);
        res.json({ fulfillmentText: "عذرًا، حدث خطأ أثناء معالجة سؤالك." });
    }
});

app.listen(3000, () => console.log("🚀 Webhook يعمل على المنفذ 3000"));
