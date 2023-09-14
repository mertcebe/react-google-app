import React from 'react'
import useAuthorized from '../useAuth/useAuthorized';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute';
import SearchPage from '../components/SearchPage';
import PublicRoute from '../routes/PublicRoute';
import SignInPage from '../components/SignInPage';
import '../style/style.scss';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SearchResultsPage from '../components/SearchResultsPage';

const AppRouter = () => {
    let {isAuthorized, loading} = useAuthorized();
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
            <ToastContainer
                    position="bottom-left"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
        </BrowserRouter>
    )
}

export default AppRouter