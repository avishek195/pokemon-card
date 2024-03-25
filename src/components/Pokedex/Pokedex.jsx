import Search from "../Search/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Pokedex.css";
import PokemonList from "../PokemonList/PokemonList";

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([]);
  const [next, setNext] = useState("");
  const getPokemon = async () => {
    const pokeDetails = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=50"
    );

    const eachDetails = pokeDetails.data.results;

    const poke = await axios.all(
      eachDetails.map(async (e) => await axios.get(e.url))
    );
    console.log(poke);
    poke.map((d) => {
      setPokemon((prev) => [
        ...prev,
        {
          id: d.data.id,
          name: d.data.name,
          img:
            d.data.sprites.other.dream_world.front_shiny ||
            d.data.sprites.front_shiny ||
            d.data.sprites.front_default ||
            d.data.sprites.back_default ||
            d.data.sprites.back_shiny,
        },
      ]);
    });
  };
  const changeNext = () => {};

  useEffect(() => {
    getPokemon();
  }, []);
  return (
    <div className="main-container">
      <div className="pokedex-wrapper">
        <h1 id="pokedex-heading">Pokedex</h1>
        <Search />
        <PokemonList pokemon={pokemon} />
      </div>
      <div className="btns">
        <button className="prev btn">Prev</button>
        <button className="next btn" onClick={changeNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
