import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//http통신용 import
import { useMutation, useQuery } from 'react-query';
import { request } from "../../utils/axios-utils"

//custom hook
import useFormatDate from '../../hooks/useFormatDate';

//css용 import // Initialization for ES Users
import {
    Input,
    Ripple,
    initTE,
} from "tw-elements";

import Datepicker from "react-tailwindcss-datepicker"; 

//custom function
const fetchGallery = () => {
    return request({ url: 'api/gallery' });
}

const postActiveTags = (activeTags) => {
    return request({ url: 'api/galleryTags', method: 'POST', data: { tags: activeTags } });
}


const GalleryBox = () => {
    {/* 🌿 사용 변수들- tag btns 관련 */}
    const buttonList = ['마케팅', '건설', '비즈니스', '화학', '에너지', '자재/장비', '운송', '과학', '컴퓨터', '재무', '통신', '직업/교육', '뉴스', '사회', '레퍼런스', '기타'];
    const [activeBtns, setActiveBtns] = useState({})
    {/* 🌿 사용 변수들- 이미지 입력 관련 */}   
    const [imagesData, setImagesData] = useState(null);
    const formatData = useFormatDate();
    {/* 🌿 사용 변수들- 닐찌 입력 관련 */}  
    const [value, setValue] = useState({ 
    startDate: null, 
    endDate: null 
    }); 

    const handleValueChange = (newValue) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
    }


    {/* 🌿 get */}
    const { data: initialData, isLoading, isError, error } = useQuery('imagesQuery', fetchGallery);

    {/* 🌿 post */}
    const mutation = useMutation(postActiveTags, {
        onSuccess: (data) => {
            console.log('activeButtons post success', data);
            setImagesData(data);
        },
        onError: (error) => {
            console.log('activeButtons post fail', error);
        }
    });


    const tagBtnClick = (tag) => {
        console.log('activeBtns',activeBtns);
        setActiveBtns(prevState => {
            const newState = { ...prevState, [tag]: !prevState[tag] };
            const activeBtns = Object.keys(newState).filter(key => newState[key]);
            mutation.mutate(activeBtns);
            return newState;
        });
    };


    useEffect(() => {
        initTE({ Ripple, Input });

    },[]);

    if(isLoading) {return <h2>Loading...</h2>}
    if(isError) {return <h2>{error.message}</h2>}
    /* ---------------------------------------------------------------------------------- */
    return (
    <div className='mx-4 my-2'>
        {/* 🌿 제목 및 '새프로젝트 버튼' 구간*/}
        <div className='flex flex-wrap mt-16 m-2 p-4 justify-between'>
            <p className='tracking-tight text-3xl text-purple-800 font-semibold'>My Gallery </p>
             <Link to="/newproject">
                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="inline-block bg-purple-700 rounded bg-primary mr-8 px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        새 프로젝트
                    </span>
                </button>
            </Link>
        </div>
        {/* 🌿 태그 버튼 mapping 구간1 */}
        <div className="mx-4 mb-4 flex items-center justify-center">
            <div
            className=" overflow-x-auto min-w-fit inline-flex font-extrabold text-purple-800 rounded-md shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
            role="group">
                <button
                type="button"
                onclick={tagBtnClick}
                className="inline-block min-w-fit font-extrabold rounded-l text-inherit bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                data-te-ripple-init
                data-te-ripple-color="light">
                {buttonList[0]}
                </button>
                {buttonList.slice(1, 7).map((btn) => (
                <button
                    key={btn}
                    type="button"
                    className="inline-block min-w-fit text-inherit bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    {btn}
                </button>
                ))}
                <button
                    type="button"
                    className="inline-block min-w-fit text-inherit rounded-r bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    {buttonList[7]}
                </button>
            </div>
        </div>
        {/* 🌿 태그 버튼 mapping 구간2 */}
        <div className="mx-4 mb-4 flex items-center justify-center">
            <div
            className=" overflow-x-auto inline-flex font-extrabold text-purple-800 rounded-md shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
            role="group">
                <button
                type="button"
                className="button-className min-w-fit inline-block font-extrabold rounded-l text-inherit bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                data-te-ripple-init
                data-te-ripple-color="light">
                {buttonList[9]}
                </button>
                {buttonList.slice(10, 16).map((btn) => (
                <button
                    key={btn}
                    type="button"
                    className="button-className min-w-fit inline-block text-inherit bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    {btn}
                </button>
                ))}
                <button
                    type="button"
                    className="button-className min-w-fit inline-block text-inherit rounded-r bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    {buttonList[17]}
                </button>
            </div>
        </div>
        {/*🌿 달력 입력 및 입력,초기화 버튼 구간*/}
        <div className='bg-gray-100 p-4 justify-between flex mx-4'>
            <div className='w-80 border-violet-800 border-1 rounded-sm ml-8'>
                <Datepicker 
                    value={value} 
                    onChange={handleValueChange} 
                />
            </div>
            <div>
                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="mx-4 inline-block bg-purple-700 rounded bg-primary px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <span className="flex items-center">
                        apply
                    </span>
                </button>

                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="mx-4 mr-10 inline-block bg-purple-700 rounded bg-primary px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <span className="flex items-center">
                        init
                    </span>
                </button>
            </div>
        </div>
        {/*🌿이미지 갤러리 창*/ }
        <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div class="-m-1 flex flex-wrap md:-m-2">
            <div class="flex w-1/3 flex-wrap">
            <div class="w-full p-1 md:p-2">
                <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
            </div>
            </div>
            <div class="flex w-1/3 flex-wrap">
            <div class="w-full p-1 md:p-2">
                <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp" />
            </div>
            </div>
            <div class="flex w-1/3 flex-wrap">
            <div class="w-full p-1 md:p-2">
                <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp" />
            </div>
            </div>
            <div class="flex w-1/3 flex-wrap">
            <div class="w-full p-1 md:p-2">
                <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
            </div>
            </div>
            <div class="flex w-1/3 flex-wrap">
            <div class="w-full p-1 md:p-2">
                <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp" />
            </div>
            </div>
            <div class="flex w-1/3 flex-wrap">
            <div class="w-full p-1 md:p-2">
                <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp" />
            </div>
            </div>
        </div>
        </div>
    </div>

    );
};

export default GalleryBox;