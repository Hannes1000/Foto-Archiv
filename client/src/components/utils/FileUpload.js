import React, { useState } from 'react'
import Dropzone from "react-dropzone"
import { Icon } from "antd"
import "./FileUpload.css"
import Axios from "axios"


function FileUpload(props) {

    const [images, setImages] = useState([]);

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { "content-type": "multipart/form-data" }
        }
        formData.append("file", files[0])

        //save the Image
        Axios.post("/api/fotos/uploadImage", formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...images, response.data.image])
                    props.refreshFunction([...images, response.data.image])
                } else {
                    alert("Failed to save the Image")
                }
            })
    }
    
    const onDelete = (image) => {
        const currentIndex = images.indexOf(image);
        let newImages = [...images]
        newImages.splice(currentIndex, 1)
        setImages(newImages);
        props.refreshFunction(newImages);
    }

    return (
        <div className="div-main">
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
                className="dropzone-fileUpload"
            >
                {({ getRootProps, getInputProps }) => (
                    <div className="div-dropzone"
                        {...getRootProps()}
                    >
                        {/* {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })} */}
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div className="div-fileUpload-displayPicture">
                <div className="div-displayImage">
                    {images.map((image, index) => (
                        <div key={index} onClick={() => onDelete(image)}>
                            <img className="img-images" src={`https://localhost:5000/${image}`} alt={`productImg-${index}`}></img>
                        </div>
                    ))}
                </div>
                <label className="label-fileUpload">(Bildvorschau)</label>
            </div>
        </div>
    )
}


export default FileUpload


/*import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';
import "./FileUpload.css"

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server
        Axios.post('/api/fotos/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])
                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div className="div-main">
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
                className="div-dropzone"
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })}
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload
*/
