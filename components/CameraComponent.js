import React, { useState, useRef } from 'react';

const CameraComponent = ({ onAnalysisResult }) => {
  const [image, setImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setAnalysisResult('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    setLoading(true);
    setAnalysisResult('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: image }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze image');
      }

      setAnalysisResult(data.analysis);
      if (onAnalysisResult) onAnalysisResult(data.analysis);
    } catch (error) {
      console.error('Error submitting image for analysis:', error);
      const errMsg = 'Failed to analyze image. Please try again.';
      setAnalysisResult(errMsg);
      if (onAnalysisResult) onAnalysisResult(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setAnalysisResult('');
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="p-4">
      {!image ? (
        <label className="block">
          <span className="sr-only">Choose or capture an image</span>
          <input
            type="file"
            className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-500 file:text-white
            hover:file:bg-blue-700"
            accept="image/*"
            capture="environment"
            onChange={handleCapture}
            ref={fileInputRef}
          />
        </label>
      ) : (
        <div className="mb-4">
          <img src={image} alt="Captured cone" className="max-w-full h-auto rounded-lg mb-3" />
          <div className="flex gap-2 justify-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze Cone'}
            </button>
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 transition duration-300"
              onClick={handleReset}
              disabled={loading}
            >
              Retake
            </button>
          </div>
          {analysisResult && (
            <div className="mt-4 p-4 bg-white rounded shadow text-left">
              <h3 className="text-lg font-semibold mb-1">Analysis Result:</h3>
              <p className="text-sm text-gray-700">{analysisResult}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
