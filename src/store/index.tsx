import React, {createContext, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from "react";
import axios from 'axios'
import * as stream from "node:stream";

type PokemonDataType = {
    name: string,
    id: number,
    url: string,
    abilities: { ability: {name: string}}[],
    stats: { stat: { name: string },base_stat: string }[],
}


interface IGlobalContext {
    pokeData: PokemonDataType[],
    pokeDex: PokemonDataType | null,
    nextUrl: string,
    prevUrl: string,
    setPokeDex: React.Dispatch<SetStateAction<PokemonDataType | null>> ,
    setNextUrl: React.Dispatch<SetStateAction<string>>,
    setPokeData: React.Dispatch<SetStateAction<PokemonDataType[]>>,
    setUrl: React.Dispatch<SetStateAction<string>>,
}

export const GlobalContext = createContext<IGlobalContext>({
    pokeData: [],
    pokeDex: null,
    nextUrl: "",
    prevUrl: "",
    setPokeDex: () => {} ,
    setNextUrl: () => {},
    setPokeData: () => {},
    setUrl: () => {},
});

export const useStore = () => {
    return useContext(GlobalContext);
}

export const GlobalStore: FC<PropsWithChildren> = ({children}) => {
    const [pokeData,setPokeData]=useState<PokemonDataType[]>([]);
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl,setNextUrl]=useState('');
    const [prevUrl,setPrevUrl]=useState('');
    const [pokeDex,setPokeDex]=useState<PokemonDataType | null>(null);

    const pokeFunc=async()=>{
        const res= await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        void getPokemon(res.data.results);
    }
    const getPokemon = async(res: {url: string, id: number}[])=>{
        const response = await Promise.all(res.map((item) => {
            return axios.get<PokemonDataType>(item.url)
        }))
        setPokeData(response.map((item) => item.data))
    }
    useEffect(()=>{
        pokeFunc();
    },[url])

    return(
        <GlobalContext.Provider value={{
            pokeData,
            pokeDex,
            nextUrl,
            prevUrl,
            setPokeDex,
            setNextUrl,
            setPokeData,
            setUrl,

        }}>
            {children}
        </GlobalContext.Provider>
    );
}
export default GlobalStore;