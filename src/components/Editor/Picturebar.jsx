import React, {useState, useEffect } from 'react';
import { request } from "../../utils/axios-utils"
import { useMutation, useQuery } from 'react-query';

const fetchGallery = () => {
  return request({ url: 'api/gallery' });
}

export default () => {

  const [images, setImages] = useState([]);
  const { data: initialData, isLoading, isError, error } = useQuery('imagesQuery', fetchGallery);

    useEffect(() => {
        if (!isLoading && initialData) {
            setImages(initialData.data);
        }
    }, [isLoading, initialData]);


  const onDragStart = (event, nodeType, imageURL) => {
    
    console.log('🌸before drag event: ', event.dataTransfer);
    
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('data/imageurl', imageURL);
    
    const afterData = event.dataTransfer.getData('application/reactflow');
    const afterimg = event.dataTransfer.getData('data/imageurl');
    // console.log('🍎 after drag event: ', event.dataTransfer);
    
    // afterData = event.dataTransfer.getData('application/reactflow');
    // const afterimg = event.dataTransfer.getData();
    console.log('👺 after data: ', afterData);
    // console.log('👺 after data: ', event.dataTransfer);
    console.log('🌵 after img: ', afterimg);
    
    event.dataTransfer.effectAllowed = 'move';
  }

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      {images && images.map((image, index) => (
        <img 
          key={index}
          src={image.url}
          className="dndnode"
          onDragStart={(event) => onDragStart(event, 'pix', image.url)}
          draggable
          alt="Gallery Item"
          style={{ width: '100px' }} // Adjust as needed
        />
      ))}
    </aside>
  );
};
