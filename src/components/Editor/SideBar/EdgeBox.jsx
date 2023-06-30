import React from 'react'

/** 이미지 출력용 import **/
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
//Menubar container
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const EdgeBox = () => {

      //기본 노드용 onDragStart함수
  const onDragStartDefault = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
    
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

  return (
    <div>
      <Paper sx={{     
        width: 420,
        height: '100vh',
        backgroundColor: 'rgba(211,211,211,0.7)',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        color: 'rgb(255,255,255)'}}>
            
        </Paper>
    </div>
  )
}
export default EdgeBox
