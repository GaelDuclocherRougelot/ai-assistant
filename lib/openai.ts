"use server";

import { OpenAI } from "openai";

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	organization: process.env.OPENAI_ORGANIZATION_KEY,
});

const fetchOpenAIResponse = async (userMessage, input, date) => {
	try {
		const response = await client.chat.completions.create({
			model: "gpt-4",
			messages: [
				{
					role: "user",
					content:"A l'aide de " + input + "Formule moi une réponse avec les informations suivantes : " + userMessage + "\n" + "Prend bien en compte la " + date + "dans les notes ",
				}
			],
		});

		if (!response) {
			throw new Error("Error fetching OpenAI response");
		}

		// Convert the response to a plain object
		const plainResponse = JSON.parse(JSON.stringify(response));
		return plainResponse;
	} catch (error) {
		console.error("Error fetching OpenAI response:", error);
	}
};

export { fetchOpenAIResponse };
