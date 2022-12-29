import { Inter } from '@next/font/google'
import { Button, Card, Grid, Row,Text } from '@nextui-org/react'
import { NextPage,GetStaticProps } from 'next'
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonCard } from '../components/pokemon'
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';


const inter = Inter({ subsets: ['latin'] })

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) => {

  console.log(pokemons);
  return (
      <>
        <Layout title='Listado de Pokemon'>
          <Grid.Container gap={2} justify='flex-start'>
            {
              pokemons.map(pokemon => (
                <PokemonCard key={pokemon.uid} pokemon={pokemon} />
              ))
            }
          </Grid.Container>
        </Layout>
      </>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151',{
    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  });

  const pokemons: SmallPokemon[] = data.results.map((poke,i) => {
    return {
      ...poke,
      uid:i+1,
      img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg` 
    };
  })
  return {
    props: {
      pokemons
    }
  }
}

export default HomePage

