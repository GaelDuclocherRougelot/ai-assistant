"use client";

import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";
import { fetchOpenAIResponse } from "@/lib/openai";

export default function ChatPage() {
	const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;

		const userMessage = { role: "user", content: input };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");

    // TODO: Send message to OpenAI API and get response
    setIsLoading(true);
    const openapi = await fetchOpenAIResponse(userMessage.content);
setMessages((prev) => [...prev, openapi.choices[0].message]);
    console.log(openapi.choices[0].message.content);
    setIsLoading(false);

    }
  
    return (
      <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message: { role: string; content: string }, index: number) => (
            <div
              key={index}
              className={`flex max-w-3/4 p-3 rounded-lg ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-3/4 p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}
              >
               <p className="whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}
          				{isLoading && (
					<div className="flex justify-start">
						<div className="max-w-3/4 p-3 rounded-lg bg-gray-100 text-gray-800">
							<p>En attente de la réponse de l'IA...</p>
						</div>
					</div>
				)}
        </div>
        <form onSubmit={handleSubmit} className="border-t p-4 flex">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-1 border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    );
	};

