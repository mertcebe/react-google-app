import { IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import googleIcon from '../images/googleIcon.png'
import { NavLink } from 'react-router-dom'

const SearchResult = ({ search }) => {
    useEffect(() => {
        document.querySelector(`.htmlTitle-${search.cacheId}`).innerHTML = search.htmlTitle;
    }, []);
    return (
        <div style={{width: "100%", margin: "20px 0"}}>
            <div style={{ display: "flex", alignItems: "end" }}>
                <div style={{ background: "#efefef", borderRadius: "50%", width: "30px", height: "30px", textAlign: "center", lineHeight: "25px", marginRight: "10px" }}>
                    <img src={search.pagemap.cse_image[0].src ? search.pagemap.cse_image[0].src : googleIcon} alt="" style={{ width: "20px", height: "20px" }} />
                </div>
                <div>
                    <p className='m-0' style={{ fontSize: "14px" }}>{search.title}</p>
                    <small style={{ display: "block", fontSize: "12px", color: "grey" }}>{search.displayLink}</small>
                </div>
                <IconButton >
                    <MoreVertIcon sx={{ fontSize: "16px" }} />
                </IconButton>
            </div>

            <div>
                <NavLink to={search.link} className={`htmlTitle htmlTitle-${search.cacheId} m-0`} style={{textDecoration: "none", color: "#1a73e8", fontSize: "18px"}}></NavLink>
                <p className={`m-0 text-muted`} style={{fontSize: "14px", width: "90%"}}>{search.snippet}</p>
            </div>
        </div>
    )
}

export default SearchResult