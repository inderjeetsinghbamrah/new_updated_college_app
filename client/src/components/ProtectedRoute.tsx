import React from 'react'
import { useRecoilValue } from 'recoil'
import { Roles, userState } from '@/stores/userStore'
import { Navigate } from 'react-router-dom';
import {toast} from "react-toastify"

interface ProtectedRouteProps{
    children: React.ReactNode;
    allowedRoles?: Roles[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles=[] }) => {

    const user = useRecoilValue(userState);

    if (!user.isAuthenticated)
        return <Navigate to="/" />

    const isAuthorized  = allowedRoles.length === 0 || (user.role && allowedRoles.includes(user.role))

    if (!isAuthorized) {
        toast.error("You don't have permissions to access this page");
        return <p className='text-center'>You don't have permission to access this page</p>
    }
    return children
}
