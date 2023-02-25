import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import { Navbar } from './components/Navbar/Navbar'
import { getAllPokemon, getPokemon } from './utils/pokemon'

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL)
      loadPokemon(res.results)
      setNextUrl(res.next)
      setPrevUrl(res.previous)
      setLoading(false)
    }
    fetchPokemonData()
  }, [])

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url)
        return pokemonRecord
      })
    )
    setPokemonData(_pokemonData)
  }

  const handlePrevPage = async (url) => {
    if (!url) return
    setLoading(true)
    let data = await getAllPokemon(url)
    await loadPokemon(data.results)
    setPrevUrl(data.previous)
    setLoading(false)
  }

  const handleNextPage = async (url) => {
    if (!url) return
    setLoading(true)
    let data = await getAllPokemon(url)
    await loadPokemon(data.results)
    setNextUrl(data.next)
    setPrevUrl(data.previous)
    setLoading(false)
  }

  return (
    <div className='bg-blue-50'>
      <Navbar />
      <div className='mt-5 flex justify-center items-center pb-6 gap-5'>
        <button onClick={() => handlePrevPage(prevUrl)} className='py-1 px-5 border border-sky-500 bg-white rounded-md'>前へ</button>
        <button onClick={() => handleNextPage(nextUrl)} className='py-1 px-5 border border-sky-500 bg-white rounded-md'>次へ</button>
      </div>
      <div className="mb-5 px-5 text-center w-full">
        {loading ? (
          <h1>ロード中</h1>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-5 pt-5">
              {pokemonData.map((pokemon) => (
                <Card key={pokemon.name} pokemon={pokemon} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className='flex justify-center items-center pb-6 gap-5'>
        <button onClick={() => handlePrevPage(prevUrl)} className='py-1 px-5 border border-sky-500 bg-white rounded-md'>前へ</button>
        <button onClick={() => handleNextPage(nextUrl)} className='py-1 px-5 border border-sky-500 bg-white rounded-md'>次へ</button>
      </div>
    </div>
  )
}

export default App
