import { createContext, useContext } from 'react';
import { Pokemon } from '../hooks/usePokemonList'


// 


export const PokemonContext = createContext<Pokemon[]>([]);
export const usePokemonContext = () => useContext(PokemonContext)