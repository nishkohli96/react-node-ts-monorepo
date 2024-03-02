import MenuItem from '@mui/material/MenuItem';

type Pokemon = {
  name: string;
  url: string;
};

type PokeApiResult = {
  results: Pokemon[];
};

async function getData() {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=15&offset=0',
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function PokemonList() {
  const data: PokeApiResult = await getData();

  return (
    <main>
      {data.results.map((pokemon, idx) => (
        <MenuItem key={idx}>
          {pokemon.name}
        </MenuItem>
      ))}
    </main>
  );
}
