import React, { useEffect, useState } from 'react'

import { Layout } from '../../components/layouts'
import { Nofavorites } from '../../components/ui'
import { localFavorite } from '../../utils'
import { FavoritePokemons } from '../../components/pokemon'


const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);


  useEffect(() => {
    setFavoritePokemons(localFavorite.pokemons());
  }, [])
  
  return (
    <Layout>

      {
        favoritePokemons.length === 0
        ?<Nofavorites/>
        :<FavoritePokemons pokemons={favoritePokemons}/>
        
      }

    </Layout>
  )
}

export default FavoritesPage
