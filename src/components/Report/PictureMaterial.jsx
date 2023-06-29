import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const PictureMaterial = () => {
    const [value, setValue] = useState('');

    return (
        <div className='text-center'>
        여기에는 사진 재료와 export 버튼 그리고 api로 생성하는 버튼!

    <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src="https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg"
         alt="Sunset in the mountains" draggable='true'/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">예시 이미지</div>
            </div>
    <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#공장</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#건설</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#성공</span>
    </div>
</div>

        </div>
    );
};

export default PictureMaterial;