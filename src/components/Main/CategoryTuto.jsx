import { useMutation } from 'react-query';
import React, { useState } from 'react';

//서버요청용
import { request } from "../../utils/axios-utils"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { AiFillFileAdd } from "react-icons/ai";

import preImage from '../../Assets/pre.svg'

const addImgFile = async (image) => {
    console.log('image:', image)
  const response = await request({ url: 'api/test', method: 'post', data: image });
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
        try {
            setImage(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0]);
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            mutation.mutate(formData);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

  return (
    <div>
        <div className="flex justify-center items-center relative  mx-auto">
            {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-[500]">
                <img src={preImage} alt="preparing" />
                <p>잠시만 기다려 주세요</p>
            </div>
            )}
        <input
            type="file"
            hidden
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            
        />
    {image ? (
<Box
    sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        borderRadius: '5px',
        height: '208px', // Box의 높이를 고정값으로 설정
        '& > :not(style)': {
            m: 1,
            width: '100%',
            height: '192px', // 이미지의 높이를 고정값으로 설정
            marginX: 'auto',
            borderRadius: '5px',
        },
    }}
>
    <img
        src={image}
        alt="Preview"
        className="w-48 h-48 cursor-pointer"
        style={{ objectFit: 'contain', height: '192px' }} // object-fit을 contain으로 설정하고 높이를 고정값으로 설정
        onClick={() => document.getElementById("imageInput").click()}
    />
</Box>
    ) : (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                '& > :not(style)': {
                    width: '100%',
                    height: 192,
                    marginX : 'auto'
                },
            }}
        >
        <label
            htmlFor="imageInput"
            className="w-full flex  flex-col text-black items-center justify-center bg-white shadow-lg tracking-wide border hover:cursor-pointer"
            style={{ fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}
        >
            <AiFillFileAdd className='flex my-auto mx-20' style={{ fontSize: '50px' }}/>
        </label>
        </Box>

        )}
    </div>
        <Box
        sx={{
            display: 'flex',
            flexWrap: 'nowrap', 
            '& > :not(style)': {
                m : 2,
                width: '50%',
                height: 105,
            },
        }}
    >
    <Paper elevation={3} style={{ height: '170px' }}>
        <div className='text-center text-xl font-bold m-1'>태그 결과</div>
        <div className='relative text-md mx-1 px-2' style={{ height: '80px', overflowY: 'auto', paddingY : '2px' }}>
            {tags?.map((tag, index) => (
                <span key={index}>{tag} </span>
            ))}
        </div>
    </Paper>
    <Paper elevation={3} style={{ height: '170px' }}>
        <div className='text-center text-xl font-bold m-1'>카테고리 결과</div>
        <div className='text-md mx-1 px-2' style={{ height: '80px', overflowY: 'auto' }}>
            {category?.map((cate, index) => (
                <span key={index}>{cate} </span>
            ))}
        </div>
    </Paper>
    </Box>




  </div>
  );
}
export default CategoryTuto;