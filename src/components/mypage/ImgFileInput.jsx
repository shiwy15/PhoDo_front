import { Link } from 'react-router-dom'
import { useMutation } from 'react-query';
import React, { useState } from 'react';

//서버요청용
import { request } from "../../utils/axios-utils"

const addImgFile = async (ImgData) => {
  const response = await request({ url: 'api/upload', method: 'post', data: ImgData });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

function ImageUpload() {
  const [image, setImage] = useState('');
  const [file, setFile] = useState(null);
  const mutation = useMutation(addImgFile);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);
    mutation.mutate(formData, 
      { onSuccess: (data) => {console.log('image upload success:',data);},
        onError: (error) => {console.log('image upload fail:',error)}}
      );
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <label className="flex items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 4a2 2 0 00-2 2v4a2 2 0 104 0V6a2 2 0 00-2-2zm0 12a6 6 0 01-6-6h2a4 4 0 108 0h2a6 6 0 01-6-6z" />
        </svg>
        <span className="ml-2 text-base leading-normal">Select a file</span>
        <input type='file' className="hidden" accept="image/*" onChange={handleImageChange} />
      </label>
      {image && <img src={image} alt="Preview" className="w-32 h-24 object-cover" />}
      <button onClick={handleUpload} className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-700 relative bottom-0 left-0 right-0">Upload</button>
    </div>
  );
}

export default ImageUpload;