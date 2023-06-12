import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const ButtonContainer = styled.div`
    display: flex;
    position:relative;
    width: calc(100vw - 220px);
    top:0;
    justify-content: center;
    align-items: center;  
    height: 50px;
`

const GalleryBox = () => {
    // const [isLoading, setIsLoading] = useState(true)
    // const [data, setData] = useState([])

    // useEffect(() => {
    //     axios.get('http://localhost:4000/superheroes').then((res) => {
    //         setData(res.data)
    //         setIsLoading(false)
    //     })
    // },[])

    // if (isLoading) {
    //     return <h2>Loading...</h2>
    // }

    const PhodoButton = () => {
        console.log("포도 버튼 클릭");
    };

    const ProjectButton = () => {
        console.log("프로젝트 버튼 클릭");
    };

    return (
        <div>
        <GalleryContainer>
            <ButtonContainer>
                <button onClick={PhodoButton} className="px-4 py-2 font-semibold text-white bg-blue-700 rounded-lg shadow-lg m-10">포도 버튼</button>
                <button onClick={ProjectButton} className="px-4 py-2 font-semibold text-white bg-blue-700 rounded-lg shadow-lg m-10">프로젝트 버튼 </button>
            </ButtonContainer>


        </GalleryContainer>
        </div>
    );
};

export default GalleryBox;
