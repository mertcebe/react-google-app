import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { NavLink, useSearchParams } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import database, { auth } from '../firebase/firebaseConfig';
import googleImg from '../images/googleAppSignInImg1.png';
import googleVoice from '../images/googleVoice.png';
import googleLens from '../images/googleLens.webp';
import { Avatar, IconButton, Menu, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import { signOut } from 'firebase/auth';
import SignInPage from './SignInPage';
import SearchResult from './SearchResult';
import jsonData from '../myData.json';
import SearchImage from './SearchImage';


const SearchResultsPage = () => {
    let [searchResults, setSearchResults] = useState();
    let [searchParams] = useSearchParams();
    let searchTextValue = searchParams.get('q');
    let [searchText, setSearchText] = useState(searchTextValue);
    let location = useLocation();
    let dispatch = useDispatch();

    // scroll navbar
    document.addEventListener('scroll', (e) => {
        if (window.scrollY >= 140) {
            document.getElementById('navbar').style.position = 'sticky';
            document.getElementById('navbar').style.padding = '0px 30px';
            document.getElementById('navbar').style.boxShadow = '5px 0 10px #dfdfdf';
        }
        else {
            document.getElementById('navbar').style.position = 'relative';
            document.getElementById('navbar').style.padding = '20px 30px';
            document.getElementById('navbar').style.boxShadow = 'none';
        }
    })

    let navigate = useNavigate();

    const apiKey = 'AIzaSyCVYfRU371n9AksTXZjTfVrwstyfZzP25E';
    const cx = '24b6b44f0f3d9412a';

    const getSearchResults = (text) => {
        axios.get(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${text}`)
            .then((response) => {
                console.log(response.data);
                setSearchResults(response.data);
            })
        // setSearchResults(jsonData);
    }

    useEffect(() => {
        getSearchResults(searchText);
    }, []);


    // account settings
    const [anchorEl, setAnchorEl] = useState(null);
    let [addAccount, setAddAccount] = useState(false);
    let signUpControl = useSelector((state) => {
        return state.searchReducer.signUpControl;
    })
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let [openImage, image] = useSelector((state) => {
        return [state.searchReducer.openImage, state.searchReducer.image];
    })

    if (!searchResults) {
        return (
            <h5>loading...</h5>
        )
    }
    return (
        <div>
            {
                addAccount ?
                    <div style={{ position: "fixed", top: "50%", left: "50%", backdropFilter: "brightness(0.5)", width: "100%", height: "100vh", transform: "translate(-50%, -50%)", zIndex: "100" }}>
                        <div style={{ position: "absolute", top: "50%", left: "50%", background: "#fff", transform: "translate(-50%, -50%)", width: "500px", padding: "0px" }}>
                            <IconButton onClick={() => {
                                dispatch({
                                    type: "OPEN_SIGN_UP",
                                    payload: !signUpControl
                                })
                                setAddAccount(!addAccount);
                            }} sx={{ position: "absolute", top: "10px", right: "10px" }}>
                                <CloseIcon />
                            </IconButton>
                            <SignInPage addAccount={true} />
                        </div>
                    </div>
                    :
                    <></>
            }
            {/* navbar */}
            <div id='navbar' style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 30px", zIndex: "200", background: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={googleImg} alt="" style={{ width: "100px", marginRight: "30px" }} />

                    <div style={{ width: "700px", margin: "10px 0", display: "flex", borderRadius: "40px", height: "40px", boxShadow: "0px 1px 6px #20212447" }}>

                        <form className='p-0' style={{ width: "510px", marginLeft: "10px", height: "40px", overflow: "hidden" }} onSubmit={(e) => {
                            e.preventDefault();
                            if (searchText) {
                                if (location.pathname === '/search') {
                                    navigate(`/search?q=${searchText}`);
                                }
                                else {
                                    navigate(`/images?q=${searchText}`);
                                }
                                getSearchResults(searchText);
                            }
                        }}>
                            <input type="text" value={searchText} onChange={(e) => {
                                setSearchText(e.target.value);
                            }} style={{ width: "100%", height: "100%", outline: "none", border: "none", borderRadius: "40px", boxSizing: "border-box", padding: "0 10px" }} />
                        </form>
                        <div style={{ width: "50px", display: "flex" }}>
                            <Tooltip title={'Delete'}>
                                <IconButton onClick={() => {
                                    setSearchText('');
                                }}>
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                            <div style={{ position: "relative" }}>
                                <span style={{ width: "1px", height: "65%", background: "#dfdfdf", position: "absolute", top: "50%", transform: "translateY(-50%)" }}></span>
                            </div>
                        </div>
                        <div style={{ width: "125px" }}>
                            <Tooltip title={'Voice search'}>
                                <IconButton className='m-0'>
                                    <img src={googleVoice} alt="" style={{ width: "25px", height: "25px", pointerEvents: "none" }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={'Google lens'}>
                                <IconButton className='m-0'>
                                    <img src={googleLens} alt="" style={{ width: "25px", height: "25px", pointerEvents: "none" }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={'Search'}>
                                <IconButton className='m-0' disabled={searchText ? false : true} onClick={() => {
                                    if (location.pathname === '/search') {
                                        navigate(`/search?q=${searchText}`);
                                    }
                                    else {
                                        navigate(`/images?q=${searchText}`);
                                    }
                                    getSearchResults(searchText);
                                }}>
                                    <SearchIcon style={{ width: "25px", height: "25px", color: "#4285f4" }} />
                                </IconButton>
                            </Tooltip>
                        </div>

                    </div>
                </div>

                <div>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                    <Tooltip title='Apps'>
                        <IconButton style={{ marginRight: "10px" }}>
                            <AppsIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Account account">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>{auth.currentUser.displayName[0]}</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                background: "#e9f3fd",
                                borderRadius: "20px",
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: '#e9f3fd',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <div style={{ width: "400px", position: "relative" }}>
                            <IconButton onClick={handleClose} sx={{ position: "absolute", top: "0", right: "10px" }}>
                                <CloseIcon />
                            </IconButton>
                            <div style={{ textAlign: "center" }}>
                                <p className='m-0'>{auth.currentUser.email}</p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Avatar style={{ width: "70px", height: "70px", margin: "14px 0" }}>{auth.currentUser.displayName[0]}</Avatar>
                                <h5 style={{ marginBottom: "10px" }}>Hi, {(auth.currentUser.displayName).toUpperCase()}!</h5>
                                <button className='googleManageBtn' style={{ background: "transparent", borderRadius: "30px", border: "1px solid grey", padding: "5px 20px", marginBottom: "10px", color: "blue" }}>Manage your google account</button>
                                <div>
                                    <button className='accountBtn' onClick={() => {
                                        dispatch({
                                            type: "OPEN_SIGN_UP",
                                            payload: !signUpControl
                                        })
                                        setAddAccount(!addAccount);
                                    }} style={{ padding: "10px", marginRight: "2px", background: "#fff", border: "none", borderTopRightRadius: "5px", borderBottomRightRadius: "5px", borderTopLeftRadius: '30px', borderBottomLeftRadius: "30px" }}><i className="fa-solid fa-plus"></i> Add an account</button>
                                    <button className='accountBtn' onClick={() => {
                                        signOut(auth);
                                    }} style={{ padding: "10px", background: "#fff", border: "none", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", borderTopRightRadius: '30px', borderBottomRightRadius: "30px" }}><i className="fa-solid fa-arrow-right-from-bracket"></i> Sign out</button>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px 0" }}>
                                <NavLink style={{ textDecoration: "none", color: "#000", borderRadius: "5px", padding: "1px 4px", fontSize: "10px" }} className='accountFooter'>Privacy Policy</NavLink>
                                <i className="fa-solid fa-circle" style={{ fontSize: "5px", margin: "auto 10px" }}></i>
                                <NavLink style={{ textDecoration: "none", color: "#000", borderRadius: "5px", padding: "1px 4px", fontSize: "10px" }} className='accountFooter'>Terms of Service</NavLink>
                            </div>
                        </div>
                    </Menu>
                </div>
            </div>

            {/* search navbar */}
            <div className='searchNavbar' style={{ padding: "0 170px", display: "flex", alignItems: "center", borderBottom: "1px solid #efefef" }}>
                <NavLink to={`/search?q=${searchText}`} onClick={() => {
                    dispatch({
                        type: "OPEN_IMAGE",
                        payload: false,
                        image: {}
                    })
                }} style={{ position: "relative", textDecoration: "none", color: "gray", fontSize: "15px", display: "inline-block", width: "80px", height: "40px", marginRight: "10px", textAlign: "center", lineHeight: "40px" }}><i style={{ marginRight: "8px" }} className="fa-solid fa-magnifying-glass"></i>All</NavLink>
                <NavLink to={`/images?q=${searchText}`} onClick={() => {
                    dispatch({
                        type: "OPEN_IMAGE",
                        payload: false,
                        image: {}
                    })
                }} style={{ position: "relative", textDecoration: "none", color: "gray", fontSize: "15px", display: "inline-block", width: "80px", height: "40px", marginRight: "10px", textAlign: "center", lineHeight: "40px" }}><i style={{ marginRight: "8px" }} className="fa-regular fa-image"></i>Images</NavLink>
            </div>


            {
                searchResults.items ?
                    <>
                        {
                            location.pathname === '/images' ?
                                <div style={{ display: "flex", alignItems: "flex-start", padding: "10px 20px", paddingBottom: "1000px" }}>
                                    <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                                        {
                                            searchResults.items.map((item) => {
                                                return (
                                                    <SearchImage item={item} image={item.pagemap ? item.pagemap.cse_thumbnail : undefined} />
                                                )
                                            })
                                        }
                                    </div>
                                    {
                                        openImage ?
                                            <div style={{ width: "50%", background: "red", position: "sticky", top: "50px", padding: "10px", borderRadius: "10px" }}>
                                                <div style={{textAlign: "end"}}>
                                                    <IconButton onClick={() => {
                                                        dispatch({
                                                            type: "OPEN_IMAGE",
                                                            payload: false,
                                                            image: {}
                                                        })
                                                    }} sx={{width: "40px", height: "40px", lineHeight: "40px"}}>x</IconButton>
                                                </div>
                                                <img src={image.src} alt="" style={{ width: "100%" }} />
                                                <div>
                                                    true
                                                </div>
                                            </div>
                                            :
                                            <></>
                                    }
                                </div>
                                :
                                <main style={{ margin: "10px 170px", width: "700px" }}>

                                    {/* search results */}
                                    <div>
                                        <div>
                                            <p style={{ fontSize: "14px", color: "grey" }}>Approximately {searchResults.searchInformation.formattedTotalResults} results found ({searchResults.searchInformation.formattedSearchTime} seconds)</p>
                                        </div>
                                        {
                                            searchResults.items.map((search, index) => {
                                                if (index === 4) {
                                                    return (
                                                        <h5>other searches</h5>
                                                    )
                                                }
                                                return (
                                                    <SearchResult search={search} key={index} />
                                                )
                                            })
                                        }
                                    </div>

                                </main>
                        }
                    </>
                    :
                    <></>
            }
        </div>
    )
}

export default SearchResultsPage