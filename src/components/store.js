// import zustand
import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware'


{/* 🐼 project id공유 용 ⬇️*/}
let PjtStore = (set => ({
  projectName: null,
  projectId : null,
  setPjtName: (name) => set({ projectName: name }),
  setPjtId : (id) => set({ projectId: id })
}));

PjtStore = devtools(PjtStore)
PjtStore = persist(PjtStore, { name: 'modal_received' })

export const usePjtFromModalStore  = create(PjtStore)


{/* 🐼mypage detailshow 공유 용 ⬇️*/}
let detailStore = (set) => ({
  recentImg : '',
  changeRCImg : (img) =>
    set((state) => ({ recentImg : img}))
})

detailStore = devtools(detailStore)
detailStore = persist(detailStore, { name: 'mypage_clicked' })

export const useDetailStore = create(detailStore)

{/* 🐼login시 받아온 email 공유 용 ⬇️*/}
let userStore = (set) => ({
  userEmail : '',
  userName  : '',
  setUserEmail : (email) => 
    set((state) => ({ userEmail : email})),
  setUserName : (name) => 
    set((state) => ({ userName : name}))
})

userStore = devtools(userStore)
userStore = persist(userStore, { name: 'mypage_clicked' })

export const useUserStore = create(userStore)


{/* 🐼my page 업로드 완료 시 재렌더링  ⬇️*/}
let mypageRenderStore = (set) => ({
  renderRequest : false,
  setRenderRequest : (vlaue) => 
    set((state) => ({ RenderRequest : vlaue}))
})

mypageRenderStore = devtools(mypageRenderStore)
mypageRenderStore = persist(mypageRenderStore, { name: 'mypageRender' })

export const useMypageRenderStore = create(mypageRenderStore)
