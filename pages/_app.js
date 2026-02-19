import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 375) {
        document.documentElement.classList.add('ios')
      } else {
        document.documentElement.classList.remove('ios')
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
