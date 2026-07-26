// lib/ai.ts

export async function generateTextWithAI(prompt: string, apiKey: string): Promise<string> {
    if (!apiKey) {
        throw new Error("Aucune clé API n'est configurée dans les paramètres.");
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Le modèle le plus rapide et le moins cher
                messages: [
                    {
                        role: "system",
                        content: "Tu es un assistant intégré à une application de prise de notes appelée Jotion. Réponds toujours en formatant ton texte de manière claire et concise. Ne fais pas de phrases d'introduction superflues."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || "Erreur lors de la communication avec l'IA");
        }

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error("Erreur IA:", error);
        throw error;
    }
}