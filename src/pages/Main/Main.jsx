import React, { useEffect, useContext } from "react";

//component
import Header from '../../components/mypage/Header'
import MainPost from '../../components/Main/MainPost'
import { ExampleCard } from '../../components/Main/exampleCard'

import { UserContext } from "../../App";

export const MainPage =() => {

  //🐼로그인 상태 확인용
  const { user } = useContext(UserContext);
    useEffect(() => {
        console.log('main user.loggedIn',user, user.loggedIn)
    });


    return (
    <div>
      <Header className="fixed top-0 w-full z-50" />
      <div className="flex justify-center">
        <div className="w-3/5">
          <div className="mt-20 mb-20" style={{ marginTop: '100px' }}>
            <MainPost />
          </div>
          <div className="mb-20">
            <ExampleCard />
          </div>
        </div>
      </div>
    </div>


    )
}
