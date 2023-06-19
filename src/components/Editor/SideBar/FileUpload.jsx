import React, { useState, useRef } from 'react';
import { useMutation } from 'react-query'; 
import { request } from "../../../utils/axios-utils";

//mui 관련 import
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import UploadIcon from '@mui/icons-material/Upload';

//이미지 DB전송용 http:post 함수
const addImgFile = async (ImgData) => {
  return await request({ url: 'api/upload', method: 'POST', data: ImgData,
    headers: {'Content-Type': 'multipart/form-data'} })};

//해당 파일 호출 시 실행되는 함수
const ImageUpload = () => {
  const fileInputRef = useRef(null);
  //input된 이미지 파일을 담는 변수 및 변형함수, 초기는 null값
  const [file, setFile] = useState(null);
  //addImgFile이 실행된 후 받은 response가 담긴 변수
  const mutation = useMutation(addImgFile,file);

  //이미지가 input되면 실행되는 함수: setFile을 통해 file을 가져옴.
  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    //FormData는 서버로 쉽게 전송해주도록 객체 생성. key-value값 포함.
    const formData = new FormData();
    //선택한 이미지 파일(file)을 'image'라는 키와 함께 추가
    formData.append('image', file);
    //mutate 메서드를 호출하여 뮤테이션(여기서는 이미지 업로드)을 실행
    mutation.mutate(formData);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
  <div>
    <div className='flex justify-center space-x-4 p-3'>
      <Paper component="form" sx={{ p: '2px', display: 'flex', width: 400, justifyContent: 'space-between' }}>
        <InputBase
          inputRef={fileInputRef}
          sx={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button onClick={handleFileInputClick} style={{ width: '200px' }}>Input your Photo</button>
        <IconButton
          type="button"
          sx={{ p: '5px', boxSizing: 'content-box', border: 'solid 1px gray' }}
          aria-label="search"
          onClick={handleUpload}
        >
          <UploadIcon />
        </IconButton>
      </Paper>
    </div>
  </div>


  );
};

export default ImageUpload;