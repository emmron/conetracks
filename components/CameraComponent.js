import React, { useState, useRef } from 'react';

const CameraComponent = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

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

  const handleSubmit = async () => {
    if (!image) return;
    // Here you would typically send the image to your backend or directly to the GPT-4-Turbo API
    // For demonstration, we'll just log the image data
    console.log('Submitting image:', image);
    // Reset the image
    setImage(null);
    // Clear the file input
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
              Submit
            </button>
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
</span>