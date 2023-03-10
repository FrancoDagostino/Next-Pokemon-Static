import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'
import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse } from '../../interfaces'
import { getPokemonInfo, localFavorite } from '../../utils'



interface Props{
  pokemon: Pokemon
 }



const PokemonByNamePage: NextPage<Props> = ({pokemon}) => {

  const [isInFavorites, setIsInFavorites] = useState(localFavorite.existInFavorites(pokemon.id))

  const onToggleFavorite = () => {
    localFavorite.toggleFavorites(pokemon.id)
    setIsInFavorites(!isInFavorites)

    if(isInFavorites) return;

    confetti({
      zIndex:999,
      particleCount:100,
      spread:160,
      angle:-100,
      origin:{
        x:1,
        y:0,
      }
    })
  }
  return (
    <Layout title={pokemon.name}>
        <Grid.Container css={{marginTop:'5px'}} gap={2}>

          <Grid xs={12} sm={4}>
            <Card hoverable css={{padding: '30px'}}>
              <Card.Body>
                <Card.Image
                  src={pokemon.sprites.other?.dream_world.front_default || 'no-image'}
                  alt={pokemon.name}
                  width="100%"
                  height={200}
                />
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12} sm={8}>
            <Card>
              <Card.Header css={{display:'flex',justifyContent:'space-between'}}>
                <Text h1 transform='capitalize'>{pokemon.name}</Text>
                <Button
                  onClick={onToggleFavorite}
                  color="gradient"
                  ghost={!isInFavorites}
                >
                  {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
                </Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}>Sprites:</Text>
                <Container direction='row' display='flex' gap={0}>
                    <Image
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                    <Image
                      src={pokemon.sprites.back_default}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                    <Image
                      src={pokemon.sprites.front_shiny}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                    <Image
                      src={pokemon.sprites.back_shiny}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
    </Layout>
  )
}



export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151',{
    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  });
  const pokemon151 = data.results.map(poke => {
    return poke.name
  })

  return {
    paths: pokemon151.map(name => ({
      params: {name}
    })),
    //fallback: false
    fallback:'blocking',
  }
}




export const getStaticProps: GetStaticProps = async ({params}) => {
  
  
  const {name} = params as {name: string}

  const pokemon = await getPokemonInfo(name.toLowerCase());

  if(!pokemon) return{redirect:{destination:'/',permanent:false}}
  return {
    props: {
      pokemon
    }
  }
}

export default PokemonByNamePage



