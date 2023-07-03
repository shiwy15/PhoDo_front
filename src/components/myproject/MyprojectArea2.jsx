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
    <Box sx={{ display: 'flex', width: '82vw', marginX : 'auto' }}  >
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
        <div className='mx-auto'>
            <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
            <DrawerHeader />
            {/*여기서 부터! 내용 시작!!*/}
            <div >
                {/* 🌿 제목 및 '새프로젝트 버튼' 구간*/}
                <div className='flex flex-wrap mx-4 px-4 justify-between mb-4'>
                <p className=' tracking-tight text-3xl text-white font-semibold'>Project </p>

                {/* 🌿 검색창 */}
                <div className="relative -ml-4 flex w-8/12 h-12 flex-wrap items-stretch ">
                    <input
                    type="search"
                    className="relative -mr-0.5 -ml-2 block min-w-0 flex-auto rounded-l-3xl border border-solid border-neutral-300 bg-transparent bg-clip-padding px-5 py-2 text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-purple-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] "
                    placeholder=" Search your project"
                    aria-label="Search"
                    aria-describedby="button-addon3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />

                    <button
                    className="text-white relative z-[2] rounded-r-3xl border-2 px-6 py-2 text-xs font-medium uppercase transition duration-150 ease-in-out hover:bg-purple hover:bg-opacity-5 focus:outline-none focus:ring-0"
                    type="button"
                    id="button-addon3"
                    onClick={()=>{}}
                    data-te-ripple-init>
                    Search
                    </button>
                </div>
            {/* 🌿 새프로젝트 버튼 */}
            <Link to="/modal">
                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="inline-block bg-purple-700 rounded mr-8 px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ">
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
                <div className="flex items-center justify-start bg-violet-200 rounded-xl px-4 w-5/6 pt-1 pb-1 h-16 mx-auto overflow-x-auto mb-4">
                <h3 className='mr-2 text-xl min-w-fit'>검색 결과 : </h3>
                {
                    projectData?.data?.filter(project => project.name === searchTerm || project._id === searchTerm).map(project => (
                        
                        <Link to={`/newproject/${project._id}`} key={project._id} className='flex mx-2 items-center justify-start border  px-4 py-1 text-blue-500 text-white rounded-full min-w-fit'>
                            <p key={project._id} className='text-xl'>{`${project.name}`}</p>
                            <p key={project._id} className='text-md ml-1 mt-1' >{` by ${formatData(project.time)}`}</p>
                        </Link>
                    ))
                }
                </div>


                <Divider color='white' />

                {/* 🐼최근 참여한 프로젝트 리스트 */}
                <h2 className="text-2xl pl-2 font-semibold ml-6 mt-6 text-white text-left">최근 참여한 프로젝트</h2>
                <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

                {recentProjects && recentProjects.map((project) => (
                    <Col md={3} key={project._id} style={{ margin: '5px', marginBottom: '15px' }} >
                        
                            <ProjectCard
                                imgPath={`${project.image}?w=248&fit=crop&auto=format`}
                                pjtID={project._id}
                                title={project.name}
                                description={formatData(project.time)}
                                like={project.like}
                            >
                            </ProjectCard>                    
                
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
