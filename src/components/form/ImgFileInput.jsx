import { useMutation } from 'react-query';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

// 🌿서버요청용 import
import { request } from "../../utils/axios-utils";
import {AiFillFileAdd} from "react-icons/ai";
import {useMypageRenderStore} from '../store'


// 🌿서버요청용 custom 함수
const addImgFile = async (ImgData) => {
  const response = await request({ url: 'api/upload', method: 'post', data: ImgData });
  console.log('image Upload message',response)
  return response;
};

const ImageUpload = ({ onClose  }) => {

  {/* 🌿 입력된 이미지들을 담는 변수 */}
  const [imgfiles, setImgfiles] = useState([]);
  const [imgMeta, setImgMeta] = useState([]);

  {/* 🌿 response로 받은 tag를 담는 변수 */}
  const [tags, setTags] = useState();

  //usestore로 창이 닫혔는지 전달하는 함수
  const RenderRequest = useMypageRenderStore(state => state.RenderRequest)
  const setRenderRequest = useMypageRenderStore(state => state.setRenderRequest)



  {/* 🌿 입력된 이미지를 post로 보내는 함수 */}
  const mutation = useMutation(addImgFile, {
    onSuccess: (data) => {
      console.log('image upload success');
      setTags(data?.data?.tags); // 응답에서 태그를 설정
      
      //업로드 버튼이 눌려지면 
      if (onClose ) {
          setRenderRequest(!RenderRequest)
      }
        
    },
    onError: (error) => {
      console.log('image upload fail:', error);
    }
  });

  const isLoading = mutation.isLoading; // 로딩 상태 가져오기


  {/* 🌿 input창을 통해 입력된 이미지의 url을 보여주는 함수 */}
  const handleFileInputChange = (e) => {
    setImgfiles(Array.from(e.target.files)); // 배열 형태로 파일들을 저장
    setImgMeta(Array.from(e.target.files).map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    })));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setImgfiles(droppedFiles);
    setImgMeta(droppedFiles.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
    })));
};

const handleDragOver = (e) => {
    e.preventDefault();
};

  const handleUpload = () => {
    const formData = new FormData();
    imgfiles.forEach((file) => {
      formData.append('image', file); // 각 파일을 FormData에 추가
    });
    mutation.mutate(formData);
    onClose (); // Close the modal after upload
  };

  useEffect(() => {
    console.log(imgfiles)
  }, [imgfiles]);

  return (
  <div className="flex justify-center flex-col items-center p-4 shadow-4 rounded-lg w-full h-4/12">
    <h2 className="text-2xl font-semibold pb-4 relative top-0 text-center">사진을 넣어주세요</h2>

    {/* 🌿input창 */}
    <input
      className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
      hidden
      type="file"
      id="formFileMultiple"
      onChange={handleFileInputChange}
      multiple />
      {imgMeta.length > 0 ? (
<Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          borderRadius: '5px',
          position: 'relative', // Add position relative to the Box
          '& > :not(style)': {
            m: 3,
            width: '50%',
            height: 220,
            marginX: 'auto',
            borderRadius: '5px',
          },
        }}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
      >
        <img
          src={imgMeta[0].url}
          alt="Preview"
          className="object-cover cursor-pointer"
          onClick={() => document.getElementById("formFileMultiple").click()}
        />
      </Box>
        ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            '& > :not(style)': {
                width: '100%',
                height: 220,
                marginX: 'auto',
            },
        }}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        >
        <label
            htmlFor="formFileMultiple"
            className="w-full flex flex-col text-black items-center justify-center bg-white shadow-lg tracking-wide border hover:cursor-pointer"
            style={{ fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}
        >
          <AiFillFileAdd className='flex my-auto mx-20' style={{ fontSize: '50px' }}/>

        </label>
    </Box>
    )}

    {/* 🌿 입력된 이미지의 리스트를 보여주는 창 */}
    <div className="w-full h-48 bg-neutral-200 overflow-auto flex flex-col rounded mt-4">
      {imgMeta.map((file, index) => (
        <p className="flex px-2" key={index}>
          {file.name}
        </p>
      ))}
      
    </div>
    {/* 🌿 업로드 버튼 */}
    <div className="flex flex-col mt-4 text-xs items-center">
      <button
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
        onClick={handleUpload}
        className="w-32 inline-block bg-purple-700 rounded bg-primary px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
        업로드
      </button>
    </div>
  </div>
  );
}
export default ImageUpload;