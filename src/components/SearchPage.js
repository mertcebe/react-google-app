import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import database, { auth } from '../firebase/firebaseConfig'
import googleImg from '../images/googleAppSignInImg1.png';
import googleVoice from '../images/googleVoice.png';
import googleLens from '../images/googleLens.webp';
import webStore from '../images/webStore.png';
import { Box, Button, IconButton, TextField } from '@mui/material';
import ShortCut from './ShortCut';
import AddIcon from '@mui/icons-material/Add';
import { addDoc, collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';

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
            ...cut.data()
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

  return (
    <div>
      {/* apps and account */}
      <div style={{ width: "100%", background: "#efefef", padding: "20px 0" }}>
        apps and account
      </div>

      {/* search part */}
      <div style={{ width: "100%", height: "calc(70vh - 64px)", marginBottom: "178px", background: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
              shortCuts?
                <>
                  {
                    shortCuts.map((shortCut) => {
                      return (
                        <ShortCut text={shortCut.name} url={'https://'+shortCut.url} />
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