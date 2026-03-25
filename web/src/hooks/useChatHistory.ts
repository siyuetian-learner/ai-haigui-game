import { useState } from 'react'
import type { Message } from '../types/message'

export function useChatHistory(initial: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initial)

  function appendMessage(message: Message) {
    setMessages((prev) => [...prev, message])
  }

  return { messages, appendMessage, setMessages }
}

