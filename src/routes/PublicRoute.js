import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PublicRoute = ({ isAuthorized }) => {
    return (
        <>
            {
                isAuthorized ?
                    <Navigate to={`/search`} />
                    :
                    <Outlet />
            }
        </>
    )
}

export default PublicRoute