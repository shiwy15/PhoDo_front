import React, { useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
//서버요청용
import { useQuery } from 'react-query';
import { request } from "../../utils/axios-utils";

//좋아요 변경용
import StarIcon from './StarIcon';

//thumbnail 변경용
import ThumbFileInput from './ThumbFileInput';

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
  paddingRight : 4,
  p: 4,
};

function ProjectCards(props) {

    const [thumnailOpen, setThumnailOpen] = useState(false);
    const thumbHandleClose = () => setThumnailOpen(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const [currentDefThumb, setCurrentDefThumb] = useState(null);


    const ThumbHandleOpen = (projectId, defThumb) => {
      setCurrentProjectId(projectId);
      setCurrentDefThumb(defThumb);
      setThumnailOpen(true);
    };


  return (
    <Card className="project-card-view">
      <Link to={`/newproject/${props.pjtID}`}>
      <Card.Img variant="top" src={props.imgPath} alt="card-img" className=' h-56 object-contain' />
      <Card.Body className='text-white no-underline'>
        <Card.Title className='text-xl'>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          참여날짜: {props.description}
        </Card.Text>
      </Card.Body>
      </Link>
      <div className='flex mx-auto pb-4'>
        {/*썸네일 버튼**/}
        <Button 
          type="button"
          onClick={() => ThumbHandleOpen(props.pjtID, props.imgPath)}
          className=" mx-4 w-fit inline-block rounded bg-violet-800 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] whitespace-nowrap">
        썸네일 변경
        </Button>
          <Modal
            open={thumnailOpen}
            onClose={thumbHandleClose}
            slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } } }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={styleThumb}>
                {thumnailOpen && <ThumbFileInput projectId={currentProjectId} defThumb={currentDefThumb} />}
                <button className='relative bottom-10' onClick={() => setThumnailOpen(false)}>닫기</button>
            </Box>
          </Modal>
        {/*좋아요 버튼**/}
        <StarIcon defProject={props.pjtID} deflike={props.like} className=' mx-4'/>
      </div>

        
      
    </Card>
  );
}
export default ProjectCards;
