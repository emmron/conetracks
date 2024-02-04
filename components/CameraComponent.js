import React, { useState, useRef, useEffect } from 'react';
import OpenAI from "openai";

const CameraComponent = () => {
  const [image, setImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    // This effect could be used for additional setup or teardown logic
  }, []);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageToText = (image) => {
    // Assuming `imageToText` is a function that converts the image to a descriptive text
    // This is a placeholder function, you would need to replace it with the actual implementation
    return new Promise((resolve, reject) => {
      // Placeholder implementation
      resolve('This is a placeholder text description of the image.');
    });
  };

  const handleSubmit = async () => {
    if (!image) return;

    const imageDescription = await imageToText(image); // Convert image to text description

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            "role": "user",
            "content": imageDescription // Use the text description here
          }
        ],
        temperature: 1,
        max_tokens: 4095,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log('Cone Analysis Result:', response.data);
      setAnalysisResult(response.data.choices[0].message.content); // Assuming the API returns a structured response

      // Optionally, handle the response data (e.g., display weight/size of the cone)
    } catch (error) {
      console.error('Error submitting image for analysis:', error);
      setAnalysisResult('Failed to analyze image. Please try again.');
    }

    // Reset the image and clear the file input
    setImage(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        {image ? (
          <div className="mb-4">
            <img src={image} alt="Captured" className="max-w-full h-auto" />
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
              onClick={handleSubmit}
            >
              Analyze Cone
            </button>
            {analysisResult && (
              <div className="mt-4 p-4 bg-white rounded shadow">
                <h3 className="text-lg font-semibold">Analysis Result:</h3>
                <p>{analysisResult}</p>
              </div>
            )}
          </div>
        ) : (
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-500 file:text-white
              hover:file:bg-blue-700"
              accept="image/*"
              onChange={handleCapture}
              ref={fileInputRef}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;