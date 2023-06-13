import * as React from 'react';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';
import { useQuery } from 'react-query';

// //서버요청용
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
    height: calc(100vh - 400px);
    background-color: #F1E3E1;
    border-top: solid 1px lightgray;
`
const ButtonBox = styled.div`
    self-align: start;
`

const fetchGallery =() => {
    return request( { url: '/api/gallery'})
}


const GalleryBox = () => {
    const onSuccess = (data) => {
        console.log('Perfrom side effect after data fetching', data)
    }

    const onError = (error) => {
        console.log('Perfrom side effect after data error',error)
    }

    const { isLoading, data, isError, error} = useQuery('imagesQuery', fetchGallery,{onSuccess, onError})
    
    if(isLoading) {
        return <h2>Loading...</h2>
    }

    if(isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <div>
        <GalleryContainer>
        <ButtonBox className="mb-auto bg-purple-100 h-16">button box</ButtonBox>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {data?.data.map((imagesQuery) => (
                <ImageListItem key={imagesQuery.url}>
                <img
                    src={`${imagesQuery.url}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${imagesQuery.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={'loading...'}
                    loading="lazy"
                />
                
                </ImageListItem>
            ))}
            </ImageList>
        </GalleryContainer>
        </div>
    );
};

export default GalleryBox;