"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // TODO: Send message to OpenAI API and get response
    // For now, we'll just simulate a response
    setTimeout(() => {
      const aiMessage = {
        role: "assistant",
        content:
          "Voici une réponse simulée de l'IA. Dans une implémentation réelle, cette réponse proviendrait de l'API OpenAI.",
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-3/4 p-3 rounded-lg ${message.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 flex">
        <input
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
  )
}

