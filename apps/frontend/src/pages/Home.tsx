import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import { TextWithBadge } from '@core/lib';
import { useGetFirstNPokemonQuery } from 'redux-store';
import { Loading } from 'shared';

const HomePage = () => {
  const { data: pokemonList, isLoading } = useGetFirstNPokemonQuery(10);

  return (
    <div className="root">
      <div style={{ margin: '10px 0px' }}>Hello from the HomePage.</div>
      <div style={{ margin: '10px 0px' }}>
        <p>
          This component exported from
          {' '}
          <b>@core/lib</b>
        </p>
        <TextWithBadge text="Sample Badge Text" badgeVal={5} />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          {pokemonList?.length
            ? pokemonList?.map((pokemon, idx) => (
              <Typography color="primary" key={idx}>
                {pokemon.name}
              </Typography>
            ))
            : 'Unable to fetch pokemons'}
        </Fragment>
      )}
    </div>
  );
};

export default HomePage;
