import React, { useState } from 'react';

function ImageUpload() {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFolderChange = (e) => {
    if (e.target.files) {
      let imgs = Array.from(e.target.files);
      setSelectedImages(imgs.map(img => URL.createObjectURL(img)));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label 
        className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white"
      >
        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 4a2 2 0 00-2 2v4a2 2 0 104 0V6a2 2 0 00-2-2zm0 12a6 6 0 01-6-6h2a4 4 0 108 0h2a6 6 0 01-6 6z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Select a folder</span>
        <input type='file' className="hidden" webkitdirectory="true" multiple onChange={handleFolderChange} />
      </label>
      {selectedImages.map((image, index) => (
        <img key={index} src={image} alt={`Preview ${index}`} className="w-64 h-64 object-cover mt-4" />
      ))}
    </div>
  );
}

export default ImageUpload;

