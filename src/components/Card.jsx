import React from 'react'

const Card = ({pokemon}) => {
  return (
    <div className='w-full shadow-md rounded-lg bg-white p-4 justify-center'>
      <div>
        <img src={pokemon.sprites.front_default} className='mx-auto' />
      </div>
      <h3 className='mt-0 mb-2.5 p-0 text-xl'>{pokemon.name}</h3>
      <div>
        <div>タイプ</div>
        {pokemon.types.map((type, i) => (
          <div key={type.type.name}>
            <span>{type.type.name}</span>
          </div>
        ))}
      </div>
      <div>
        <div>
          <p>重さ：{pokemon.weight}kg</p>
        </div>
        <div>
          <p>高さ：{pokemon.height}cm</p>
        </div>
        <div>
          <p>アビリティ：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Card