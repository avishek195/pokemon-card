import Search from "../Search/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Pokedex.css";
import PokemonList from "../PokemonList/PokemonList";

const POKE_URL = "https://pokeapi.co/api/v2/pokemon";
const Pokedex = () => {
  const [pokemonUrl, setPokemonUrl] = useState(POKE_URL);
  const [pokemon, setPokemon] = useState([]);
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");
  const getPokemon = async () => {
    const pokeDetails = await axios.get(pokemonUrl);

    const eachDetails = pokeDetails.data.results;
    setNext(pokeDetails.data.next);
    setPrev(pokeDetails.data.previous);
    const poke = await axios.all(
      eachDetails.map(async (e) => await axios.get(e.url))
    );
    console.log(pokeDetails.data);
    const obj = [];
    poke.map((d) => {
      obj.push({
        id: d.data.id,
        name: d.data.name,
        img:
          d.data.sprites.other.dream_world.front_shiny ||
          d.data.sprites.front_shiny ||
          d.data.sprites.front_default ||
          d.data.sprites.back_default ||
          d.data.sprites.back_shiny,
      });
      // setPokemon((prev) => [
      //   ...prev,
      //   {
      //     id: d.data.id,
      //     name: d.data.name,
      //     img:
      //       d.data.sprites.other.dream_world.front_shiny ||
      //       d.data.sprites.front_shiny ||
      //       d.data.sprites.front_default ||
      //       d.data.sprites.back_default ||
      //       d.data.sprites.back_shiny,
      //   },
      // ]);
      setPokemon(obj);
    });

    console.log(obj);
  };

  const changeNext = () => {
    setPokemonUrl(next);
    // setPokemon([]);
  };
  const changePrev = () => {
    setPokemonUrl(prev);
  };

  useEffect(() => {
    getPokemon();
  }, [pokemonUrl]);
  return (
    <div className="main-container">
      <div className="pokedex-wrapper">
        <h1 id="pokedex-heading">Pokedex</h1>
        <Search />
        <PokemonList pokemon={pokemon} />
      </div>
      <div className="btns">
        <button
          className="prev btn"
          disabled={prev ? false : true}
          onClick={changePrev}
        >
          Prev
        </button>
        <button className="next btn" onClick={changeNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
