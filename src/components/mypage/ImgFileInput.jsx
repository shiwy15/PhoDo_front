import { useMutation } from 'react-query';
import React, { useEffect, useState } from 'react';

// 🌿서버요청용 import
import { request } from "../../utils/axios-utils";

// 🌿서버요청용 custom 함수
const addImgFile = async (ImgData) => {
  const response = await request({ url: 'api/upload', method: 'post', data: ImgData });
  console.log(response?.data?.tags);
  return response;
};

const ImageUpload = () => {
  {/* 🌿 입력된 이미지들을 담는 변수 */}
  const [imgfiles, setImgfiles] = useState([]);
  const [imgMeta, setImgMeta] = useState([]);

  {/* 🌿 response로 받은 tag를 담는 변수 */}
  const [tags, setTags] = useState();

  {/* 🌿 입력된 이미지를 post로 보내는 함수 */}
  const mutation = useMutation(addImgFile, {
    onSuccess: (data) => {
      console.log('image upload success');
      setTags(data?.data?.tags); // 응답에서 태그를 설정
    },
    onError: (error) => {
      console.log('image upload fail:', error);
    }
  });

  {/* 🌿 input창을 통해 입력된 이미지의 url을 보여주는 함수 */}
  const handleFileInputChange = (e) => {
    setImgfiles(Array.from(e.target.files)); // 배열 형태로 파일들을 저장
    setImgMeta(Array.from(e.target.files).map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    })));
  };

  {/* 🌿 upload버튼 함수 : mutation실행 */}
  const handleUpload = () => {
    const formData = new FormData();
    imgfiles.forEach((file) => {
      formData.append('image', file); // 각 파일을 FormData에 추가
    });
    mutation.mutate(formData);
  };

  useEffect(() => {
    console.log(imgfiles)
  }, [imgfiles]);

  return (
  <div className="p-4 shadow-4 rounded-lg w-full m-4 h-80" style={{ backgroundColor: 'hsl(0, 0%, 94%)' }}>
    <h2 className="text-2xl font-semibold pb-6 relative top-0 text-center">Input your Photo</h2>
    {/* 🌿input창 */}
    <div className="mb-3">
      <label 
        hidden
        htmlFor="formFileMultiple"
        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
        ></label>
      <input
        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
        type="file"
        id="formFileMultiple"
        onChange={handleFileInputChange}
        multiple />
    </div>
    {/* 🌿 입력된 이미지의 리스트를 보여주는 창 */}
    <div className="w-full h-24 bg-neutral-200 overflow-auto flex flex-col">
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
        className="w-32 inline-block bg-purple-700 rounded bg-primary px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
        Upload
      </button>
    </div>
  </div>
  );
}
export default ImageUpload;