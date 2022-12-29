import { Link, Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import NextLink from 'next/link';
export const Navbar = () => {

    const {theme} = useTheme()
  return (
    <div style={{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'star',
        padding:'0px 50px',
        backgroundColor:theme?.colors.gray900.value
    }}>

        <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="Icono de la aplicacion"
            width={70}
            height={70}
        />

        <NextLink legacyBehavior href="/" >
            <Link>
                <Text color='white' h2>P</Text>
                <Text color='white' h3>okemon</Text>
            </Link>
        </NextLink>
        <Spacer css={{flex:1}}/>

        <NextLink legacyBehavior href="/favorites" passHref>
            <Link>
              <Text color='white'>Favoritos</Text>
            </Link>
        </NextLink>
    </div>
  )
}
