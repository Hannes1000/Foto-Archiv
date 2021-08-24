import React, { useState, useEffect } from 'react'
import Dropzone from "react-dropzone"
import { Icon } from "antd"
import "./NewFileUpload.css"
import Axios from "axios"
import { USER_IP } from '../IPConfig'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import Collapsible from 'react-collapsible';
import { Input, Button, Checkbox, Select } from 'antd';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
//import { DownloadOutlined } from '@ant-design/icons';


function NewFileUpload(props) {

    const [images, setImages] = useState([]);
    const [imagesWatermark, setImagesWatermark] = useState([]);
    const [imagesSmall, setImagesSmall] = useState([]);
    const [decideImage, setDecideImage] = useState([])
    const [onCollapseValue, setOnCollapseValue] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const [currentSelected, setCurrentSelected] = useState(null);

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { "content-type": "multipart/form-data" }
        }
        const imageName = {
            imagename: files[0].name
        }
        formData.append("file", files[0])
        //console.log(files[0].name)

        //Collapsible
        setOnCollapseValue([...onCollapseValue, { state: false }]);
        //Selected
        setSelectedValue([...selectedValue, { state: false }]);
        //Image
        setImages([...images, null]);
        let imagePos = images.length;
        //console.log(imagePos);

        // setImageLoadValue([...imageLoadValue, true]);
        // let loadPosition = images.length;

        //check if image exists
        Axios.post("/api/fotos/checkImagePath", imageName)
            .then(response => {
                if (response.data.success) {
                    //save the Image
                    Axios.post("/api/fotos/uploadImage", formData, config)
                        .then(response => {
                            if (response.data.success) {
                                //props.refreshFunction([...images, response.data.image])
                                let newImages = [...images];
                                newImages[imagePos] = response.data.image;
                                setImages(newImages);

                                let newImagesWatermark = [...imagesWatermark];
                                newImagesWatermark[imagePos] = response.data.imageWatermark;
                                setImagesWatermark(newImagesWatermark);
                                
                                let newImagesSmall = [...imagesSmall];
                                newImagesSmall[imagePos] = response.data.imageSmall;
                                setImagesSmall(newImagesSmall);
                            } else {
                                notifyError("Bild konnt nich hochgeladen werden")
                                notifyError("Fehler: " + response.data.error)
                            }
                        })
                } else {
                    let originalpath = response.data.path;
                    Axios.post("/api/fotos/uploadImage", formData, config)
                        .then(response => {
                            if (response.data.success) {
                                setDecideImage([...decideImage, { id: imagePos, path: originalpath, newpath: response.data.image }]);
                                notifyError("Bild: " + response.data.image + " bereits vorhanden!")
                            } else {
                                notifyError("Bild konnt nich hochgeladen werden")
                                notifyError("Fehler: " + response.data.error)
                            }
                        })
                    //console.log(response.data.path)
                }
            })
    }

    const onDelete = (image) => {
        const currentIndex = images.indexOf(image);

        //Collapsible
        let newcollapseValue = [...onCollapseValue]
        newcollapseValue.splice(currentIndex, 1)
        setOnCollapseValue(newcollapseValue);

        //Selected
        let newselectValue = [...selectedValue]
        newselectValue.splice(currentIndex, 1)
        setSelectedValue(newselectValue);

        //image
        let newImages = [...images]
        newImages.splice(currentIndex, 1)
        setImages(newImages);
        // props.refreshFunction(newImages);

        const dataToSubmit = {
            image: image
        }

        Axios.post("/api/fotos/deleteImage", dataToSubmit)
            .then(response => {
                if (response.data.success) {
                    notify("Bild: " + image + " gelöscht")
                } else {
                    notifyError("Bild konnt nicht richtig gelöscht werden")
                    notifyError("Fehler: " + response.data.error);
                }
            })
    }


    function handleOnCollapseValue(index) {
        let newCollapseValue = [...onCollapseValue];
        newCollapseValue[index].state = !newCollapseValue[index].state;
        setOnCollapseValue(newCollapseValue);
        // console.log(newCollapseValue[index]);
        // console.log(index)
        // console.log(onCollapseValue);
        // console.log(onCollapseValue[index])
    }

    function handleOnSelectImage(index) {
        let newSelectedValue = [...selectedValue];
        newSelectedValue.forEach((item, index) => {
            newSelectedValue[index].state = false;
        })
        newSelectedValue[index].state = true;
        setSelectedValue(newSelectedValue);

        //set selected name
        setCurrentSelected(index);
    }

    useEffect(() => {

    }, []);

    const notifyError = (text) => toast.error(text, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });;

    const notify = (text) => toast.success(text, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });

    function handleRemoveDecideImage(index) {
        const newList = decideImage.filter((item) => item.id != index);
        setDecideImage(newList);
    }

    function onDecideNewImage(index, oldimg, newimg) {
        let imagename = oldimg;
        let newoldimagenameindex = oldimg.indexOf(".")
        var add = "(duplikat)";
        let newoldimagename = [oldimg.slice(0, newoldimagenameindex), add, oldimg.slice(newoldimagenameindex)].join('');
        //rename old
        const dataToSubmit = {
            image: oldimg,
            newname: newoldimagename
        }
        Axios.post("/api/fotos/renameImage", dataToSubmit)
            .then(response => {
                if (response.data.success) {
                    //rename new
                    const dataToSubmit2 = {
                        image: newimg,
                        newname: imagename
                    }
                    Axios.post("/api/fotos/renameImage", dataToSubmit2)
                        .then(response => {
                            if (response.data.success) {
                                //add old to arr
                                let newImages = [...images];
                                newImages[index] = imagename;
                                setImages(newImages);
                            } else {
                                notifyError("Bild konnt nicht richtig umbennent werden")
                                notifyError("Fehler: " + response.data.error);
                            }
                        })
                } else {
                    notifyError("Bild konnt nicht richtig umbennent werden")
                    notifyError("Fehler: " + response.data.error);
                }
            })
        handleRemoveDecideImage(index);
    }

    function onDecideOldImage(index, oldimg, newimg) {
        //add old to arr
        let newImages = [...images];
        newImages[index] = oldimg;
        setImages(newImages);

        //delete new
        const dataToSubmit = {
            image: newimg
        }
        Axios.post("/api/fotos/deleteImage", dataToSubmit)
            .then(response => {
                if (response.data.success) {
                    notify("Bild: " + newimg + " gelöscht")
                } else {
                    notifyError("Bild konnt nicht richtig gelöscht werden")
                    notifyError("Fehler: " + response.data.error);
                }
            })
        handleRemoveDecideImage(index);

        /*LOAD DATA OF FOTO*/
    }

    /*
    useEffect(() => {
        //console.log(props.defaultImage)
        if(props.defaultImage){
            setImages([props.defaultImage])
            props.refreshFunction([props.defaultImage])
        }
    }, [props.defaultImage]);*/

    return (
        <div className="div-main">
            {/* {decideImage.map((item) => (
                <div>{item.id + item.path}</div>
            ))} */}
            <ToastContainer />
            <div className="div-newfileupload-container">
                <div className="div-newfileUpload-displayPicture">
                    <div className="div-newfileupload-displayImage">
                        <div className="div-newFileUpload-imagesrow div-newfilupload-displayImage-childs">
                            {imagesWatermark.map((image, index) => (
                                <>
                                    {
                                        image != null ?
                                            <div onClick={() => handleOnSelectImage(index)} style={selectedValue[index].state === true ? { border: "8px solid #026B79" } : {}} className="div-newfileupload-imagecontainer" key={index} >
                                                <div className="div-buttonuploadpage-deletimage">
                                                    <button onClick={() => onDelete(image)} className="button-uploadpage-deleteimage"><i class="icon-newfileupload-delete fa fa-trash"></i></button>
                                                </div>
                                                <img className="img-newfileupload-images" src={`https://` + USER_IP + `:5000/${image}`} alt={`${image}`}></img>
                                            </div>
                                            :
                                            <>{
                                                decideImage.filter((item) => item.id == index).length > 0 ?
                                                    <div onClick={() => handleOnSelectImage(index)} style={selectedValue[index].state === true ? { border: "8px solid #026B79" } : {}} className="div-newfileupload-imagecontainer" key={index} >
                                                        <div className="div-newfileupload-decidedisplay">
                                                            <div className="div-newfileupload-blocktopdecide">
                                                                <div className="div-newfileupload-blockdecide1">
                                                                    <p className="p-newfileupload-decidedisplay">Altes Foto behalten</p>
                                                                    <img onClick={() => onDecideOldImage(index, decideImage.filter((item) => item.id == index)[0].path, decideImage.filter((item) => item.id == index)[0].newpath)} className="img-newfileupload-decideimg" src={`https://` + USER_IP + `:5000/${decideImage.filter((item) => item.id == index)[0].path}`} alt={`${image}`}></img>
                                                                </div>
                                                                <div className="div-newfileupload-blockdecide2">
                                                                    <p className="p-newfileupload-decidedisplay">Mit neuem Foto ersetzen</p>
                                                                    <img onClick={() => onDecideNewImage(index, decideImage.filter((item) => item.id == index)[0].path, decideImage.filter((item) => item.id == index)[0].newpath)} className="img-newfileupload-decideimg" src={`https://` + USER_IP + `:5000/${decideImage.filter((item) => item.id == index)[0].newpath}`} alt={`${image}`}></img>
                                                                </div>
                                                            </div>
                                                            <div className="div-newfileupload-blockbottomdecide">
                                                                <div className="div-newfileupload-blockdecide3">

                                                                </div>
                                                                <div className="div-newfileupload-blockdecide4">

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div onClick={() => handleOnSelectImage(index)} style={selectedValue[index].state === true ? { border: "8px solid #026B79" } : {}} className="div-newfileupload-imagecontainer" key={index} >
                                                        <div className="loading-newfileupload-loadingdisplay">
                                                            <SyncLoader loading={true} color="#026B79" size={40}></SyncLoader>
                                                        </div>
                                                    </div>
                                            }</>
                                    }
                                </>

                            ))}
                        </div>
                        <div className="div-newfilupload-displayImage-childs">
                            <div className="div-newFileUpload-imagesrow div-newfilupload-displayImage-childs">
                                {imagesSmall.map((image, index) => (
                                    <Collapsible
                                        className="collabsible-newfileupload"
                                        open={onCollapseValue[index].state}
                                        trigger={
                                            <Button className="button-uploadingpage-collapsible" onClick={() => handleOnCollapseValue(index)}>
                                                {onCollapseValue[index].state === false ?
                                                    <DownOutlined className="p-uploadingpage-collappsiblebutton"></DownOutlined>
                                                    :
                                                    <UpOutlined className="p-uploadingpage-collappsiblebutton"></UpOutlined>
                                                }
                                                <p className="p-uploadingpage-collappsiblebutton">Original Fotografie Ansehen</p>
                                            </Button>
                                        }>
                                        <div className="div-newfileupload-imagecontainer" key={index} onClick={() => onDelete(image)}>
                                            <img className="img-newfileupload-images" src={`https://` + USER_IP + `:5000/${image}`} alt={image}></img>
                                            <SyncLoader loading={false} size={30}></SyncLoader>
                                        </div>
                                    </Collapsible>
                                ))}
                            </div>
                        </div>
                        <div className="div-newfilupload-displayImage-childs">

                        </div>
                    </div>
                </div>
                <div className="div-fileupload-bottomdisplay-container">
                    <div
                        className="div-fileupload-namedisplay"
                    >
                        <>{currentSelected != null ? <>{images[currentSelected] != null ? <p>{images[currentSelected].split("/")[1].split(".")[0]}</p> : <></>}</> : <p>Nichts Ausgewählt</p>}</>
                    </div>

                    <div
                        className="dropzone-newFileupload"
                    >
                        <Dropzone
                            onDrop={onDrop}
                            multiple={true}
                            maxSize={800000000}
                            className="dropzone-newfileupload-dropzone"
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div className=""
                                    {...getRootProps()}
                                >
                                    {/* {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })} */}
                                    <input {...getInputProps()} />
                                    <Icon type="plus" style={{ fontSize: '2.8rem' }} />
                                </div>
                            )}
                        </Dropzone>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default NewFileUpload


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
