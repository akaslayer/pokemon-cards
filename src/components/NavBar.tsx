import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// import { usePokemonValue } from '../Context/PokemonContext';
import { usePokemonContext } from '../Context/PokemonContext';
import logo from '../assets/Logo.png';
import icon from '../assets/SearchIcon.png';
import { Pokemon } from '../hooks/usePokemonList';


interface navBarProps {
  searchPage: boolean
}

const NavBar: React.FC<navBarProps> = ({ searchPage }) => {
  const [search, setSearch] = useState(true);

  const pokemonName = useRef<HTMLInputElement>(null);
  const [showDropdown, setDropdown] = useState(false);
  // const { setValue } = usePokemonValue()
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([])
  // const filteredPokemonList = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(inputValue.toLowerCase()))
  const changeSearchIconState = useCallback(() => {
    setSearch((t) => !t);
  }, [search])


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    let inputValue = "";

    if (pokemonName.current) {
      inputValue = pokemonName.current.value;
    }

    if (inputValue !== "") {
      const filteredPokemon = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      setFilteredPokemonList(filteredPokemon)
      setDropdown(true)

    }
    else {
      setFilteredPokemonList([])
      setDropdown(false);
    }
  }

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setValue(event?.target.value);
  // }

  // function handleChange(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
  //   if (pokemonName.current) {
  //     setValue(pokemonName.current.value)
  //   }
  // }

  const pokemonList = usePokemonContext()

  return (
    <>
      <div className='w-full px-5 py-2 flex justify-between bg-DarkBlue items-center border-b-default border-b-[1px]'>
        <Link to='/'><img className="lg:h-12" src={logo} alt="" /></Link>
        <div className="relative">
          {searchPage && (search ? <img src={icon} alt="" className='w-5 h-[18px] lg:h-8 lg:w-8' onClick={() => changeSearchIconState()} /> : <input onChange={handleInputChange} ref={pokemonName} className="rounded-md bg-purple py-1 px-2 text-DM-Sans text-sm placeholder:text-lightPurple lg:px-8 lg:py-3" placeholder="Search..." type='text' />)}

          {showDropdown && (
            <ul className='absolute right-0  left-0  mt-5 w-full bg-white border-red-500 rounded-md shadow-lg'>
              {filteredPokemonList.map((pokemon, index) => (
                <Link to={`/detail/${pokemon.name}`} key={index}>
                  <li className='border-solid border-2 border-b-gray-400 py-2 px-4 text-gray-400 hover:bg-gray-200 cursor-pointer'>
                    {pokemon.name}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default NavBar