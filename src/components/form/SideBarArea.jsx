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
import { HiStar } from 'react-icons/hi';
import Modal from '@mui/material/Modal';

import { Link } from 'react-router-dom';

//컴포넌트 import
import ImgFileInput from './ImgFileInput';

//서버요청용
import { request } from "../../utils/axios-utils";
import { useMutation, useQuery } from 'react-query';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// 🌿 custom hook
import useFormatDate from '../../hooks/useFormatDate';

import {
AiFillFileAdd
} from "react-icons/ai";



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

const drawerWidth = 240;

const SideBarArea = ({PageName}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const formatData = useFormatDate();

    const [ImgUploadOpen, setImgUploadOpen] = useState(false);
    const imgUploadHandleOpen = () => setImgUploadOpen(true);
    const imgUploadHandleClose = () => setImgUploadOpen(false);

    // useQuery를 사용하여 fetchLikePhoto 함수를 호출하고, 그 결과를 콘솔에 출력
    const { data : projectData} = useQuery('projectList', fetchProject,{
        refetchInterval : 5*1000
        // onSuccess: (data) => {console.log('sidebar get success', data)},
        // retry:5,
        // retryDelay:500
    });

        {/* 🐼 즐겨찾기 해놓은 프로젝트 3개까지 표시 */}
    const likedProjects = projectData?.data?.filter(project => project.like).slice(0, 3);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

  return (
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
            {PageName}
          </Typography>
        </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem>
                {/* 🐼즐겨찾기 해놓은 프로젝트 리스트*/}
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
                        <HiStar size={24} color="purple" className="mr-1" />
                    </ListItemIcon>
                    <ListItemText  sx={{ opacity: open ? 1 : 0 }} >
                        즐겨찾는 프로젝트
                        {
                            likedProjects?.map((project) => (
                            <div key={project._id}>
                                <Link to={`/newproject/${project._id}`}>
                                    <div className="flex items-center">
                                        <div className="flex flex-col">
                                            <p className="my-1 text-violet-900 text-xl">{project.name}</p>
                                            <p className='ml-4 text-md text-gray-500'>{new Date(project.time).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            ))
                        }
                    </ListItemText>
                </ListItemButton>    
            </ListItem>
            {/* 🌿사진 올리기 */}
            <ListItem>
                <ListItemButton
                    onClick={imgUploadHandleOpen}
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5                    
                    }}
                >                    
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                            <AiFillFileAdd size={24} color="purple" className="mr-1" />
                    </ListItemIcon>
                    <ListItemText  sx={{ opacity: open ? 1 : 0 }} >
                        사진 업로드
                    </ListItemText>
                </ListItemButton>
                    <Modal
                        open={ImgUploadOpen}
                        onClose={imgUploadHandleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography> */}
                        <ImgFileInput />
                        </Box>
                    </Modal>
            </ListItem>


        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
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
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Drawer>
        <div className='11/12 mx-auto'>
            <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
            <DrawerHeader />
            </Box>
        </div>
    </Box>
  )
}

export default SideBarArea
