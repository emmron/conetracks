import Head from 'next/head'
import { useState } from 'react'
import CameraComponent from '../components/CameraComponent'

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState('')

  const handleAnalysisResult = (result) => {
    setAnalysisResult(result)
  }

  return (
    <div className="ios:min-h-screen ios:bg-gray-100 ios:flex ios:flex-col ios:items-center ios:justify-center ios:py-2">
      <Head>
        <title>Aus Stoner App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center w-full flex-1 text-center px-4 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-inner">
        <h1 className="text-5xl font-bold mb-5 text-white font-serif">
          Stonerific
        </h1>
        <div className="mb-5"></div>
        <h2 className="text-2xl font-semibold mb-5 text-white font-serif">
          Elevate your cone experience
        </h2>
        <p className="mb-6 text-lg text-white font-sans">Ready to enhance your cone experience? Capture an image of your packed cone and let us estimate its weight/size.</p>
        <div className="w-full max-w-xs mb-8">
          <CameraComponent onAnalysisResult={handleAnalysisResult} />
        </div>
        {analysisResult && (
          <div className="mt-10 p-5 bg-white rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Cone Analysis Result:</h2>
            <p className="text-md text-gray-700">{analysisResult}</p>
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
