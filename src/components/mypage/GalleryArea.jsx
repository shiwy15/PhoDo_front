import styled from 'styled-components';
import 'tailwindcss/tailwind.css';
import * as React from 'react';
import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';

// 서버요청용
import { request } from "../../utils/axios-utils"

// mui list
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const GalleryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: absolute;
    left: 220px;
    bottom:0px;
    width: calc(100vw - 220px);
    height: calc(100vh - 350px);
    background-color: #F1E3E1;
    border-top: solid 1px lightgray;
    padding: 0 50px;
`



//처음 렌더링될 때 gallery에서 이미지 get하는 함수
const fetchGallery =() => {
    return request( { url: 'api/gallery'})
}

// //버튼이 활성화됐을 때, 활성화된 버튼을 post로 보내는 함수
// const postActiveTags = (activeTags) => {
//     return request({ url: '/api/galleryTags', method: 'POST', data: { tags: activeTags }});
// }

//화면에 보일 component 내용
const GalleryBox = () => {
    /* ------------버튼 관련 함수 ------------ */
    //버튼 종류
    const buttons = ['total', 'tool', 'animal', 'clothing', 'vehicle', 'food', 'person', 'building', 'sports equipment', 'furniture', 'kitchenware', 'office supplies', 'plant'];

    //버튼 색깔 바꾸기용 useState
    const [activeButtons, setActiveButtons] = useState({})
    // 활성화된 버튼을 서버에 post 보내는 mutation
      const mutation = useMutation(
        activeTags => request({ url: 'api/galleryTags', method: 'POST', data: { tags: activeTags }}),
        {
        // 요청이 성공적으로 완료된 후에 응답을 콘솔에 로그로 출력합니다.
        onSuccess: (data) => {
            console.log(data);
        },
        }
    );
    // 버튼이 클릭되었을 때 실행되는 함수
    const handleClick =(button) => {
        setActiveButtons(prevState => {
            const newState = {...prevState, [button]: true};
            const activeTags = Object.keys(newState).filter(key => newState[key]);
            // 활성화된 모든 버튼의 태그를 서버에 POST 요청을 보냅니다.
            console.log('request:',activeTags)
            mutation.mutate(activeTags);
            return newState;
        });
    };
    /* ---------------------------------------------------------------------------------- */
    /* ------------처음 my page에 들어왔을 때 /gallery에서 사진 렌더링하는 함수 ------------ */
    const { data, isLoading, isError, error} = useQuery('imagesQuery', fetchGallery,{
        onSuccess : (data) => {console.log('Perfrom side effect after data fetching', data)}
        , onError : (error) => {console.log('Perfrom side effect after data error',error)}
        ,})

    if(isLoading) {return <h2>Loading...</h2>}
    if(isError) {return <h2>{error.message}</h2>}
    /* ---------------------------------------------------------------------------------- */
    return (
        <div>
            <GalleryContainer>

            <div className='flex flex-wrap justify-center'> 보고싶은 사진의 tag를 선택하세요! </div>
                <div className="button-box bg-purple-100 h-20 mb-2 rounded-lg shadow-lg flex flex-wrap justify-center items-center">
                    {buttons.map((button) => (
                        <React.Fragment key={button}>
                            <section>
                                <button
                                    onClick={() => handleClick(button)} 
                                    className={`rounded-full px-2 py-1 text-black shadow mx-1 my-1 ${(activeButtons[button] === true)? 'bg-blue-500' : 'bg-white'}`}>
                                    {button}
                                </button>
                            </section>
                        </React.Fragment>
                    ))}
                </div>
                <ImageList sx={{ width: '100%', height: 450, gap: 16 }} cols={3} rowHeight={164}>
                    {data?.data?.map((image) => (
                        <ImageListItem key={image._id}>
                        <img
                            src={`${image.url}?w=248&fit=crop&auto=format`}
                            alt='loading...'
                            loading="lazy"
                            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                        />
                        <ImageListItemBar
                            title={
                                <span>
                                    {Object.values(image.tags).map((tag, index) => {
                                        return index < Object.values(image.tags).length - 1 ? `${tag}, ` : tag;
                                    })}
                                </span>
                            }
                            position="bottom"
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
            </GalleryContainer>
        </div>
    );
};

export default GalleryBox;