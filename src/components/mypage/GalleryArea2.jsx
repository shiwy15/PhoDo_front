// eslint-disable-next-line 

import React, { useState, useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import TagModal from './TagModal.jsx';
import ListSubheader from '@mui/material/ListSubheader';


import { Link } from 'react-router-dom';

//서버요청용
import { request } from "../../utils/axios-utils"
import { useMutation, useQuery } from 'react-query'

// 🌿 custom hook
import useFormatDate from '../../hooks/useFormatDate';
import { useDetailStore } from '../store';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Datepicker from "react-tailwindcss-datepicker"; 

// 🌿 css용 import 
import {
    Input,
    Ripple,
    initTE,
} from "tw-elements";

import { HiStar } from 'react-icons/hi';
import {
    AiOutlineUpload,
    AiOutlineRight
} from "react-icons/ai";

//컴포넌트 import
import ImgFileInput from '../form/ImgFileInput';

import {useMypageRenderStore} from '../store.js';

const uploadStyle = {
    zIndex: 500,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px', // border radius를 10px로 설정
};

//🌿custom function
const fetchGallery = () => {return request({ url: 'api/gallery' });}

const postApply = (datas) => {
    console.log('datas', datas)
    return request({ url:'/api/galleryTags' , method: 'POST', data: datas, headers: { 'Content-Type': 'application/json' } });
}

const postDelte = (datas) => {
    console.log('datas', datas)
    return request({ url:'/api/galleryDelete' , method: 'POST', data: datas, headers: { 'Content-Type': 'application/json' } });
}

const fetchProject = () => {
  return request({ url: 'project'})
}

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
    marginTop: '64px',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
        marginTop: '64px',

  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
          marginTop: '64px',

    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function GalleryArea2() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    
    {/* 🌿🌿 모달 관련 변수들 */}
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const openModal = (image) => {
        setSelectedImage(image)
        setShowModal(showModal=> !showModal);
    }

    //사진 업로드 완료되면 get한번 더 요청하는 store
    const renderRequest = useMypageRenderStore(state=> state.renderRequest)

    {/* 🌿 사용 변수들- tag btns 관련 */}
    // 기존 변수들
    // const buttonList = ['마케팅', '건설/토목', '비즈니스', '화학', '에너지', '자재/장비', '운송', '과학', '컴퓨터', '재무', '통신', '직업/교육', '뉴스', '사회', '레퍼런스', '기타'];
    const [buttonList, setButtonList] = useState(null);
    const buttonPerGroup = 8;
    const [buttonGroups, setButtonGroups] = useState([]);

    const [activeBtns, setActiveBtns] = useState({})


    
    //using effect!
    useEffect(() => {
        request({
            method: 'get',
            url: '/api/category',
        })
            .then(response => {
                if (response.data !== null) { // checking if data is not null
                    setButtonList(response.data);
                } else {
                    console.log('nothing~')
                }
            })
            .catch(error => {
                console.error('There was an error retrieving the data!', error);
            });
    }, []);
    
    useEffect(() => {
        if (buttonList) {
          const newButtonGroups = [];
          for (let i = 0; i < buttonList.length; i += buttonPerGroup) {
            newButtonGroups.push(buttonList.slice(i, i + buttonPerGroup));
          }
          setButtonGroups(newButtonGroups);
        }
      }, [buttonList]); // This will run whenever buttonList changes
    


    {/* 🌿 갤러리에 렌더링 되는 데이터  */} 
    const [targetImgData, setTargetImgData] = useState('')

    {/* 🌿 사용 변수들- 닐찌 입력 관련 */}  
    const [dates, setDates] = useState({ startDate: null, endDate: null }); 
    const formatData = useFormatDate();

    {/* 🔴 사용 변수들- 중복선택 관련 , 사진 제거 관련 -> imgID기반 */}
    const [selectedImages, setSelectedImages] = useState([]);

    {/* 🔴  제일 최근에 클릭한 이미지가 detailshow에 보이도 도록 하는 hook*/}
    const selectRef = useRef();
    const detailTransfer = useDetailStore(state => state.changeRCImg);
    
    const [ImgUploadOpen, setImgUploadOpen] = useState(false);
    const imgUploadHandleOpen = () => setImgUploadOpen(true);
    const imgUploadHandleClose = () => setImgUploadOpen(false);
    
    {/* 🌿 사용 변수들- 닐짜 입력 관련 함수 */}  
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setDates({ startDate: newValue.startDate, endDate: newValue.endDate });
    }

    {/*🌿 태그 버튼이 눌리면  activeBtns 상태 변화 */}
    const tagBtnClick = (tag) => {
        setActiveBtns((prevState) => {
            const newState = { ...prevState, [tag]: !prevState[tag] };
            const activeBtns = Object.keys(newState).filter((key) => newState[key]);
            console.log('activeBtns', activeBtns);
            return newState;
        });
    };

    {/* 🌿 get */}
    const { data: initData, isLoading, isError, error } = useQuery('imagesQuery', fetchGallery, {
        onSuccess: (data) => {
            setTargetImgData(data);
            console.log('from /gallery', data);
        }
    });


    {/* 🌿 post */}
    const mutationApply = useMutation(postApply, {
        onSuccess: (data) => {
            setTargetImgData(data);
            console.log('post success', data);
        },
        onError: (error) => {
            console.log('post fail', error);
        }
    });

    const mutationDelete = useMutation(postDelte, {
        onSuccess: (data) => {
            setTargetImgData(initData)
            console.log('post success', data);
        },
        onError: (error) => {
            console.log('post fail', error);
        }
    });

    {/* 🌿 apply 버튼 클릭 -> post 보내는 함수 */}
    const applyBtn = () => {
        const datas = { tags : Object.keys(activeBtns), startDate: dates.startDate, endDate: dates.endDate};
        console.log('post sending:', datas);
        mutationApply.mutate(datas);
    };

    {/* 🌿 init 버튼 클릭 -> 변수들 초기화 하는 함수 */}
    const initBtn = () => {
        setActiveBtns({});
        setTargetImgData(initData);
        setDates({ startDate: null, endDate: null });
    }

    {/* 🌿사진 클릭 시 중복 선택 실행되는 함수 */}
    const selectImgsClick = (imageId) => {
        setSelectedImages((prevSelectedImages) => {
        // 이미 선택된 이미지인지 확인
        const isSelected = prevSelectedImages.includes(imageId);

        if (isSelected) {return prevSelectedImages.filter((id) => id !== imageId);} // 이미 선택된 이미지일 경우 제거
        else {return [...prevSelectedImages, imageId];}// 선택되지 않은 이미지일 경우 추가 
        });
    };

    {/* 🌿사진 클릭 시 detailshow에 image데이터 전달하는 함수 */}
    const detailClick = (image) => {
        selectRef.current = image;
        detailTransfer(image)
    }

    // useQuery를 사용하여 fetchLikePhoto 함수를 호출하고, 그 결과를 콘솔에 출력
    const { data : projectData} = useQuery('projectList', fetchProject,{
        refetchInterval : 5*1000
        // onSuccess: (data) => {console.log('sidebar get success', data)},
        // retry:5,
        // retryDelay:500
    });
      
    {/* 🐼 즐겨찾기 해놓은 프로젝트 3개까지 표시 */}
    const likedProjects = projectData?.data?.filter(project => project.like).slice(0, 3);

    {/* 🐼 날짜 빠른 순으로 3개 표시 */}
    const recentProjects = projectData?.data?.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 3);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    {/* 🌿삭제 버튼이 눌리면 실행되는 함수 - DB에 삭제 요청, 렌더링에서 빼기 */}
    const deleteClick = () =>{
        const datas = { id : Object.values(selectedImages)};
        //무엇을 삭제할 건지 콘솔 확인
        console.log('delete post sending:', datas);
        //backend에 DB 데이터 삭제 요청
        mutationDelete.mutate(datas);
        //삭제요청 이미지를 갤러리 렌더링에서 제외
        // const updatedData = removeRender();
        // setTargetImgData(updatedData);
        setTargetImgData(initData);
    }

    {/* 🌿 변수들이 변하면 재렌더링을 위한 hook*/}
    useEffect(() => {
        initTE({ Ripple, Input });
        console.log(selectedImages)
    },[targetImgData || selectedImages || renderRequest] );

    if(isLoading) {return <h2>Loading...</h2>}
    if(isError) {return <h2>{error.message}</h2>}

  return (
    <>
    <TagModal showModal={showModal} setShowModal={setShowModal} selectedImage={selectedImage}/>
    <Box sx={{ display: 'flex' }}  >
        
    <CssBaseline />
    <AppBar position="fixed" open={open}>
        <Toolbar sx = {{paddingTop: '80px', backgroundColor: '#14131B'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div" sx={{marginBottom: 1}}>
            My Page
          </Typography>
        </Toolbar>
    </AppBar>
    <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
    <Divider variant="middle"/>
        {/* 🐼즐겨찾기 해놓은 프로젝트 리스트*/}
    <List
    aria-labelledby="nested-list-subheader"
    subheader={
        <ListSubheader
            sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
            }}
            component="div"
            id="nested-list-subheader"
        >
            <div className='ml-12 font-semibold text-violet-950' style={{ fontSize: '18px' }}>즐겨찾는 프로젝트</div>
        </ListSubheader>
    }
>
    {likedProjects?.slice(0, 3).map((project, index) => (
        <React.Fragment key={project._id}>
            <ListItem key={project._id} disablePadding sx={{ display: 'block' }}>
                <Link to={`/newproject/${project._id}`} style={{ textDecoration: 'none' }}> 
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <HiStar size={24} color="purple" className='mr-1' />
                        </ListItemIcon>
                        <ListItemText primary={project.name} secondary={formatData(project.time)} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </Link>
            </ListItem>
        </React.Fragment>
    ))
    }
</List>

        <Divider variant="middle" sx={{borderColor: 'rgba(128,0,128,0.5)'}}/>
        <List
            aria-labelledby="nested-list-subheader"
            subheader={
            <ListSubheader                   
                sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                component="div" 
                id="nested-list-subheader">
            <div className='ml-12 font-semibold text-violet-950' style={{fontSize : '18px'}}>최신 프로젝트</div>
            </ListSubheader>}
        >
          {recentProjects?.slice(0, 3).map((project, index) => (
            <React.Fragment key={project._id}>
            <ListItem key={project._id} disablePadding sx={{ display: 'block' }}>
                <Link to={`/newproject/${project._id}`} style={{ textDecoration: 'none' }}>
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AiOutlineRight size={24} color="purple" className='mr-1' />
                </ListItemIcon>
                <ListItemText primary={project.name} secondary={formatData(project.time)} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </Link>
            </ListItem>
          </React.Fragment>
          ))
          }
        </List>
    </Drawer>

        <div className='11/12 mx-auto'>
            <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
        <DrawerHeader />
        {/* 🌿 제목 및 '이미지 업로드 버튼' 구간*/}
        <div className='flex flex-wrap mx-4 px-4 justify-between mb-4'>
            <p className=' tracking-tight text-3xl text-white font-semibold'>Gallery </p>
                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={imgUploadHandleOpen}
                    className="inline-block bg-purple-700 rounded mr-8 px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ">
                    <span className="flex items-center">
                        <AiOutlineUpload size={24} color="white" className="mr-1" />
                        사진 업로드
                    </span>
                </button>
        </div>
        <Modal
            open={ImgUploadOpen}
            onClose={imgUploadHandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={uploadStyle}>

            <ImgFileInput onClose={imgUploadHandleClose} /> 
            </Box>
        </Modal>
        <Divider color='white' />
        <Typography variant="h6" color='white' noWrap component="div" sx={{ margin: 1, marginLeft : 4, textAlign: 'left' }}>
            내 카테고리 버튼
        </Typography>
        {/* 🌿 태그 버튼 mapping 구간 */}

                {buttonGroups.length > 0 ? (
        buttonGroups.map((group, index) => (
            <div key={index} className="mx-4 my-4 flex items-center justify-center">
            <div className="overflow-x-auto min-w-fit inline-flex font-extrabold text-purple-800 rounded-md shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
                {group.map((btn) => (
                <button
                    key={btn}
                    type="button"
                    onClick={() => tagBtnClick(btn)}
                    className="inline-block min-w-fit font-extrabold rounded-l text-inherit bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    {btn}
                </button>
                ))}
            </div>
            </div>
        ))
        ) : (
            <p className="text-white text-lg">사진을 올려 AI가 생성해주는 카테고리를 만들어보세요!</p>
        )}




        {/*🌿 태그 버튼 결과값 창 */}
        <div className='flex'>
            <p className='min-w-fit ml-4 my-2 border-b-1 tracking-tight text-xl text-white font-semibold'>선택된 카테고리 :</p>
            {Object.entries(activeBtns).filter(([key, value]) => value === true).map(([key]) => (
                <p key={key} className='overflow-x-auto min-w-fit mx-1 ml-4 my-2 border-b-1 tracking-tight text-xl text-white  font-semibold'>
                    {key}
                </p>
            ))}
        </div>
        {/*🌿 달력 입력 및 입력,초기화 버튼 구간*/}
        <div className='mb-8 bg-gray-100 p-4 justify-between flex mx-4 rounded-xl'>
            <div className='w-80 border-violet-800 border-1 rounded-sm ml-8'>
                <Datepicker 
                    value={dates} 
                    onChange={handleValueChange} 
                />
            </div>
            <div>
                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={applyBtn}
                    className="mx-4 inline-block bg-purple-700 rounded px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <span className="flex items-center">
                        apply
                    </span>
                </button>

                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={initBtn}
                    className="mx-4 mr-10 inline-block bg-purple-700 rounded px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <span className="flex items-center">
                        init
                    </span>
                </button>
            </div>
        </div>
        <div className='mx-4'>
        <Divider color='white' />
        </div>
        {/*sort row */}
        <div className='mt-2'>
            {/*🌿이미지 삭제 버튼 */ }
            <div className='flex justify-end mr-8 mb-2'>
                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={()=>deleteClick()}
                    className="mx-4 inline-block bg-purple-700 rounded px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <span className="flex items-center">
                        delete
                    </span>
                </button>
            </div>
        </div>
        {/*🌿이미지 갤러리 창*/ }
        <div style={{backgroundColor: 'rgba(255,255,255,0.1)'}} className="container mx-auto rounded-md shadow-xl my-4 py-2 lg:px-16 lg:pt-12">
            <ImageList sx={{ width: '100%', gap: 16 }} cols={4} rowHeight={200}>
                <React.Fragment>
                {targetImgData?.data?.map((image) => (
                    <ImageListItem 
                    key={image._id} 
                    className='gallery-imgCard'
                    onClick={() => {
                        openModal(image)
                        }}>

                    <img
                        key={image._id}
                        src={`${image.url}?w=248&fit=crop&auto=format`}
                        alt='loading...'
                        loading="lazy"
                            style={{
                            height: '20vh',
                            width: '100%',
                            objectFit: 'cover',
                            transition: 'opacity 0.3s ease-in-out',
                            filter: selectedImages.includes(image._id) ? 'brightness(50%)' : 'brightness(100%)',
                        }}
                    />
                    <div>
                        <span className=' text-white flex text-sm'>
                            {Object.values(image.categories).map((category, index,array) => {
                                const isLast = index === array.length - 1;
                                return (
                                    <div>
                                        <p key={index}># {category}</p>
                                        {!isLast && <p></p>}
                                    </div>
                                );
                            })}
                        </span>
                        <span className='text-white flex items-start text-sm'>{formatData(image.time)}</span>
                   </div>
                    </ImageListItem>
                ))}
                </React.Fragment>
            </ImageList>
        </div>
      </Box>
        </div>
    </Box>
    </>
  );
}