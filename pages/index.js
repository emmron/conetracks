import Head from 'next/head'
import { useState } from 'react'
import CameraComponent from '../components/CameraComponent'
import { analyzeImage } from '../utils/gptApi'

export default function Home() {
  const [result, setResult] = useState('')

  const handleImageCapture = async (imageData) => {
    try {
      const analysisResult = await analyzeImage(imageData)
      setResult(analysisResult)
    } catch (error) {
      console.error('Error analyzing image:', error)
      setResult('Failed to analyze image. Please try again.')
    }
  }

  return (
    <div className="ios:min-h-screen ios:bg-gray-100 ios:flex ios:flex-col ios:items-center ios:justify-center ios:py-2">
      <Head>
        <title>Aus Stoner App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="ios:flex ios:flex-col ios:items-center ios:w-full ios:flex-1 ios:text-center">
        <h1 className="ios:text-2xl ios:font-bold ios:mb-4">
          Welcome to the Aus Stoner App
        </h1>
        <p className="ios:mb-5">Take a photo of your packed cone to estimate its weight/size.</p>
        <CameraComponent onCapture={handleImageCapture} />
        {result && (
          <div className="ios:mt-5 ios:p-3 ios:bg-white ios:rounded-lg ios:shadow-md">
            <p className="ios:text-lg">Analysis Result:</p>
            <p>{result}</p>
          </div>
        )}
      </main>

      <footer className="ios:flex ios:items-center ios:justify-center ios:w-full ios:h-24 ios:border-t">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="ios:flex ios:items-center ios:justify-center"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="ios:h-4 ios:ml-2" />
        </a>
      </footer>
    </div>
  )
}
