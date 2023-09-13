import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import database, { auth } from '../firebase/firebaseConfig'
import googleImg from '../images/googleAppSignInImg1.png';
import googleVoice from '../images/googleVoice.png';
import googleLens from '../images/googleLens.webp';
import webStore from '../images/webStore.png';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, TextField, Tooltip } from '@mui/material';
import ShortCut from './ShortCut';
import AddIcon from '@mui/icons-material/Add';
import { addDoc, collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import AppsIcon from '@mui/icons-material/Apps';
import CloseIcon from '@mui/icons-material/Close';
import SignInPage from './SignInPage';
import { useDispatch, useSelector } from 'react-redux';

const SearchPage = () => {
  let [searchText, setSearchText] = useState();

  // shortcuts
  let [shortCuts, setShortCuts] = useState();
  let [isShortCutOpen, setIsShortCutOpen] = useState(false);
  let [shortCutName, setShortCutName] = useState();
  let [shortCutURL, setShortCutURL] = useState();

  const searchFunc = (searchText) => {
    console.log(searchText);
  }

  const getShortCuts = () => {
    getDocs(query(collection(database, `users/${auth.currentUser.uid}/shortCuts`), orderBy('dateAdded', 'desc')))
      .then((snapshot) => {
        let shortCuts = [];
        snapshot.forEach((cut) => {
          shortCuts.push({
            ...cut.data(),
            id: cut.id
          });
        })
        setShortCuts(shortCuts);
      })
  }

  useEffect(() => {
    getShortCuts();
  }, []);

  const openShortCutPage = () => {
    setIsShortCutOpen(!isShortCutOpen);
  }

  const addShortCutFunc = () => {
    addDoc(collection(database, `users/${auth.currentUser.uid}/shortCuts`), {
      name: shortCutName,
      url: shortCutURL,
      dateAdded: new Date().getTime()
    })
      .then(() => {
        getShortCuts();
      })
    setIsShortCutOpen(!isShortCutOpen);
  }

  // account settings

  const [anchorEl, setAnchorEl] = useState(null);
  let [addAccount, setAddAccount] = useState(false);
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [name, setName] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let signUpControl = useSelector((state) => {
    return state.signUpControl;
  })
  let dispatch = useDispatch();

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
      {/* apps and account */}
      <div style={{ width: "100%", background: "#fff", padding: "10px 20px", textAlign: "end" }}>
        <NavLink to={``} style={{ fontSize: "12px", marginRight: "10px", color: "#000" }}>
          Gmail
        </NavLink>
        <NavLink to={``} style={{ fontSize: "12px", marginRight: "10px", color: "#000" }}>
          Images
        </NavLink>
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
                bgcolor: '#deeaf6',
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

      {/* search part */}
      <div style={{ width: "100%", height: "calc(70vh - 64px)", marginBottom: "180px", background: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <img src={googleImg} alt="" style={{ width: "300px", marginBottom: "10px" }} />
          <div style={{ width: "600px", margin: "10px 0", display: "flex", background: "#fff", borderRadius: "40px", height: "40px", boxShadow: "0px 1px 6px #20212447" }}>

            <div style={{ width: "50px", textAlign: "center", lineHeight: "40px" }}>
              <i className="fa-solid fa-magnifying-glass m-0 text-muted" style={{ fontSize: "15px" }}></i>
            </div>

            <form className='m-0 p-0' style={{ width: "450px", height: "40px", margin: "10px 0" }} onSubmit={(e) => {
              e.preventDefault();
              searchFunc(searchText);
            }}>
              <input type="text" onChange={(e) => {
                setSearchText(e.target.value);
              }} style={{ width: "100%", height: "100%", outline: "none", border: "none" }} placeholder='Search on Google or type the URL' />
            </form>
            <div style={{ width: "100px" }}>
              <IconButton className='m-0'>
                <img src={googleVoice} alt="" style={{ width: "25px", height: "25px", pointerEvents: "none" }} />
              </IconButton>
              <IconButton className='m-0'>
                <img src={googleLens} alt="" style={{ width: "25px", height: "25px", pointerEvents: "none" }} />
              </IconButton>
            </div>

          </div>
          <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            <ShortCut text={'Web Store'} url={'https://chrome.google.com/webstore/category/extensions?hl=tr'} img={webStore} />

            {
              isShortCutOpen ?
                <div style={{ position: "fixed", top: "50%", left: "50%", backdropFilter: "brightness(0.5)", width: "100%", height: "100vh", transform: "translate(-50%, -50%)", zIndex: "100" }}>
                  <div style={{ position: "absolute", top: "50%", left: "50%", background: "#fff", transform: "translate(-50%, -50%)", width: "500px", padding: "14px" }}>
                    <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: "20px" }}>
                      <small>Add shortcut</small>
                    </div>
                    <form style={{ margin: "10px 0" }}>
                      <TextField size='small' fullWidth id="filled-basic" onChange={(e) => {
                        setShortCutName(e.target.value);
                      }} label="Name" variant="filled" sx={{ mb: "14px" }} />
                      <TextField size='small' fullWidth id="filled-basic" onChange={(e) => {
                        setShortCutURL(e.target.value);
                      }} label="URL" variant="filled" />
                      <Box sx={{ textAlign: "end", my: "14px" }}>
                        <Button size="small" variant='outlined' onClick={openShortCutPage} sx={{ mr: "5px", fontSize: "12px" }}>close</Button>
                        <Button size="small" variant='outlined' onClick={addShortCutFunc} sx={{ fontSize: "12px" }}>Add</Button>
                      </Box>
                    </form>
                  </div>
                </div>
                :
                <></>
            }

            {
              shortCuts ?
                <>
                  {
                    shortCuts.map((shortCut) => {
                      return (
                        <ShortCut text={shortCut.name} url={'https://' + shortCut.url} shortCut={shortCut} />
                      )
                    })
                  }
                </>
                :
                <></>
            }

            <div className='shortCut' onClick={openShortCutPage} style={{ background: "#fff", width: "80px", height: "80px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: "4px" }}>
              <div style={{ borderRadius: "50%", background: "#efefef", width: "40px", height: "40px", textAlign: "center", lineHeight: "40px", marginBottom: "10px" }}>
                <AddIcon />
              </div>
              <small className='d-block m-0 p-0' style={{ fontSize: "12px" }}>Add shortcut</small>
            </div>
          </div>
        </div>
      </div>

      {/* customize chrome */}
      <div style={{ background: "#efefef", padding: "10px 0" }}>
        customize chrome
      </div>
    </div>
  )
}

export default SearchPage