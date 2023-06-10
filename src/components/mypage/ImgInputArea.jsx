import styled from 'styled-components'

import ImgFileInput from "./ImgFileInput"
import ImgFolderInput from "./ImgFolderInput"
import BoxName from "./BoxName"
import BoxName2 from "./BoxName2"

const ContentContainer = styled.div`
  display: flex;
  position: fixed;
  left: 220px;
  justify-content: center;
  align-items: center;  
  width: calc(100vw - 220px);
  height: 400px;
  border-bottom:  solid 1px lightgray;
  overflow: hidden;
`;

const ContentBox = styled.div`
  position: relative;
  top: 30px;
  padding: 10px;
  display: flex;
  flex-direction: row;  // Add this
  justify-content: center;
  background-color: #D8B2AD;
  width: 70%;
  border-radius: 10px;
`

const Column = styled.div`
  display: flex;  // Add this
  flex-direction: column;  // Add this
  justify-content: center;
  align-items: center;  // Add this
  flex: 1;  // Add this
  overflow: hidden;  // Add this
  &:not(:last-child) {
    border-right: 1px solid lightgray;  // Add this
  }
`

const InputBox = () => {

  return (
    <ContentContainer>
        <ContentBox>
          <Column>
          <div><BoxName /></div>
          <div><ImgFileInput /></div>
          </Column>
          <Column>
            <div><BoxName2 /></div>
            <div><ImgFolderInput /></div>
          </Column>
        </ContentBox>
    </ContentContainer>
  );
};

export default InputBox;
