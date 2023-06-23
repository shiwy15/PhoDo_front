import React from 'react';
import { useNavigate } from 'react-router-dom';

const Projectenterbar = () => {
 
  const navigate = useNavigate();
  
  return (
    <div className="mx-auto flex-col justify-center items-center h-70 border-b border-gray-300 overflow-hidden w-full">
      <p className="text-xl font-bold mb-2">🗂️ 기존 프로젝트 검색</p>
      
      <form className="mt-0 flex">
        <div className="mb-2 flex-grow">
            <input type="text" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder='기존 프로젝트 입력하세요!' />
        </div>
        <button type="submit" className="ml-4 bg-gray-100 hover:bg-purple-200 text-gray-800 font-bold py-2 px-4 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40e">
            검색
        </button>
      </form>

      <p className="text-xl font-bold mt-3 mb-3">🗂️ 새로운 프로젝트를 실행</p>
      <div className='flex justify-center items-center space-x-4'>
  
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-purple-500 group-hover:from-purple-600 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800"
         onClick={()=> navigate('/newproject')}>
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            팀 프로젝트 만들기
          </span>
        </button>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-purple-500 group-hover:from-purple-600 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800"
         onClick={()=> navigate('/newproject')}>
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            개인 프로젝트 만들기
          </span>
        </button>
      </div>
    </div>
  );
  }
  
  export default Projectenterbar;
  