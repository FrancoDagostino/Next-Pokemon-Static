import Head from "next/head"
import { FC, PropsWithChildren } from "react"
import { Navbar } from '../ui';


interface Props extends PropsWithChildren {
    title?: string;
}


const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({children,title}) => {



  return (
    <>
        <Head>
            <title>{title || 'PokemonApp'}</title>
            <meta name="author" content="Franco"/>
            <meta name="description" content={`informacion sobre el pokemon xxxx ${title}`}/>
            <meta name="keywords" content={`${title}, pokemon,pokedex`}/>
            <meta property="og:title" content={`Informacion sobre ${title}`} />
            <meta property="og:description" content={`Esta es la página sobre ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>

        <Navbar/>

        <main style={{
            padding:'0px 20px'
        }}>
            {children}
        </main>
    </>
  )
}
