import React from 'react';
import { useQuery } from 'react-query'
import styled from 'styled-components'

// //서버요청용
import { request } from "../../utils/axios-utils"

//css용 코드
const SideContainer = styled.div`
position: fixed;
top: 62px;
height: 100vh;
width: 220px;
`

//서버용 코드
const fetchLikePhodo = () => {
  return request({ url: 'api/likephodo'})
}

const Sidebar = () => {
    // useQuery를 사용하여 fetchLikePhoto 함수를 호출하고, 그 결과를 콘솔에 출력
    const { data: likePhodo, isLoading: likeLoading, isError: likeIsError, error: likeError } = useQuery('likePhodo', fetchLikePhodo);
    // const { data: lastPhodo, isLoading:lastLoad, isError:lastIsError, error:lastError } = useQuery('lastPhoto', fetchLastPhodo);
    if (likeLoading ){
        return <h2>Loading...</h2>
    }

    if (likeIsError ){
        return <h2>{likeError.message}</h2>
    }

    return (
        <SideContainer>
            <div className="top-16 h-full w-400 bg-gray-900">
                <div className="p-4">
                    <div className="text-white text-lg mb-4">좋아하는 포도 리스트</div>
                        <div>
                            {likePhodo?.data.map((like) => {
                                return (
                                    <div className="text-gray-100" key={like.id}>
                                        <h2>
                                            {like.id} : {like.name}
                                        </h2>
                                    </div>
                                )
                            })}
                        </div>
                </div>

                <hr className="border-gray-700" />
                <div className="p-4">
                    <div className="text-white text-lg mb-4">Template List</div>
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
