import Head from 'next/head'
import { useState, useEffect } from 'react'
import CameraComponent from '../components/CameraComponent'

const HISTORY_KEY = 'cone_history'
const MAX_HISTORY = 20

export default function Home() {
  const [history, setHistory] = useState([])
  const [tab, setTab] = useState('camera') // 'camera' | 'history'

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
      setHistory(stored)
    } catch {
      setHistory([])
    }
  }, [])

  const handleAnalysisResult = (result) => {
    if (!result || result.startsWith('Failed')) return
    const entry = { result, timestamp: Date.now() }
    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, MAX_HISTORY)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY)
    setHistory([])
  }

  const formatDate = (ts) =>
    new Date(ts).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">
      <Head>
        <title>Stonerific</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 pt-8 pb-6 text-white text-center">
          <h1 className="text-3xl font-bold font-serif tracking-tight">Stonerific</h1>
          <p className="mt-1 text-purple-200 text-sm">Elevate your cone experience</p>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              tab === 'camera'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setTab('camera')}
          >
            Analyze
          </button>
          <button
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              tab === 'history'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setTab('history')}
          >
            History {history.length > 0 && `(${history.length})`}
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {tab === 'camera' ? (
            <>
              <p className="text-center text-gray-500 text-sm mb-4">
                Capture your packed cone and get an AI estimate of its weight and quality.
              </p>
              <CameraComponent onAnalysisResult={handleAnalysisResult} />
            </>
          ) : (
            <div>
              {history.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-10">
                  No analyses yet. Go analyze a cone!
                </p>
              ) : (
                <>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {history.map((entry, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-xs text-gray-400 mb-1">{formatDate(entry.timestamp)}</p>
                        <p className="text-sm text-gray-700 leading-snug">{entry.result}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={clearHistory}
                    className="mt-4 w-full py-2 text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    Clear history
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
