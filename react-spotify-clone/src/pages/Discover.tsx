import { Error, Loader, SongCard } from '../components'
import { useEffect, useState } from 'react'
import { getNewSong } from '../api'
import { genres } from '../assets/constants'
const Discover = () => {
  const genreTitle = 'POP'
  return (
    <div className="flex flex-col">
      <UsingFetchAPI />
      <div className="w-full flex mt-4 mb-10 justify-center items-center flex-col sm:flex-row ">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
        <select
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap  sm:justify-start justify-center gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((song, i) => (
          <SongCard key={song.key} song={song} i={i} />
        ))}
      </div>
    </div>
  )
}

const UsingFetchAPI = () => {
  const [user, setUsers] = useState()
  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        setUsers(json)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return <></>
}
export default Discover
