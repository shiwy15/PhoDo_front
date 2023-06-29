import { useMutation } from 'react-query';
import React, { useState } from 'react';

//서버요청용
import { request } from "../../utils/axios-utils"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {AiFillPicture} from "react-icons/ai";

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
    <div>
        <div className="flex justify-center items-center relative  mx-auto">
            {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-[500]">
                <p className='text-3xl text-yellow-400' aria-labelledby="wave">결과를 가져오고 있어요!🙂</p>
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
                borderRadius : '5px',
                '& > :not(style)': {
                    m: 3,
                    width: '50%',
                    height: 100,
                    marginX : 'auto',
                    borderRadius : '5px',},}}>
        <img
            src={image}
            alt="Preview"
            className="w-32 h-32 object-cover cursor-pointer"
            onClick={() => document.getElementById("imageInput").click()}
        />
        </Box>
    ) : (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                '& > :not(style)': {
                    m: 3,
                    width: '50%',
                    height: 128,
                    marginX : 'auto'
                },
            }}
        >
        <label
            htmlFor="imageInput"
            className="flex text-black items-center justify-center bg-white shadow-lg tracking-wide border hover:cursor-pointer"
            style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <AiFillPicture style={{ fontSize: '50px' }}/>
        </label>
        </Box>

        )}
    </div>
    <Box
    sx={{
        display: 'flex',
        flexWrap: 'nowrap', 
        '& > :not(style)': {
            m: 3,
            width: '50%',
            height: 128,
        },
    }}
>
    <Paper elevation={3}>
    <div className='text-center text-xl font-bold'>태그 결과</div>
    <div className='text-lg m-1 px-2'>
        {tags?.map((tag, index) => (
            <span key={index}>{tag} </span>
        ))}
    </div>
</Paper>
<Paper elevation={3}>
    <div className='text-center text-xl font-bold'>카테고리 결과</div>
    <div className='text-lg m-1 px-2'>
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