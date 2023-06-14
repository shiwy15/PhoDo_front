// import React, { useState, useRef ,useCallback } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   useReactFlow,
//   Panel,
// } from 'reactflow';
// import { onSave, onRestore, onAdd } from './Editingbox2.jsx';
// import 'reactflow/dist/style.css';

// const Sidebar = ()  => {
//     return(
// <div>
// <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
//    <span class="sr-only">Open sidebar</span>
//    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//       <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
//    </svg>
// </button>

// <aside id="sidebar-multi-level-sidebar" class="fixed top-0 right-0 z-40 w-32 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-[#1da1f2]" aria-label="Sidebar">
//    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
//       <ul class="space-y-2 font-medium">
//          <li>
//             <button type="button" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
//                   <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>건설 현장 프로젝트</span>                  
//             </button>
//          </li>
//          <li>
//             <button type="button" onClick={Editingbox2.onSave} class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
//                   <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>저장하기</span>                  
//             </button>
//          </li>
//          <li>
//             <button type="button" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
//                   <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>되돌아가기</span>                  
//             </button>
//          </li>
//          <li>
//             <button type="button" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
//                   <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>추가하기</span>                  
//             </button>
//          </li>


    
//          <li>
//             <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
//                <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
//                <span class="flex-1 ml-3 whitespace-nowrap">현재 유저</span>
//             </a>
//          </li>

//          <li>
//             <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
//                <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
//                <span class="flex-1 ml-3 whitespace-nowrap">로그아웃</span>
//             </a>
//          </li>

//          <li>
//             <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
//                <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
//                <span class="flex-1 ml-3 whitespace-nowrap">음성 채팅</span>
//             </a>
//          </li>

         
//       </ul>
//    </div>
// </aside>

// <div class="p-4 sm:ml-64">
//    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
//       <div class="grid grid-cols-3 gap-4 mb-4">
//          <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//          </div>
//          <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//          </div>
//          <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//          </div>
//       </div>
//       <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
//          <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//       </div>
//       <div class="grid grid-cols-2 gap-4 mb-4">
//          <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//          </div>
//          <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//          </div>
//          <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//          </div>
//          <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//          </div>
//       </div>
//       <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
//          <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//       </div>
//       <div class="grid grid-cols-2 gap-4">
//          <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//          </div>
//          <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//          </div>
//          <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//          </div>
//          <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
//          </div>
//       </div>
//    </div>
// </div>
// </div>
//     )
// }

// export default Sidebar;