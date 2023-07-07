import React, {useState, useEffect } from 'react';
import { request } from "../../../utils/axios-utils"
import { useMutation, useQuery } from 'react-query';
// 🌿 css용 import 
import {
    Input,
    Ripple,
    initTE,
} from "tw-elements";
import Datepicker from "react-tailwindcss-datepicker"; 


/** 이미지 출력용 import **/
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

//Menubar container
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';


// 🌿 custom hook
import useFormatDate from "../../../hooks/useFormatDate";


const fetchGallery = () => {
  return request({ url: 'api/gallery' });
}

const postApply = (datas) => {
    console.log('datas', datas)
    return request({ url:'/api/galleryTags' , method: 'POST', data: datas, headers: { 'Content-Type': 'application/json' } });
}

const ImageBox = () => {
  {/* 🌿 사용 변수들- categories btns 관련 */}
  // const buttonList = ['마케팅', '건설/토목', '비즈니스', '화학', '에너지', '자재/장비', '운송', '과학', '컴퓨터', '재무', '통신', '직업/교육', '뉴스', '사회', '레퍼런스', '기타'];
  const [activeBtns, setActiveBtns] = useState({})  
  const [buttonGroups, setButtonGroups] = useState([]);

  {/* 🌿 사용 변수들- 날짜 입력 관련 */}  
  const [dates, setDates] = useState({ startDate: null, endDate: null }); 
  const formatData = useFormatDate();

  {/* 🌿 갤러리에 입력되는 데이터 hook */}
  const [images, setImages] = useState([]);

  {/* 🌿 get */}
  const { data: initialData, isLoading, isError, error } = useQuery('imagesQuery', fetchGallery, {
    onSuccess: (data) => {
        setImages(data);
        console.log('from /gallery', data);
    }
    });

  {/* 🌿 post */}
  const mutationApply = useMutation(postApply, {
      onSuccess: (data) => {
          console.log('post success', data);
          setImages(data);
      },
      onError: (error) => {
          console.log('post fail', error);
      }
  });

  //이미지 박스 고해상도가 됐는지 log하는 hook
  const [highResLoaded, setHighResLoaded] = useState({});

  const loadImage = (thumbUrl, imageUrl, imageId) => {
    let imageSrc = thumbUrl;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
      if (connection.effectiveType === '4g') {
        // If high-res image hasn't been loaded yet, update image source
        if (!highResLoaded[imageId]) {
          imageSrc = imageUrl;
          setHighResLoaded(prevState => ({ ...prevState, [imageId]: true }));
        }
      }
    }
    
    return highResLoaded[imageId] ? imageUrl : imageSrc;
  }

  {/* 🌿 사용 변수들- 닐짜 입력 관련 함수 */}  
  const handleValueChange = (newValue) => {
  console.log("newValue:", newValue);
  setDates({ startDate: newValue.startDate, endDate: newValue.endDate });
  }

  {/*🌿 태그 버튼이 눌리면  activeBtns 상태 변화 */}
  const tagBtnClick = (categories) => {
    setActiveBtns((prevState) => {
      const newState = { ...prevState, [categories]: !prevState[categories] };
      const activeBtns = Object.keys(newState).filter((key) => newState[key]);
      console.log('activeBtns', activeBtns);
      return newState;
    });
  };

  {/* 🌿 apply 버튼 클릭 -> post 보내는 함수 */}
  const applyBtn = () => {
    const datas = { tags : Object.keys(activeBtns), startDate: dates.startDate, endDate: dates.endDate};
    console.log('post sending:', datas);
    mutationApply.mutate(datas);
  };

  {/* 🌿 init 버튼 클릭 -> 변수들 초기화 하는 함수 */}
  const initBtn = () => {
    setActiveBtns({});
    setImages(initialData);
    setDates({ startDate: null, endDate: null });
  }

  useEffect(() => {
     initTE({ Ripple, Input });

  }, [ images]);

  const onDragStart = (event, nodeType, imageURL, tags) => {    
    console.log('🌸before drag event: ', event.dataTransfer);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('data/imageurl', imageURL);
    event.dataTransfer.setData('data/tags', tags);
    
    // const afterData = event.dataTransfer.getData('application/reactflow');
    // const afterimg = event.dataTransfer.getData('data/imageurl');
    // const afterTags = event.dataTransfer.getData('data/tags');
    // console.log('🍎 after drag event: ', event.dataTransfer);
    
    // afterData = event.dataTransfer.getData('application/reactflow');
    // const afterimg = event.dataTransfer.getData();
    // console.log('👺 after data: ', afterData);
    // console.log('👺 after data: ', event.dataTransfer);
    // console.log('🌵 after img: ', afterimg);
    // console.log('🌵 afterTags: ', afterTags);
    
    event.dataTransfer.effectAllowed = 'move';
  }

  const onDragThumbStart= (event, nodeType,thumbURL, imageURL, categories) => {    
    console.log('🌸before drag event: ', event.dataTransfer);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('data/thumburl', thumbURL);
    event.dataTransfer.setData('data/imageurl', imageURL);
    event.dataTransfer.setData('data/categories', categories);

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let networkState;
    if (connection) {
      if (connection.effectiveType === '4g') {
        networkState = 'high';
      } else {
        imageURL = thumbURL;
        networkState = 'low';
      }
    }

  // Add network state to the data transfer
  event.dataTransfer.setData('data/networkState', networkState);
  }

  {/* 🌿 카테고리 버튼그룹 매핑 관련 */}
  const buttonGroups2 = [];
  const buttonsPerGroup = 1;

  try {
    for (let i = 0; i < buttonGroups.length; i += buttonsPerGroup) {
      buttonGroups2.push(buttonGroups.slice(i, i + buttonsPerGroup));
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  //using effect!
  useEffect(() => {
    // Fetch data immediately upon mounting
    const fetchData = () => {
      request({
        method: 'get',
        url: '/api/category',
      })
      .then(response => {
        if (response.data !== null) { // checking if data is not null
          setButtonGroups(response.data);
        } else {
          console.log('nothing~')
        }
      })
      .catch(error => {
        console.error('There was an error retrieving the data!', error);
      });
    };
    fetchData(); // initial fetch
  
    // Fetch data every 30 seconds
    const intervalId = setInterval(fetchData, 10000);
  
    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      {/* sidebar css 부분 */}
      <Paper sx={{     
        width: 420,
        height: '100vh',
        backgroundColor: 'rgba(255,255,255,0.5)',
        paddingBottom: '30px',

        top: 0,
        bottom: 0,
        color: 'rgb(255,255,255)',
        overflow: 'auto'
      }}>

      <MenuList dense>
        {/* 🌿 Edit box제목 */}
        <h2 className="text-3xl mt-1 font-bold relative top-0 text-center text-violet-900">이미지 박스</h2>
        {/* 🌸 구분선 */}
      <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white', borderBottom: '2px solid' }} />
        {/* 🌿 카테고리 버튼 리스트 */}
        <div className="text-2xl font-bold ml-5 mt-2 mb-1 text-violet-900 p-1 rounded-lg ">
          카테고리</div>
        {/* 🌿 태그 버튼 mapping 구간 */}
        <div className='flex items-center justify-center flex-wrap'>
          {buttonGroups2.map((group, groupIndex) => (
            <div key={groupIndex} className="mx-1 flex items-center justify-start">
                {group.map((btn, btnIndex) => (
                  <button
                    key={btnIndex}
                    type="button"
                    onClick={() => tagBtnClick(btn)}
                    className="whitespace-nowrap inline-block font-sans font-semibold rounded-full mb-2 bg-neutral-50 px-6 pb-1 pt-1.5 text-md leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    #{btn}
                  </button>
                ))}
              </div>
            ))}
            </div>
          {/*🌿 달력 입력 및 입력,초기화 버튼 구간*/}
          <div className='w-54 mt-2 mb-16'>
            <Datepicker 
              containerClassName='datepicker-style w-80 h-12 ml-12'
              value={dates}
              popoverDirection="down" 
              onChange={handleValueChange} 
            />
          </div>
          <div className="flex justify-center mt-1">
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={applyBtn}
              className=" mx-4 my-1 inline-block bg-purple-700 rounded px-6 py-2 text-lg font-medium uppercase leading-normal text-white ">
              <span className="flex items-center">
                검색
              </span>
            </button>
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={initBtn}
              className=" mx-4 my-1 inline-block bg-purple-700 rounded px-6 py-2 text-lg font-medium uppercase leading-normal text-white ">
              <span className="flex items-center">
                초기화
              </span>
            </button>
          </div>
          {/* 🌸 구분선 */}
          <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white', borderBottom: '2px solid' }} />
          {/* 🌸 이미지 모아볼 수 있는 미니 갤러리 */}
          <div className="text-2xl font-bold ml-5 mt-2 text-violet-900 p-1 rounded-lg ">
          이미지 노드 <p className='text-lg'>편집창에 끌어다 놓아보세요!</p></div>
          <ImageList cols={2} gap={8} sx={{ paddingLeft: '25px', paddingRight: '25px', marginBottom: '18px', overflow:'hidden'}}>
            {images && images?.data?.map((image, index) => {
              const imgSrc = loadImage(image.thumbnailUrl, image.url, image.id);
              return (
                <ImageListItem key={image.id}>
                  <img 
                    src={`${imgSrc}?w=248&fit=crop&auto=format`}
                    className="imgNode max-h-24 rounded-lg"
                    loading="lazy"
                    onDragStart={(event) => onDragThumbStart(event, 'LazyPicNode',image.thumbnailUrl, image.url, Object.values(image.categories))}
                    draggable
                    alt="Gallery Item" />
                  <div className='text-violet-900 max-h-6 mb-3' style={{ fontSize: '18px', padding:'2px'}}>
                    {Object.values(image.categories).slice(0, 2).map((category, index) => {
                      return (
                        <button
                        key={index}
                        type="button"
                        className="overflow-x-auto mx-1 ml-4 my-0.5 mb-4 border-b-1 tracking-tight text-s text-black font-semibold inline-flex min-w-fit rounded-full text-inherit bg-neutral-50 px-2 py-1 text-sm uppercase leading-normal  transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                        #{category}
                    </button>
                        );
                    })}
                  </div>
                </ImageListItem>
              )
            })}
          </ImageList>
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
        {/* <MenuItem style={{display: 'flex', justifyContent: 'center'}}>
          <div className="TextNode inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
          onDragStart={(event) => onDragStartDefault(event, 'TextNode')} draggable>
            Text Node
          </div>
        </MenuItem>  
            <Nodechangebar/> */}
        </MenuList>
        </Paper>
    </div>
  );
};
export default ImageBox;