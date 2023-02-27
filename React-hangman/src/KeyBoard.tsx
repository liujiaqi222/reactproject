const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

interface KeyboardProps{
  activeLetters:string[]
  inactiveLetters:string[]
  addGuessedLetter:(letter:string) =>void
  disabled?:boolean
}
function KeyBoard({ activeLetters, inactiveLetters, addGuessedLetter, disabled }:KeyboardProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))', gap: '0.5rem', alignSelf: 'stretch' }}>
      {KEYS.map(key => {
        const isActive = activeLetters.includes(key)
        const isInactive = inactiveLetters.includes(key)
        return <button onClick={() => addGuessedLetter(key)} disabled={isInactive||isActive||disabled} className={`btn ${isActive ? 'active' : ''}  ${isInactive ? 'inactive' : ''}`} key={key}>{key}</button>
      })}
    </div>
  )
}

export default KeyBoard