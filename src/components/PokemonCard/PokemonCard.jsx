import { Link } from "react-router-dom";

const PokemonCard = ({ id, img, name }) => {
  return (
    <Link to={`/pokemon/${id}`} className="card" key={id}>
      <img src={img} className="pokemon-img" alt={name} />
      <h3>{name.toUpperCase()}</h3>
    </Link>
  );
};

export default PokemonCard;
