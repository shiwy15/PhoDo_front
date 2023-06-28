import React, { useEffect, useState } from 'react';


// 🌿 custom hook
import useFormatDate from '../../hooks/useFormatDate';

//css관련
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import {
  Ripple,
  initTE,
} from "tw-elements";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

//서버요청용
import { useQuery } from 'react-query'
import { request } from "../../utils/axios-utils"

//좋아요 변경용
import StarIcon from './StarIcon'

//thumbnail 변경용
import ThumbFileInput from './ThumbFileInput'

initTE({Ripple });

const style = {
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


//서버용 코드
const fetchProject = () => {
  return request({ url: 'project'})
}

const MyProjectArea = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const formatData = useFormatDate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    {/* 🐼 project GET hook */}
    const { data : projectData} = useQuery('projectList', fetchProject,{
        // onSuccess: (data) => {console.log('sidebar get success', data)},
        // retry:5,
        // retryDelay:500
    });

    {/* 🐼 날짜 빠른 순으로 3개 표시 */}
    const recentProjects = projectData?.data?.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);



    return (
        <div className='mx-4 my-2'>
            {/* 🌿 제목 및 '새프로젝트 버튼' 구간*/}
            <div className='flex flex-nowrap mt-16 m-2 p-4 justify-between'>
                {/* 🌿 제목 */}
                <p className='mt-6 tracking-tight text-3xl text-purple-800 font-semibold mr-2'>My Project </p>
                {/* 🌿 검색창 */}
                <div className="relative -ml-4 mt-5 flex w-8/12 h-12 flex-wrap items-stretch ">
                    <input
                    type="search"
                    className="relative -mr-0.5 -ml-2 block min-w-0 flex-auto rounded-l-3xl border border-solid border-neutral-300 bg-transparent bg-clip-padding px-5 py-2 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-purple-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder=" Search your project"
                    aria-label="Search"
                    aria-describedby="button-addon3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />

                    <button
                    className="relative z-[2] rounded-r-3xl border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-purple hover:bg-opacity-5 focus:outline-none focus:ring-0"
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
                        className="mt-6 inline-block bg-purple-700 rounded bg-primary mr-8 px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white"
                    >
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
                    projectData?.data?.filter(project => project.name === searchTerm).map(project => (
                        
                        <Link to={`/newproject/${project._id}`} key={project._id} className='flex mx-2 items-center justify-start border  px-4 py-1 bg-violet-800 text-white rounded-full min-w-fit'>
                            <p key={project._id} className='text-xl'>{`${project.name}`}</p>
                            <p key={project._id} className='text-md ml-1 mt-1' >{` by ${formatData(project.time)}`}</p>
                        </Link>
                    ))
                }
            </div>


            <Divider />

            {/* 🐼최근 참여한 프로젝트 리스트 */}
            <div className='h-80'>
                <h2 className="text-2xl pl-2 font-semibold ml-6 mt-6 text-gray-600 text-left">최근 참여한 프로젝트</h2>
                <div className=' flex flex-col justify-center items-center'>
                    <ImageList sx={{ width: '95%', height: '265px'}} cols={5}>
                        {recentProjects && recentProjects.map((project) => (
                            <ImageListItem key={project._id} sx={{ margin: '5px' }} >
                                <Link to={`/newproject/${project._id}`}>

                                <img
                                    src={`${project.image}?w=248&fit=crop&auto=format`}
                                    srcSet={`${project.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={project.name}
                                    loading="lazy"
                                    style={{height: '160px',borderRadius: '5px' }}
                                />
                                <ImageListItemBar
                                    title={project.name}
                                    subtitle={<span> by {formatData(project.time)}</span>}
                                    position="below" />
                                </Link>

                                <div className="flex justify-center items-center px-4">
                                    {/* 🐼썸네일 수정 버튼 : modal띄우기*/}
                                    <button
                                        type="button"
                                        onClick={handleOpen}
                                        class=" mr-3 inline-block rounded bg-violet-800 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] whitespace-nowrap">
                                        썸네일 변경
                                    </button>
                                            <Modal
                                            open={open}
                                            onClose={handleClose}
                                            slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } } }} 
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            >
                                            <Box sx={style}>

                                                <ThumbFileInput projectId={project._id} defThumb={project.image}/>
                                                {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                                </Typography> */}
                                                <button className='' onClick={()=>{setOpen(!open)}}>닫기</button>
                                            </Box>
                                            </Modal>
                                    {/* 🐼\좋아요 아이콘 - true면 빨간색. false면 투명색 */}
                                    <StarIcon defProject={project._id} deflike={project.like} />

                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>


                </div>
            </div>


            <div className='mx-8'>
                <Divider />
            </div>

            {/* 🐼 내 프로젝트 리스트 */}
            <h2 className="text-2xl pl-2 font-semibold m-6 text-gray-600">내 프로젝트</h2>
            <div className=' flex flex-col justify-center items-center'>
                <ImageList sx={{ width: '95%', height: '224px'}} cols={5}>
                    {projectData && projectData?.data?.sort((a, b) => new Date(a.time) - new Date(b.time)).map((project) => (
                        <ImageListItem key={project._id} sx={{ margin: '5px' }} >
                            <Link to ={`/newproject/${project._id}`}>
                            <img
                                src={`${project.image}?w=248&fit=crop&auto=format`}
                                srcSet={`${project.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={project.name}
                                loading="lazy"
                                style={{height: '160px',borderRadius: '5px' }}
                            />
                            <ImageListItemBar
                                title={project.name}
                                subtitle={<span> by {formatData(project.time)}</span>}
                                position="below"
                            />
                            </Link>
                            <div className="flex justify-center items-center px-4 mb-2">
                                {/* 🐼썸네일 수정 버튼 : modal띄우기*/}
                                <button
                                    type="button"
                                    class=" mr-3 inline-block rounded bg-violet-800 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] whitespace-nowrap"> 
                                    썸네일 변경
                                </button>
                                {/* 🐼\좋아요 아이콘 - true면 빨간색. false면 투명색 */}
                                <StarIcon defProject={project._id} deflike={project.like} />

                            </div>
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
            <div className='mx-8 my-4'>
                <Divider />
            </div>
        </div>
    );
};

export default MyProjectArea;
