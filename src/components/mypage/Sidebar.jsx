import React from 'react';
import styled from 'styled-components'

const SideContainer = styled.div`
position: fixed;
top: 62px;
height: 100vh;
width: 220px;
`

const Sidebar = () => {
  return (
    <SideContainer>
        <div className="top-16 h-full w-400 bg-gray-900">
            <div className="p-4">
                <div className="text-white text-lg mb-4">Grape List</div>
                {/* Add grape list content */}
            </div>
            <hr className="border-gray-700" />
            <div className="p-4">
                <div className="text-white text-lg mb-4">Template List</div>
                {/* Add template list content */}
            </div>
            <hr className="border-gray-700" />
            <div className="p-4">
                <div className="text-white text-lg mb-4">Icon List</div>
                {/* Add icon list content */}
            </div>
        </div>
    </SideContainer>
  );
};

export default Sidebar;
