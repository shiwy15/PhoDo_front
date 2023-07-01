import React, { useState,  useEffect } from 'react'
import { render } from 'react-dom';
import { useParams } from 'react-router-dom';
import Gallery from "react-photo-gallery";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import {photos} from './data'
import { request } from "../../utils/axios-utils"

const PictureMaterial = () => {
    let { projectId } = useParams();
    const [convertedPhotos, setConvertedPhotos] = useState([]);

    // 🧞‍♂️ 받는 용
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // Fetch the initial content from the server
    //             const response = await request({
    //                 method: 'get',
    //                 url: `/project/images/${projectId}`,
    //             });
    //             console.log('urls: ', response.data.urls);
    
    //             const convertedData = response.data.urls.map(item => ({
    //                 src: item,
    //                 width: Math.floor(Math.random() * 4) + 2, // random number between 2 and 5
    //                 height: Math.floor(Math.random() * 4) + 2 // random number between 2 and 5
    //             }));
                
    //             setConvertedPhotos(convertedData);
    //             console.log(convertedData);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    
    //     fetchData();
    // }, [ projectId ]);

    // 🧞‍♂️ 테스트용





    

    return (
        <div className='text-center' style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <h1>Flowchart 내부의 사진들</h1>
            <div style={{maxHeight: 'calc(100vh - 60px)', overflowY: 'auto'}}>
                {/* <Gallery photos={convertedPhotos}/>  */}
                <Gallery photos={photos}/>
            </div>
        </div>
    );
};

export default PictureMaterial;
