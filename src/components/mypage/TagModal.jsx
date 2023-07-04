import React, { useRef, useEffect, useCallback , useState } from 'react';
import { useSpring, animated } from 'react-spring';

import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { WithContext as ReactTags } from 'react-tag-input';
import { request } from "../../utils/axios-utils"
import './style.css'

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
  overflow: auto
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;



const TagModal = ({ showModal, setShowModal, selectedImage }) => {
  const [tags, setTags] = useState([ ]);

  useEffect(() => {
    if(selectedImage?.categories) {
      const newTags = Object.entries(selectedImage.categories).map(([key, value]) => ({id: key, text: value}));
      setTags(newTags);
    }
  }, [selectedImage]);

  //고치는 태그들 
  const handleDelete = async i => {
    const tagToDelete = tags[i];
    await request({
      method: 'delete',
      url: `/api/category`,
      data: { imageId: selectedImage?._id , delCategory: tagToDelete.text }
    });
    console.log('🔥🔥🔥🔥🔥', selectedImage?._id  , tagToDelete.text );
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleImageDelete = async () => {
    try {
      console.log('삭제할 ID: ', selectedImage?._id);
      const response = await request({
        method: 'post',
        url: '/api/galleryDelete',
        data: { id: [ selectedImage?._id ]  }
      });
      console.log('삭제할 ID ', response.data);
    } catch (error) {
      console.log(error); // Log any errors that occur
    }
  };
  

  const handleAddition = async tag => {
    await request({
      method: 'post',
      url: `/api/category`,
      data: { imageId: selectedImage?._id , newCategory: tag.text }
    });
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  console.log(selectedImage)
  const modalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};


  return (
    <div className='TagModal-section'>
    
      {showModal ? (
        
        <Background onClick={closeModal} ref={modalRef}>
          {/* <animated.div style={animation}> */}
            <ModalWrapper showModal={showModal}>
              <ModalImg src={selectedImage?.url} alt='selected image' />
              <ModalContent>
                <h3>사진 관리 </h3>
                {selectedImage?.location && <p>장소: {selectedImage.location} </p>}
                {selectedImage?.time && <p>시간: {formatDate(selectedImage.time)} </p>}
                {/* <h4>카테고리를 추가하려면 아래에 적어 <br/> Enter를 눌러보세요! </h4> */}
                
                <ReactTags
                  tags={tags}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  handleTagClick={handleTagClick}
                  inputFieldPosition="bottom"
                  placeholder="추가할 카테고리!"
                  autocomplete
                  classNames={{
                    tags: 'tagsClass',
                    tagInput: 'tagInputClass',
                    tagInputField: 'tagInputFieldClass',
                    selected: 'selectedClass',
                    tag: 'myTag',
                    remove: 'myTagRemove',
                    suggestions: 'suggestionsClass',
                    activeSuggestion: 'activeSuggestionClass'
                  }}
                />  
               
                <button type="button" onClick={handleImageDelete} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full 
                text-sm px-3 py-2 text-center mt-10
                mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                사진 삭제</button>
              </ModalContent>

              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
              
            </ModalWrapper>
            
          {/* </animated.div> */}
        </Background>
      ) : null
      }
    </div>
    
  );
};
export default TagModal