import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className="App">
      <Board />
    </div>
  )
}

function Board() {
  const [board, setBoard] = useState<string[]>(new Array(9).fill(''))
  const [nextMove, setNextMove] = useState('X')
  const [isWinning, setIsWinning] = useState(false)
  function handlePlay(index: number) {
    if (isWinning) return
    if (board[index] === '') {
      board[index] = nextMove
      setBoard(board)
      setIsWinning(checkIsWinning(board))
      setNextMove(nextMove === 'X' ? 'O' : 'X')
    }
  }
  return (
    <>
      <div>{isWinning ? `Winner is ${nextMove === 'X' ? 'O' : 'X'}` : `player:${nextMove}`}</div>
      <div className='board'>
        {
          board.map((_, index) => {
            return (<span key={index} className='button' onClick={() => handlePlay(index)}>{board[index]}</span>)
          })
        }
      </div></>
  )
}

function checkIsWinning(board: string[]): boolean {
  const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  return winning.some(winning => {
    if (board[winning[0]] === board[winning[1]] && board[winning[1]] === board[winning[2]] && board[winning[0]] !== '') {
      console.log(board[winning[0]] === board[winning[1]] && board[winning[1]] === board[winning[2]])
      return board[winning[0]]
    }
  })
}


export default App
