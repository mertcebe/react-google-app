import { Avatar, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import database, { auth } from '../firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ShortCut = ({ text, url, img, shortCut }) => {
    let [shortCutName, setShortCutName] = useState();
    let [shortCutURL, setShortCutURL] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteShortCut = () => {
        deleteDoc(doc(database, `users/${auth.currentUser.uid}/shortCuts/${shortCut.id}`))
            .then(() => {
                setAnchorEl(null);
            })
    }

    let isShortCutOpen = useSelector((state) => {
        return state.searchReducer.isShortCutOpen;
    })
    let dispatch = useDispatch();

    const editShortCutOpen = () => {
        dispatch({
            type: "OPEN_SHORTCUT",
            payload: !isShortCutOpen,
            editShortCutOpen: {
                ...shortCut
            }
        })
        handleClose();
    }

    return (
        <div className='shortCutOne' style={{ position: "relative" }}>
            {
                img ?
                    <></>
                    :
                    <div id='shortCutOptions'>
                        <IconButton
                            sx={{ position: "absolute", top: "0px", right: "0px", zIndex: "30", width: "24px", height: "24px" }}
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon sx={{ fontSize: "16px" }} />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={editShortCutOpen}>Edit the shortcut</MenuItem>
                            <MenuItem onClick={deleteShortCut}>Delete</MenuItem>
                        </Menu>
                    </div>
            }
            <NavLink to={url} className='shortCut' style={{ background: "#fff", width: "80px", height: "80px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: "4px", textDecoration: "none", color: "#000" }}>

                {
                    img ?
                        <div style={{ borderRadius: "50%", background: "#efefef", width: "40px", height: "40px", textAlign: "center", lineHeight: "40px", marginBottom: "10px" }}>
                            <img src={img} alt="" style={{ width: "20px", height: "20px", pointerEvents: "none" }} />
                        </div>
                        :
                        <div style={{ borderRadius: "50%", background: "#efefef", width: "40px", height: "40px", textAlign: "center", lineHeight: "40px", marginBottom: "10px" }}>
                            <Avatar sx={{ width: 40, height: 40 }}>{text[0]}</Avatar>
                        </div>
                }

                <small className='d-block m-0 p-0' style={{ fontSize: "12px" }}>{text}</small>
            </NavLink>
        </div>
    )
}

export default ShortCut