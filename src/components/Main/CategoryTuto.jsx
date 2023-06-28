import { useMutation } from 'react-query';
import React, { useState } from 'react';
import styled from 'styled-components'
//서버요청용
import { request } from "../../utils/axios-utils"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const addImgFile = async (image) => {
  const response = await request({ url: 'api/test', method: 'post', data: image });
  console.log(response?.data?.tags);
  console.log(response?.data?.category)
  return response;
}

const CategoryTuto =() => {
  const [image, setImage] = useState('');  //미리보여주기용
  const [file, setFile] = useState(null); //사진데이터 전송용
  const [tags, setTags] = useState(null); // 추가된 상태 변수
  const [category, setCategory] = useState(null);

  const mutation = useMutation(addImgFile, {
    onSuccess: (data) => {
        console.log('image upload success');
        setTags(data?.data?.tags);
        setCategory(data?.data?.category); 
        },
        onError: (error) => {
        console.log('image upload fail:', error);
        },
    });

    const isLoading = mutation.isLoading; // 로딩 상태 가져오기


  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append('image', file);
    mutation.mutate(formData);
  };

  return (
  <div className="p-4 shadow-4 rounded-3xl m-4" style={{ backgroundColor: 'hsl(0, 0%, 94%)' }}>
<div className="flex justify-center items-center h-96 w-1/2 relative overflow-hidden mx-auto">
                    {/* 로딩 아이콘 추가 */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-[500]">
                        <p className='text-3xl text-yellow-400'>결과를 가져오고 있어요!🙂</p>
                    </div>
                )}
    <input
        type="file"
        className="hidden"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
    />
    {image ? (
        // 이미지를 부모 요소의 높이에 맞게 채움
        <img
            src={image}
            alt="Preview"
            className="h-full w-full object-cover cursor-pointer"
            onClick={() => document.getElementById("imageInput").click()}
        />
    ) : (
        // div를 부모 요소의 높이로 채움
        <label htmlFor="imageInput" className="flex flex-col items-center justify-center h-full w-full bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue hover:bg-blue hover:text-white cursor-pointer">
            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 4a2 2 0 00-2 2v4a2 2 0 104 0V6a2 2 0 00-2-2zm0 12a6 6 0 01-6-6h2a4 40 108 0h2a6 6 0 01-6-6z" />
            </svg>
            <span className="ml-2 text-2xl leading-normal">
                사진을 넣어보세요!
            </span>
        </label>
    )}
</div>
<Box
    sx={{
        display: 'flex',
        flexWrap: 'nowrap', // 변경된 부분
        '& > :not(style)': {
            m: 3,
            width: '50%',
            height: 128,
        },
    }}
>
    <Paper elevation={3}>
    <div>태그 결과</div>
    <div className='text-lg m-1 px-2'>
        {tags?.map((tag, index) => (
            <span key={index}>{tag} </span>
        ))}
    </div>
</Paper>
<Paper elevation={3}>
    <div>카테고리 결과</div>
    <div className='text-lg m-1 px-2'>
        {category?.map((cate, index) => (
            <span key={index}>{cate} </span>
        ))}
    </div>
</Paper>

\</Box>




  </div>
  );
}
export default CategoryTuto;