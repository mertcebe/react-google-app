import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoute = ({ isAuthorized }) => {
    return (
        <>
            {
                isAuthorized?
                <Outlet />
                :
                <Navigate to={`/sign-in`} />
            }
        </>
    )
}

export default PrivateRoute