// import zustand
import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import phodo from './name.png'
// define the store
export const useStore = create(set => ({
  projectId: null,
  setProjectId: (id) => set({ projectId: id }),
}));



{/* 🐼mypage detailshow 용 ⬇️*/}
let detailStore = (set) => ({
  recentImg : phodo,
  changeRCImg : (img) =>
    set((state) => ({ recentImg : img}))
})

detailStore = devtools(detailStore)
detailStore = persist(detailStore, { name: 'mypage_clicked' })

export const useDetailStore = create(detailStore)
{/* 🐼mypage detailshow 용 ⬆️*/}