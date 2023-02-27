import { useCallback, useEffect, useState } from 'react'
import HangmanDrawing from './HangmanDrawing'
import HangmanWord from './HangmanWord'
import KeyBoard from './KeyBoard'
import words from './wordList.json'

function getWord() {
  return words[Math.floor(words.length * Math.random())]
}


function App() {
  const [wordToGuess, setGuessedWord] = useState(getWord)
  const [guessedLetters, setGuessedLetter] = useState<string[]>([])
  const inCorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  const isLoser = inCorrectLetters.length >= 6
  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter))
  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return
    setGuessedLetter(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!/^[a-zA-Z]$/.test(key)) return
      console.log(guessedLetters)
      addGuessedLetter(key)
    }
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)

    }
  }, [guessedLetters])
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== 'Enter') return
      setGuessedLetter([])
      setGuessedWord(getWord)

    }
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)

    }
  }, [guessedLetters])


  return (
    <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem', margin: '0 auto', alignItems: 'center' }}>
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>
        {isWinner && "Winner！ Refresh to try again"}
        {isLoser && "Nice Try！ Refresh to try again"}
      </div>
      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <KeyBoard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={inCorrectLetters} addGuessedLetter={addGuessedLetter} />

    </div>
  )
}

export default App
