
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { request } from '../../utils/axios-utils';
import { HiStar, HiOutlineStar } from 'react-icons/hi';

const patchLike = (data)=> {
  console.log('data', data)
    return request({ url:'/project/like' , method: 'PATCH', data: data, headers: { 'Content-Type': 'application/json' } });
}


const StarIcon = ({ defProject, deflike }) => {
  const project = defProject;
  const [like, setLike] = useState(deflike);

  /* 🌿 post */
  const mutationLike = useMutation(patchLike, {
    onSuccess: (data) => {
      // console.log('patch success', data);
    },
    onError: (error) => {
      console.log('patch fail', error);
    },
    retry: false, // Disable automatic retries
  });


  const handleClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling

    setLike(prevLike => {
      const newLike = !prevLike;
      console.log(project, newLike);
      mutationLike.mutate({projectId: project, isLike: newLike});
      return newLike;
    });
  };



  return like ? (
    <HiStar
      size={36}
      color='#FFF200'
      onClick={handleClick}
      style={{ 
        cursor: 'pointer',
        filter: 'drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3))'
      }}
    />
  ) : (
    <HiOutlineStar
      size={36}
      color='rgba(0,0,0,0.3)'
      aria-label='즐겨찾기'
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default StarIcon;
