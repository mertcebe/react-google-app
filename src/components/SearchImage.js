import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SearchImage = ({ item, image }) => {
    let [openImage, myImage] = useSelector((state) => {
        return [state.searchReducer.openImage, state.searchReducer.image];
    })
    let dispatch = useDispatch();
    if (image) {
        return (
            <div style={{ margin: "14px" }}>
                <img src={image[0].src} alt="" width={image[0].width} height={image[0].height} onClick={() => {
                    console.log('qwdqwdqwd')
                    if (myImage.src !== image[0].src) {
                        dispatch({
                            type: "OPEN_IMAGE",
                            payload: true,
                            image: {
                                src: image[0].src
                            }
                        })
                    }
                    else{
                        dispatch({
                            type: "OPEN_IMAGE",
                            payload: !openImage,
                            image: {
                                src: image[0].src
                            }
                        })
                    }
                }} />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ background: "#efefef", borderRadius: "50%", width: "30px", height: "30px", textAlign: "center", lineHeight: "25px", marginRight: "10px" }}>
                        <img src={image[0].src} alt="" style={{ width: "20px", height: "20px" }} />
                    </div>
                    <small style={{ display: "block", fontSize: "12px" }}>{item.displayLink}</small>
                </div>
                <p className='m-0' style={{ fontSize: "12px", color: "grey", width: Number(image[0].width) }}>{item.title}</p>
            </div>
        )
    }
}

export default SearchImage