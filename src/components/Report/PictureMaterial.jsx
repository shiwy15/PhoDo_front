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

    useEffect(() => {
        const fetchDataAndConvertImages = async () => {
            try {
                // Fetch the initial content from the server
                const response = await request({
                    method: 'get',
                    url: `/project/image/${projectId}`,
                });
    
                const convertedData = await Promise.all(
                    response.data.urls.map(async item => {
                        // Fetch image and convert to blob
                        const imageResponse = await fetch(item.url);
                        const blob = await imageResponse.blob();
    
                        return new Promise((resolve, reject) => {
                            let reader = new FileReader();
                            reader.onloadend = function() {
                                resolve({
                                    src: reader.result,
                                    width: Math.floor(Math.random() * 4) + 2, // random number between 2 and 5
                                    height: Math.floor(Math.random() * 4) + 2 // random number between 2 and 5
                                });
                            };
                            reader.onerror = reject;
                            reader.readAsDataURL(blob);
                        });
                    })
                );
    
                setConvertedPhotos(convertedData);
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchDataAndConvertImages();
    }, []);
    

    return (
        <div className='text-center'>
        여기에는 사진 재료와 export 버튼 그리고 api로 생성하는 버튼!
        <Gallery photos={convertedPhotos}/>

        </div>
    );
};

export default PictureMaterial;
