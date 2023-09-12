import React from 'react'
import useAuthorized from '../useAuth/useAuthorized';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute';
import SearchPage from '../components/SearchPage';
import PublicRoute from '../routes/PublicRoute';
import SignInPage from '../components/SignInPage';
import '../style/style.scss';

const AppRouter = () => {
    let {isAuthorized, loading} = useAuthorized();
    console.log(isAuthorized);
    if(loading){
        return (
            <h5>loading...</h5>
        )
    }
    return (
        <BrowserRouter>
            <Routes>
                {/* private route */}
                <Route element={<PrivateRoute isAuthorized={isAuthorized}/>}>
                    <Route path='/search' element={<SearchPage />} />
                </Route>

                {/* public route */}
                <Route element={<PublicRoute isAuthorized={isAuthorized}/>}>
                    <Route path='/sign-in' element={<SignInPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter