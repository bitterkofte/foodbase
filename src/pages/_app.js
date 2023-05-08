import Layout from '@component/components/Layout'
import { StateProvider } from '@component/context/StateProvider'
import { initialState } from '@component/context/initialState'
import reducer from '@component/context/reducer'
import '@component/styles/globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'] 
})

export default function App({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
      <StateProvider initialState={initialState} reducer={reducer}>
        
        <Layout>
          <Component {...pageProps} />
        </Layout>

      </StateProvider>
    </main>
  )
}
