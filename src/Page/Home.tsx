import { PokemonContext } from '../Context/PokemonContext';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import usePokemonList from '../hooks/usePokemonList';

const Home = () => {
  const { pokemonList } = usePokemonList();
  // const { inputValue } = usePokemonContext()
  // const filteredPokemonList = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(inputValue.toLowerCase()))

  return (
    <PokemonContext.Provider value={pokemonList}>
      <>
        <section className="home">
          <NavBar searchPage={true} />
          <div className='grid gap-4 w-full justify-between px-[21px] py-6 grid-cols-2 md:grid-cols-4'>
            {pokemonList.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        </section>
      </>
    </PokemonContext.Provider>
  )
}

export default Home