import create from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {Token} from '../service/login/login'

interface RootState {
  token: Token | null
  saveToken: (tokenNumber: Token) => void
}

export const useStore = create<RootState>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        saveToken: (tokenNumber: Token) => set({token: tokenNumber}),
      }),
      {
        name: 'token',
        getStorage: () => localStorage,
      }
    ),
    {
      anonymousActionType: 'TokenState',
    }
  )
)
