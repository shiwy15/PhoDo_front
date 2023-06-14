import styled from 'styled-components';
import * as React from 'react';
import { useState } from 'react';


//component
import Header from '../../components/mypage/Header'
import MainPost from '../../components/Main/MainPost'
import { ExampleCard } from '../../components/Main/exampleCard'


export const MainPage =() => {

    return (
        <div>
            <Header />
            <MainPost />
            <ExampleCard />
        </div>
    )
}
