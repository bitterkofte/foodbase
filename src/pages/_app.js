import Layout from '@component/components/Layout'
import { StateProvider } from '@component/context/StateProvider'
import { initialState } from '@component/context/initialState'
import reducer from '@component/context/reducer'
import '@component/styles/globals.css'
import { Poppins, Raleway, Josefin_Sans, Outfit } from 'next/font/google'
// import { Raleway } from 'next/font/google'

const poppins = Poppins({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'] 
})

const raleway = Raleway({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'] 
})

const josefin = Josefin_Sans({ 
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'] 
})

const outfit = Outfit({ 
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'] 
})

export default function App({ Component, pageProps }) {
  return (
    <main className={outfit.className}>
      <StateProvider initialState={initialState} reducer={reducer}>
        
        <Layout>
          <Component {...pageProps} />
        </Layout>

      </StateProvider>
    </main>
  )
}
