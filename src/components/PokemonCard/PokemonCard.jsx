const PokemonCard = ({ id, img, name }) => {
  return (
    <div className="card" key={id}>
      {/* <div className="pics"> */}
      <img src={img} className="pokemon-img" alt={name} />
      {/* </div> */}
      <h3>{name.toUpperCase()}</h3>
    </div>
  );
};

export default PokemonCard;
