"use server";

import { OpenAI } from "openai";

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	organization: process.env.OPENAI_ORGANIZATION_KEY,
});

const fetchOpenAIResponse = async (userMessage) => {
	try {
		const response = await client.chat.completions.create({
			model: "gpt-4",
			messages: [
				{
					role: "user",
					content: userMessage + "\n",
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
