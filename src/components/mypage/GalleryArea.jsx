import * as React from 'react';
import styled from 'styled-components';

// mui list
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const GalleryContainer = styled.div`
    display: flex;
    position: absolute;
    left: 220px;
    bottom:0px;
    width: calc(100vw - 220px);
    height: calc(100vh - 400px);
    background-color: #F1E3E1;
    border-top: solid 1px lightgray;
`

// const ButtonContainer = styled.div`
//     display: flex;
//     position:relative;
//     width: calc(100vw - 220px);
//     top:0;
//     justify-content: center;
//     align-items: center;  
//     height: 50px;
// `

const GalleryBox = () => {


    return (
        <div>
        <GalleryContainer>
        <ImageList sx={{ width: 500, height: 450 }}>


        </ImageList>
        </GalleryContainer>
        </div>
    );
};

export default GalleryBox;
