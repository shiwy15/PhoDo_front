import React, { useState } from 'react';
import { useMutation } from 'react-query'; 
import { request } from "../../utils/axios-utils";

//이미지 DB전송용 http:post 함수
const addImgFile = async (ImgData) => {
  return request({ url: 'api/upload', method: 'POST', data: ImgData })
};

//해당 파일 호출 시 실행되는 함수
const ImageUpload = ({ImgData}) => {
  //input된 이미지 파일을 담는 변수 및 변형함수, 초기는 null값
  const [file, setFile] = useState(null);

  //addImgFile이 실행된 후 받은 response가 담긴 변수
  const mutation = useMutation(addImgFile);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);
    mutation.mutate(formData);
  };

  return (
    <div>
        <h2 className="text-2xl font-semibold pb-6 relative top-0">Input your Photo</h2>
        <div className='flex justify-center space-x-4'>

        </div>
    </div>
  );
};

export default ImageUpload;