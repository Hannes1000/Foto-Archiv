import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';

function ViewingPage(props) {
    const [fotos, setFotos] = useState([]);

    useEffect(() => {
        if (props.location.params == null) {
            props.history.push("/")
            return
        }
        var arrFotos = []
        for (let i = 0; i < props.location.params.length; i++) {
            arrFotos.push({ "original": "https://localhost:5000/" + props.location.params[i].compressedImage, "thumbnail": "https://localhost:5000/" + props.location.params[i].compressedImage });
            console.log(props.location.params[i].compressedImage)
        }
        setFotos(arrFotos);
    }, []);


    return (
        <>
            <ImageGallery items={fotos} />;
        </>
    )
}

export default ViewingPage
