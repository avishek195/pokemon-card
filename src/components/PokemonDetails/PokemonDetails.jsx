import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
const PokemonDetails = () => {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const downloadPokemon = async () => {
    const d = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      id: d.data.id,
      name: d.data.name,
      img:
        d.data.sprites.other.dream_world.front_shiny ||
        d.data.sprites.front_shiny ||
        d.data.sprites.front_default ||
        d.data.sprites.back_default ||
        d.data.sprites.back_shiny,
    });
    setLoading(false);
  };
  useEffect(() => {
    downloadPokemon();
  }, []);

  const changeBack = () => {
    return navigate("/");
  };
  return (
    <>
      {loading ? (
        <div className="card">
          <h2>Loding...</h2>
        </div>
      ) : (
        <div className="card">
          <img src={pokemon.img} className="pokemon-img" alt={pokemon.name} />
          <h3>{pokemon.name.toUpperCase()}</h3>
        </div>
      )}
      <div className="bt">
        <button className="btn" onClick={changeBack}>
          Back
        </button>
      </div>
    </>
  );
};

export default PokemonDetails;
