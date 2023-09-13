import { Avatar } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const ShortCut = ({ text, url, img }) => {
    return (
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
    )
}

export default ShortCut