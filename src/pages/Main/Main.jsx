import React, { useEffect, useContext } from "react";

//component
import Header from '../../components/mypage/Header';
import MainPost from '../../components/Main/MainPost';
import TutorialFlow from '../../components/Main/TutorialFlow';
import Typography from '@mui/material/Typography';
import CategoryTuto from '../../components/Main/CategoryTuto';

export const MainPage =() => {

    return (
   <div>
      <Header className="fixed top-0 w-full z-50" />
      <div className="flex justify-center">
        <div className="w-11/12">
          <div className="mt-8 mb-32" style={{ marginTop: '100px' }}>
            <MainPost />
          </div>
          <div className="flex mt-8">
            <div className="w-1/2 h-84 m-8 text-center mb-2">
              <Typography gutterBottom variant="h5" >사진을 넣어 카테고리로 정리해보세요!</Typography>
              <CategoryTuto />
            </div>
            <div className=" w-1/2 m-8 text-center">
              <Typography gutterBottom variant="h5">업무흐름을 만들어보세요!</Typography>
              <TutorialFlow />
            </div>

          </div>

        </div>
        
      </div>
    </div>


    )
}
