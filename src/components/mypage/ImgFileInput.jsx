import { useState } from 'react'
import { Link } from 'react-router-dom'

//서버요청용
import { request } from "../../utils/axios-utils"

const addImgFile =(ImgData) => {
    return request( { url: '/img', method: 'post', data: ImgData })
}

export const ImgFileInput = () => {
  const [image, setImage] = useState('');
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

   try {
      const response = await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
      <input type='file' className="hidden" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Preview" className="w-40 h-32 object-cover" />}
      <button onClick={handleUpload} className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-700 relative bottom-0 left-0 right-0">Upload</button>
    </>
  )
}
