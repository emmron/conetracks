import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Check if TailwindCSS's screen is 'ios'
    const handleResize = () => {
      if (window.innerWidth <= 375) {
        document.documentElement.classList.add('ios')
      } else {
        document.documentElement.classList.remove('ios')
      }
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [router.pathname]) // Re-run on route change

  return <Component {...pageProps} />
}

export default MyApp
