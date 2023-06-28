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

const NodeBox =() => {

      //기본 노드용 onDragStart함수
  const onDragStartDefault = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>
      <Paper sx={{     
        width: 420,
        height: '100vh',
        backgroundColor: 'rgba(211,211,211,0.7)',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        color: 'rgb(255,255,255)'}}>
      <MenuList dense>
        {/* 🌿 Edit box제목 */}
        <h2 className="text-2xl mt-1 font-bold relative top-0 text-center text-violet-600"> 노드 박스 </h2>
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
        <div className="text-2xl ml-5 mt-2 text-violet-600 p-1 rounded-lg font-bold">
           Text</div>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-purple-700 bg-info my-2 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]  justify-center" 
            onDragStart={(event) => onDragStartDefault(event, 'TextNode1')}
            draggable 
            style={{ height: '50px', width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>기본</div>
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-purple-700 bg-info my-2 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'TextNode2')}
            draggable 
            style={{ height: '50px', width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>제목/내용</div>
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-purple-700 bg-info my-2 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'TextNode3')}
            draggable 
            style={{ height: '50px', width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>제목/날짜/내용</div>
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-purple-700 bg-info my-2 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'TaskNameNode')}
            draggable 
            style={{ height: '50px', width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>업무/담당자</div>
          </div>
        </MenuItem>
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
        <div className="text-2xl ml-5 mt-2 text-violet-600 p-1 rounded-lg font-bold">
          Memo</div>
        <div className='flex ml-1'>  
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-yellow-300 my-2 bg-info px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'MemoNode')}
            draggable 
            style={{ height: '50px', width: '50px' }}>
            {/* <div>노랑</div> */}
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded my-2 bg-teal-400 bg-info px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'MemoNodeB')}
            draggable 
            style={{ height: '50px', width: '50px' }}>
            {/* <div>파랑</div> */}
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-green-400 my-2 bg-info px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'MemoNodeG')}
            draggable 
            style={{ height: '50px', width: '50px' }}>
            {/* <div>초록</div> */}
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-pink-400 my-2 bg-info px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'MemoNodeP')}
            draggable 
            style={{ height: '50px', width: '50px' }}>
            {/* <div>분홍</div> */}
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-purple-400 my-2 bg-info px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'MemoNodeV')}
            draggable 
            style={{ height: '50px', width: '50px' }}>
            {/* <div>보라</div> */}
          </div>
        </MenuItem>
        </div>
        {/* <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} /> */}


      </MenuList>
      </Paper>
    </div>
  )
}

export default NodeBox
