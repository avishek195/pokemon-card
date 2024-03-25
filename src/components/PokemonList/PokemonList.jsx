import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";

const PokemonList = ({ pokemon }) => {
  return (
    <div className="pokemon-list">
      {pokemon.length === 0 ? (
        <h1>Loding...</h1>
      ) : (
        <>
          {pokemon.map((e) => {
            return (
              <PokemonCard id={e.id} name={e.name} img={e.img} key={e.id} />
            );
          })}
        </>
      )}
    </div>
  );
};

export default PokemonList;
