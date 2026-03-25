import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
}

export default function TypewriterText({ text, speed = 30, className = '' }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)

    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <span className="inline-block ml-1 h-4 w-0.5 bg-purple-400 animate-blink" />
      )}
    </span>
  )
}