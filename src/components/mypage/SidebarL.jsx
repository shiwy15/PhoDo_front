import React, { useEffect } from 'react';
import { useQuery } from 'react-query'

// //서버요청용
import { request } from "../../utils/axios-utils"

//css용
import { Divider } from '@mui/material';

//서버용 코드
const fetchProject = () => {
  return request({ url: 'api/project'})
}

const Sidebar = () => {
    // useQuery를 사용하여 fetchLikePhoto 함수를 호출하고, 그 결과를 콘솔에 출력
    const { data : projectData, isLoading, isError, error, isFetching } = useQuery('projectList', fetchProject,{
        // onSuccess: (data) => {console.log('sidebar get success', data)},
        // retry:5,
        // retryDelay:500,
        // staleTime:1000*60,
        // cacheTime:1000*300,
        // refetchOnWindowFocus:true
    });

    return (
        <div
            id="sidenavL"
            className="fixed left-0 w-60 h-screen -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
            data-te-sidenav-init
            data-te-sidenav-hidden="false"
            data-te-sidenav-position="absolute">

            <div className="p-4">
                <div className="text-lg mb-4">My image</div>
                    <div>
                    {/* 여기에는 Project의 like가 true인 것만 표시 */}
                    {
                        projectData && projectData.keys().map((project) => {
                        return (
                            <p key={project._id}>{project.name}</p>
                            )
                        })
                    }
                    </div>
            </div>
            <div className='mx-4'>
                <Divider />
            </div>

                
        </div>
    );
};


export default Sidebar;
