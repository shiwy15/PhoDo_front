import React from 'react';
import styled from 'styled-components'

const Projectenterbar = () => {
 
  return (
    <div className="mx-auto items-center h-48 pt-20
     border-b border-gray-300 overflow-hidden w-full">
      안녕하세요! 프로젝트를 시작해볼까요?    
      <div className='mx-auto items-center'>
      
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-blue-500  group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            팀 프로젝트 실행하기 
          </span>
        </button>

        <button className='bg-blue-500'> 개인 프로젝트 만들기 </button>
      </div>
    </div>
  );
}
export default Projectenterbar;