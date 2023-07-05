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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Modal from '@mui/material/Modal';
import { Container, Row, Col } from "react-bootstrap";
import ListSubheader from '@mui/material/ListSubheader';


import { Link } from 'react-router-dom';

//컴포넌트 import
import ImgFileInput from '../form/ImgFileInput';

//서버요청용
import { request } from "../../utils/axios-utils";
import { useMutation, useQuery } from 'react-query';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

// 🌿 custom hook
import useFormatDate from '../../hooks/useFormatDate';
import { HiStar } from 'react-icons/hi';
import {
  Ripple,
  initTE,
} from "tw-elements";

import {
AiOutlineRight
} from "react-icons/ai";

//좋아요 변경용
import StarIcon from './StarIcon';

//thumbnail 변경용
import ThumbFileInput from './ThumbFileInput';

//project card
import ProjectCard from './ProjectCards';


//🌿custom function
const fetchGallery = () => {return request({ url: 'api/gallery' });}

const fetchProject = () => {
  return request({ url: 'project'})
}

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

// eslint-disable-next-line 
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '64px',

  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// eslint-disable-next-line 
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    marginTop: '64px',
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,      
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      marginTop: '64px',
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
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

const style = {
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

initTE({Ripple });

const styleThumb = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 1,
  borderRadius: 5,
  p: 4,
};


const drawerWidth = 240;

const SideBarArea = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const formatData = useFormatDate();

    const [ImgUploadOpen, setImgUploadOpen] = useState(false);
    const imgUploadHandleOpen = () => setImgUploadOpen(true);
    const imgUploadHandleClose = () => setImgUploadOpen(false);

    const [searchTerm, setSearchTerm] = useState('');
    const thumbHandleClose = () => setThumnailOpen(false);

    const [thumnailOpen, setThumnailOpen] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const [currentDefThumb, setCurrentDefThumb] = useState(null);

    // useQuery를 사용하여 fetchLikePhoto 함수를 호출하고, 그 결과를 콘솔에 출력
    const { data : projectData} = useQuery('projectList', fetchProject,{
        refetchInterval : 5*1000
        // onSuccess: (data) => {console.log('sidebar get success', data)},
        // retry:5,
        // retryDelay:500
    });

    {/* 🐼 날짜 빠른 순으로 3개 표시 */}
    const recentProjects = projectData?.data?.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);
    
    {/* 🐼 즐겨찾기 해놓은 프로젝트 3개까지 표시 */}
    const likedProjects = projectData?.data?.filter(project => project.like).slice(0, 3);

    const ThumbHandleOpen = (projectId, defThumb) => {
    setCurrentProjectId(projectId);
    setCurrentDefThumb(defThumb);
    setThumnailOpen(true);
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

  return (
    <Box sx={{ display: 'flex', width: '100vw'}}  >
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
            My Project
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
                id="nested-list-subheader">
            <div className='ml-12 font-semibold text-violet-950' style={{fontSize : '18px'}}>즐겨찾는 프로젝트</div>
            </ListSubheader>}
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
        <div className='w-8/12 mx-auto'>
            <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
            <DrawerHeader />
            {/*여기서 부터! 내용 시작!!*/}
            <div className='flex flex-col mx-4 justify-between mb-4'>
                {/* 🌿 제목 및 '새프로젝트 버튼' 구간*/}
                <div className='flex w-full mx-8 px-4 justify-between mb-4' style={{ gap: '2vw' }}>
                  <p className='tracking-tight text-3xl text-white font-semibold'>Project </p>

                  {/* 🌿 검색창 */}
                    <input
                    type="search"
                    className="relative block min-w-0 flex-auto rounded-3xl border border-solid border-neutral-300 bg-transparent bg-clip-padding px-4 text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-purple-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] "
                    placeholder=" Search your project"
                    aria-label="Search"
                    aria-describedby="button-addon3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
               
                  {/* 🌿 새프로젝트 버튼 */}
                  <Link to="/modal">
                      <button
                          type="button"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          className="inline-block bg-purple-700 rounded mr-8 px-6 py-3 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ">
                          <span className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                              새 프로젝트
                          </span>
                      </button>
                  </Link>
                </div>
                {/* 🌿 검색결과 */}
                <div className="flex items-center justify-start bg-violet-200 rounded-xl px-4  w-5/6 pt-1 pb-1 h-16 mx-auto overflow-x-auto mb-4">
                <h3 className='mr-2 text-xl min-w-fit'>검색 결과 : </h3>
                {
                  projectData?.data?.filter(project => project.name === searchTerm || project._id === searchTerm).map(project => (
                  <Link to={`/newproject/${project._id}`} key={project._id} className="overflow-x-auto px-2 no-underline mx-1 my-2 border-b-1 tracking-tight pt-2 text-black inline-flex items-center min-w-fit rounded-2xl leading-normal ">
                      <p key={project._id} className='text-xl' style={{paddingTop: '2px', paddingBottom: '2px'}}>{`${project.name}`}</p>
                      <p key={project._id} className='text-md ml-1 mt-1' style={{paddingTop: '2px', paddingBottom: '2px'}}>{` by ${formatData(project.time)}`}</p>
                  </Link>
                  ))
                }
                </div>
                  <Divider sx={{ backgroundColor: 'white', marginY: '20px', marginLeft: '8px', marginRight: '8px' }} />
                {/* 🐼최근 참여한 프로젝트 리스트 */}
                <Col>
                <Row >   
                    <h2 className="text-2xl pl-2 font-semibold ml-6 text-white text-left">최근 참여한 프로젝트</h2>       
                </Row>
                </Col>
                <Row className="justify-content-center pb-3">
                  {recentProjects && recentProjects.map((project) => (
                    <Col key={project._id} lg={3} className="m-2 mb-4">
                      <ProjectCard
                        imgPath={`${project.image}?w=248&fit=crop&auto=format`}
                        pjtID={project._id}
                        title={project.name}
                        description={formatData(project.time)}
                        like={project.like}
                      />
                    </Col>
                  ))}
                </Row>
            </div>
            </Box>
        </div>
    </Box>
  )
}

export default SideBarArea
