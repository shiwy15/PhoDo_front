import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

import ImageBox from './SideBar/ImageBox';
import NodeBox from './SideBar/NodeBox';
import EdgeBox from './SideBar/EdgeBox';

const MenuboxWidth = '100px'

const MenuBar = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

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

  return (
    <div style={{textAlign: 'center',  position: 'fixed', top: '64px', right: 0, width: MenuboxWidth, height: '100%', zIndex: 150, backgroundColor: '#8F44AD', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.3)' }}>
      {/* 🌿 첫번째 list -> image box */}
      <div className='first my-4'>
        <Button onClick={toggleDrawer1} sx={{ color: 'white', fontSize: '1.4rem' }}>이미지 박스</Button>
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
      <div className='second my-4 '>
        <Button onClick={toggleDrawer2} sx={{ color: 'white', fontSize: '1.4rem' }}>노드 박스</Button>
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
      <div className='third my-4'>
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
      </div>
    </div>
  );
};

export default MenuBar;
