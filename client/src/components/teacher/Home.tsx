import React from 'react'
import { userState } from '@/stores/userStore'
import { useRecoilValue } from 'recoil'
export const Home = () => {
    const {user} = useRecoilValue(userState)
  return (
      <div>Teacher Home. Welcome {user.username}</div>
  )
}
