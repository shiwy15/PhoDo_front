import styled from 'styled-components'


//이미지 파일업로드용 components
// import { ImgFileInput } from "./ImgFileInput"
import ImageUpload from "./ImgFileInput"

//폴더단위 components (추후에 업데이트 예정)
// import ImgFolderInput from "./ImgFolderInput"


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
  top: 25px;
  padding: 10px;
  display: flex;
  flex-direction: row;  // Add this
  justify-content: center;
  background-color: #D8B2AD;
  width: 80%;
  height: 70%;
  border-radius: 10px;
`

const Column = styled.div`
  display: flex;  
  flex-direction: column; 
  justify-content: center;
  align-items: center;  
  width: 100%; // Add this
  overflow: hidden; 
  &:not(:last-child) {
    border-right: 1px solid lightgray;
  }
`;


const InputBox = () => {
  return (
    <ContentContainer>
        <ContentBox>
          <Column>
            <div className="flex flex-col items-center justify-start w-full h-full">
              <div className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">InPut your Photo</div>
            </div>
            <div ><ImageUpload /></div>
          </Column>
          <Column>
            <div className="flex flex-col items-center justify-start w-full h-full">
              <div className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">Tag Output</div>
            </div>
          </Column>
        </ContentBox>
    </ContentContainer>
  );
};

export default InputBox;
