import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

import ImageBox from './SideBar/ImageBox';
import NodeBox from './SideBar/NodeBox';

import { HiEnvelope, HiQuestionMarkCircle, HiPhoto, HiMiniPencilSquare } from "react-icons/hi2";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import  InputSubscription  from '../Editor/SideBar/InputSubscription'

//email전송용
import { useParams } from "react-router-dom";
const MenuboxWidth = '100px'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  height: 170,
  bgcolor: 'background.paper',
  boxShadow: 1,
  borderRadius: 5,
  p: 2,
};

const MenuBar = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

    //이메일 전송용
  const {projectId} = useParams();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const toggleDrawer1 = () => {
    setOpen1(!open1);
    if (open1) {
      setOpen2(false);
      setOpen3(false);
    };
  };

  const toggleDrawer2 = () => {
    setOpen2(!open2);
    if (open2) {
      setOpen1(false);
      setOpen3(false);
    };
  };

  const toggleDrawer3 = () => {
    setOpen3(!open3);
        if (open3) {
      setOpen2(false);
      setOpen3(false);
    };
  };

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <div className='grid' style={{textAlign: 'center',  position: 'fixed', top: '64px', right: 0, width: MenuboxWidth, height: '100%', zIndex: 150, backgroundColor: '#8F44AD', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.3)' }}>
      <div className='topPosition justify-items-start'>
      {/* 🌿 첫번째 list -> image box */}
      <div className='place-content-start first my-4 mx-auto'>
        <Button
          onClick={toggleDrawer1}
          sx={{
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin : 'auto'
          }}>
          <HiPhoto className="h-16 w-16 text-white mx-auto transition duration-150 ease-in-out hover:text-yellow-400  focus:text-purple-800 active:text-purple-800 "/>
          <p>이미지 박스</p>
          </Button>
          <Divider sx={{ backgroundColor: 'white', marginY: '12px', marginLeft: '8px', marginRight: '8px' }} />
        <Drawer
          anchor="right"
          open={open1}
          onClose={toggleDrawer1}
          sx={{ zIndex: 5 }}
          slotProps={{
            backdrop: {
              style: { backgroundColor: 'transparent' },
              invisible: true,
            },
          }}>
          <div style={{position: 'fixed', right: MenuboxWidth, top:'64px'}}>
            <ImageBox/>
          </div>
        </Drawer>
      </div>
      {/* 🌿 두번쨰 list -> image box */}
      <div className='place-content-start second my-4 '>
        <Button
          onClick={toggleDrawer2}
          sx={{
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin : 'auto'
          }}>
          <HiMiniPencilSquare className="h-16 w-16 text-white mx-auto transition duration-150 ease-in-out hover:text-yellow-400  focus:text-purple-800 active:text-purple-800" />
          <p>텍스트 박스</p>
        </Button>
          <Divider sx={{ backgroundColor: 'white', marginY: '12px', marginLeft: '8px', marginRight: '8px' }} />
        <Drawer
          anchor="right"
          open={open2}
          onClose={toggleDrawer2}
          sx={{ zIndex: 5 }}
          slotProps={{
            backdrop: {
              style: { backgroundColor: 'transparent' },
              invisible: true,
            },
          }}>
          <div style={{position: 'fixed', right: MenuboxWidth, top:'64px'}}>
          <NodeBox />
          </div>
        </Drawer>
      </div>
        {/* 🌿 세번째 list -> image box */}
        {/* <div className='third my-4'>
          <Button onClick={toggleDrawer3} sx={{ color: 'white', fontSize: '1.4rem' }}>엣지 박스</Button>
            <Divider sx={{ backgroundColor: 'white', marginY: '12px', marginLeft: '8px', marginRight: '8px' }} />
          <Drawer
            anchor="right"
            open={open3}
            onClose={toggleDrawer3}
            sx={{ zIndex: 100 }}
            slotProps={{
              backdrop: {
                style: { backgroundColor: 'transparent' },
                invisible: true,
              },
            }}>
          <div style={{position: 'fixed', right: MenuboxWidth, top:'64px'}}>
            <EdgeBox />
          </div>
          </Drawer>
        </div> */}
      </div>
      <div className='bottomPosition place-content-end flex relative'>
        <div className='w-full grid'>

        {/*초대하기 기능 */}
          <div className='self-center'>
            <button
              type="button"
              onClick={() => handleOpen()}>
              <HiEnvelope className="h-16 w-16 text-white mx-auto transition duration-150 ease-in-out hover:text-yellow-400  focus:text-purple-800 active:text-purple-800 " />
              <p className='text-white text-lg'>초대하기</p>
            </button>
          </div>
          <Modal
          open={open}
          onClose={handleClose}
          slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } } }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <InputSubscription />
            <div className='grid'><button className='mt-2 justify-self-end' onClick={() => setOpen(false)}>닫기</button></div>
              
          </Box>
          </Modal>

        {/*설명서 기능 */}
        {/* <div className='self-center'><HiQuestionMarkCircle /></div> */}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;

