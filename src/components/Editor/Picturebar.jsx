import React, {useState, useEffect } from 'react';
import { request } from "../../utils/axios-utils"
import { useMutation, useQuery } from 'react-query';


/** 이미지 출력용 import **/
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

//Menubar container
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

/** 기능component import **/
import FileUpload from './FileUpload';

const fetchGallery = () => {
  return request({ url: 'api/gallery' });
}

export default () => {

  const [images, setImages] = useState([]);
  const { data: initialData, isLoading, isError, error } = useQuery('imagesQuery', fetchGallery);

    useEffect(() => {
        if (!isLoading && initialData) {
            setImages(initialData.data);
        }
    }, [isLoading, initialData]);


  const onDragStart = (event, nodeType, imageURL) => {
    
    console.log('🌸before drag event: ', event.dataTransfer);
    
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('data/imageurl', imageURL);
    
    const afterData = event.dataTransfer.getData('application/reactflow');
    const afterimg = event.dataTransfer.getData('data/imageurl');
    // console.log('🍎 after drag event: ', event.dataTransfer);
    
    // afterData = event.dataTransfer.getData('application/reactflow');
    // const afterimg = event.dataTransfer.getData();
    console.log('👺 after data: ', afterData);
    // console.log('👺 after data: ', event.dataTransfer);
    console.log('🌵 after img: ', afterimg);
    
    event.dataTransfer.effectAllowed = 'move';
  }

  return (
    <div>
      <Paper sx={{     
        position: 'fixed', 
        width: 270,
        height: '100vh',
        top: '63px', 
        right: '60px', 
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        color: 'rgb(255,255,255)'}}>
      <MenuList dense>
        <MenuItem>
          <Typography sx={{paddingRight: 3 }}>Side bar</Typography>
        </MenuItem>
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
        <div className='fileUpload'><FileUpload/></div>
        <div> 갤러리에서 검색</div>
        <div> 시간별 분류</div>
        <div>tag별 분류</div>

        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
         <ImageList cols={3} gap={6} sx={{ padding: '10px', height: '400px'}}>
            {images && images.map((image, index) => (
                <ImageListItem key={image.id} sx={{border: 'solid 1px white'}}>
                    <img 
                        src={image.thumbnailUrl}
                        className="dndnode"
                        loading="lazy"
                        onDragStart={(event) => onDragStart(event, 'pix', image.url)}
                        draggable
                        alt="Gallery Item"
                        style={{ height: '60px'}} />
                            <span style={{ fontSize: '8px', padding:'2px'}}>
                                {Object.values(image.tags).slice(0, 2).map((tag, index) => {
                              return (index < Object.values(image.tags).length - 1 && index !== 1) ? `${tag}, ` : tag;
                                })}
                            </span>
                </ImageListItem>
            ))}
        </ImageList>
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />


         </MenuList>
        </Paper>
    </div>
  );
};
