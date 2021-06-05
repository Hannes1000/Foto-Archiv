import React, { useState, useEffect } from 'react'
import FileUpload from "../../utils/FileUpload"
import { Formik } from 'formik';
import { Form, Input, Button, Switch, DatePicker, Select, Typography } from 'antd';
import CopyrightOutlined from '@ant-design/icons/CopyrightOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import CompassOutlined from '@ant-design/icons/CompassOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { WithContext as ReactTags } from 'react-tag-input';
import Axios from 'axios';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./FotoEditingPage.css"
import "./DropAndDragTags.css"

const { Title } = Typography;

function FotoAddingPage(props) {
    const [originalImage, setOriginalImage] = useState([]);
    const [originalImageInitial, setOriginalImageInitial] = useState([]);
    const [compressedImage, setCompressedImage] = useState([]);
    const [compressedImageInitial, setCompressedImageInitial] = useState([]);
    const [mainTagValue, setMainTagValue] = useState('');
    const [imageMaterialValue, setImageMaterialValue] = useState('');
    const [creationDateValue, setCreationDateValue] = useState(moment());
    const [authorValue, setAuthorValue] = useState("");
    const [copyrightSourceValue, setCopyrightSourceValue] = useState("");
    const [titleValue, settitleValue] = useState("");
    const [descriptionValue, setdescriptionValue] = useState("");
    const [locationValue, setlocationValue] = useState("");
    const [cityValue, setcityValue] = useState("");
    const [countryValue, setcountryValue] = useState("");
    const [copyrightSourceIsAuthor, setCopyrightSourceIsAuthor] = useState(false);
    const [newTagValue, setNewTagValue] = useState("");
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const KeyCodes = {
        comma: 188,
        enter: 13,
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const updateOriginalImage = (newImages) => {
        //console.log(newImages)
        setOriginalImage(newImages)
    }

    const updateCompressedImage = (newImages) => {
        //console.log(newImages)
        setCompressedImage(newImages)
    }

    function handleChangeMainTag(value) {
        //console.log(`selected ${value}`);
        setMainTagValue(value);
    }

    function handleImageMaterial(value) {
        //console.log(`selected ${value}`);
        setImageMaterialValue(value);
    }

    function handleChangeCreationDate(date, dateString) {
        //console.log(date + dateString);
        setCreationDateValue(dateString);
    }

    function handleChangeCopyrightSourceIsAuthor() {
        if (copyrightSourceIsAuthor === false) {
            setAuthorValue(copyrightSourceValue);
        }
        if (copyrightSourceIsAuthor === true) {
            setAuthorValue("");
        }
        setCopyrightSourceIsAuthor(!copyrightSourceIsAuthor);
    }

    function handleChangeAuthor(event) {
        setAuthorValue(event.target.value);
    }

    function handleChangeAddTag(event) {
        setNewTagValue(event.target.value);
    }

    function handleChangeCopyrightSource(event) {
        //console.log(copyrightSourceIsAuthor)
        if (copyrightSourceIsAuthor === true) {
            setAuthorValue(copyrightSourceValue);
        }
        setCopyrightSourceValue(event.target.value);
    }

    function handleChangeTitle(event){
        settitleValue(event.target.value);
    }

    function handleChangeDescription(event){
        setdescriptionValue(event.target.value);
    }

    function handleChangeCity(event){
        setcityValue(event.target.value);
    }

    function handleChangeCountry(event){
        setcountryValue(event.target.value);
    }

    function handleChangeLocation(event){
        setlocationValue(event.target.value);
    }

    function handleDeleteTags(i) {
        setTags(tags.filter((tag, index) => index !== i));
    }

    function handleAdditionTags(tag) {
        if (suggestions.find(element => element.text === tag.text)) {
            setTags([...tags, tag])
        }
    }

    function handleDragTags(tag, currPos, newPos) {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    }

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
        progress: undefined,
        onClose: () => props.history.push("/landingPage")
    });

    function handleSaveNewTag(){
        const dataToSubmit = {
            name: newTagValue
        }
        const newTagName = newTagValue;
        setNewTagValue("");

        Axios.post("/api/fotos/addTag", dataToSubmit)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.tagid[1][0]._id)
                    setTags([...tags, { id: response.data.tagid[1][0]._id + "", text: newTagName }])
                    setSuggestions([...suggestions, { id: response.data.tagid[1][0]._id + "", text: newTagName }])
                } else {
                    //alert("Zugriff auf Foto-Datenbank fehlgeschlagen!")
                    notifyError("Kategorien konnten hinzugefügt werden!");
                    notifyError("Fehler: " + response.data.error.code);
                }
            })
    }

    useEffect(() => {
        const dataToSubmit = {
            _id: props.match.params.id
        }
        Axios.post("/api/fotos/getFotoById", dataToSubmit)
        .then(response => {
            if (response.data.success) {
                const fotoData = response.data.fotoData[0];
                //console.log(fotoData)
                //console.log(fotoData.originalImage);
                //console.log(fotoData.compressedImage);
                //setOriginalImage(fotoData.originalImage);
                //setCompressedImage(fotoData.compressedImage);
                setOriginalImageInitial(fotoData.originalImage);
                setCompressedImageInitial(fotoData.compressedImage);
                setMainTagValue(fotoData.mainTag);
                setImageMaterialValue(fotoData.imageMaterial);
                setCreationDateValue(moment(fotoData.creationDate, 'YYYY-MM-DD'));
                setAuthorValue(fotoData.author);
                setCopyrightSourceValue(fotoData.copyrightSource);
                settitleValue(fotoData.title);
                setdescriptionValue(fotoData.description);
                setcityValue(fotoData.city);
                setcountryValue(fotoData.country);
                setlocationValue(fotoData.gpsLocation);
            } else {
                //alert("Zugriff auf Foto-Datenbank fehlgeschlagen!")
                notifyError("Daten konnten nicht geladen werden!");
                notifyError("Fehler: " + response.data.error.code);
            }
        })
    }, []);

    return (
        <Formik
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {

                    let newDate = new Date()
                    let date = newDate.getDate();
                    let month = newDate.getMonth() + 1;
                    let year = newDate.getFullYear();

                    console.log("User         " + props.user.userData._id)
                    console.log("Author       " + authorValue)
                    console.log("copyright    " + copyrightSourceValue)
                    console.log("title        " + titleValue)
                    console.log("maitag       " + mainTagValue)
                    console.log("creationdate " + creationDateValue)
                    //console.log("uploadedDAte " + `${year}${"-"}${month < 10 ? `0${month}` : `${month}`}${"-"}${date}`);
                    console.log("description  " + descriptionValue)
                    console.log("originalimag " + originalImage[0])
                    console.log("compressedim " + compressedImage[0])
                    console.log("gps          " + locationValue)
                    console.log("city         " + cityValue)
                    console.log("country      " + countryValue)
                    console.log("imageMat     " + imageMaterialValue)
                    console.log("tags         " + tags)
                    console.log("id           " + props.match.params.id)
                    //console.log("suggestion   " + suggestions)

                    let dataToSubmit = {
                        _id: props.match.params.id,
                        originalImage: originalImage[0],
                        compressedImage: compressedImage[0],
                        copyrightSource: copyrightSourceValue,
                        author: authorValue,
                        mainTag: mainTagValue,
                        description: descriptionValue,
                        uploadDate: `${year}${"-"}${month < 10 ? `0${month}` : `${month}`}${"-"}${date}`,
                        creationDate: creationDateValue,
                        title: titleValue,
                        gpsLocation: locationValue,
                        country: countryValue,
                        city: cityValue,
                        imageMaterial: imageMaterialValue,
                        tags: tags
                    }

                    Axios.post("/api/fotos/updatePicture", dataToSubmit)
                        .then(response => {
                            if (response.data.success === true) {
                                notify("Änderung gespeichert!");
                                setSubmitting(false);
                            } else {
                                notifyError("Speichern fehlgeschlagen!");
                                notifyError("Fehler: " + response.data.error.code);
                                setSubmitting(false);
                            }
                        })
                }, 1000);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                } = props;
                return (
                    <div className="div-addingPage-main">
                        <Title level={2}>Fotografie bearbeiten</Title>
                        <ToastContainer />
                        <Form onSubmit={handleSubmit} className="form-fotoAddingPage" >

                            <label className="label-fotoAddingPage-titel">Original Fotografie hochladen:</label>
                            <FileUpload className="fileUpload-fotoAddingPage" refreshFunction={updateOriginalImage} defaultImage={originalImageInitial}></FileUpload>

                            <label className="label-fotoAddingPage-titel">Komprimiertes Bild hochladen (*.jpg oder *.png):</label>
                            <FileUpload className="fileUpload-fotoAddingPage" refreshFunction={updateCompressedImage} defaultImage={compressedImageInitial}></FileUpload>

                            <Form.Item>
                                <label className="label-fotoAddingPage-titel">Bildmaterial:</label>

                                <Select
                                    onChange={handleImageMaterial}
                                    value={imageMaterialValue}
                                >
                                    <Select.Option
                                        value="negativ"
                                    >Negativ</Select.Option>
                                    <Select.Option
                                        value="negativ-glas"
                                    >Negativ-Glas</Select.Option>
                                    <Select.Option
                                        value="dia"
                                    >Dia</Select.Option>
                                    <Select.Option
                                        value="fotografie"
                                    >Fotografie</Select.Option>
                                    <Select.Option
                                        value="ansichtskarte"
                                    >Ansichtskarte</Select.Option>
                                    <Select.Option
                                        value="digital"
                                    >Digital</Select.Option>
                                    <Select.Option
                                        value="scan"
                                    >Scan</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item required className="form-item-fotoAddingPage-authorInput">
                                <div className="form-item-fotoAddingPage-divmain">
                                    <div className="form-item-fotoAddingPage-div1">
                                        <label className="label-fotoAddingPage-titel">Urheber:</label>
                                    </div>
                                    <div className="form-item-fotoAddingPage-div2">
                                        <label className="label-fotoAddingPage-titel">Urheber ist Besitzer:</label>
                                        <Switch
                                            value={copyrightSourceIsAuthor}
                                            onChange={handleChangeCopyrightSourceIsAuthor}
                                        />
                                    </div>
                                </div>
                                <Input
                                    id="copyrightSource"
                                    prefix={<CopyrightOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Urheber der Fotografie"
                                    type="text"
                                    value={copyrightSourceValue}
                                    onChange={handleChangeCopyrightSource}
                                    onBlur={handleBlur}
                                    className={
                                        errors.copyrightSource && touched.copyrightSource ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.copyrightSource && touched.copyrightSource && (
                                    <div className="input-feedback">{errors.copyrightSource}</div>
                                )}
                            </Form.Item>

                            <Form.Item required >
                                <label className="label-fotoAddingPage-titel">Besitzer:</label>
                                <Input
                                    id="author"
                                    disabled={copyrightSourceIsAuthor}
                                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Besitzer der Fotografie (kann gleich sein wie Urheber)"
                                    type="text"
                                    value={authorValue}
                                    onChange={handleChangeAuthor}
                                    onBlur={handleBlur}
                                    className={
                                        errors.author && touched.author ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.author && touched.author && (
                                    <div className="input-feedback">{errors.author}</div>
                                )}
                            </Form.Item>

                            <Form.Item required>
                                <label className="label-fotoAddingPage-titel">Titel:</label>
                                <Input
                                    id="title"
                                    prefix={<EditOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Titel der Fotografie"
                                    type="text"
                                    value={titleValue}
                                    onChange={handleChangeTitle}
                                    onBlur={handleBlur}
                                    maxLength={255}
                                    className={
                                        errors.title && touched.title ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.title && touched.title && (
                                    <div className="input-feedback">{errors.title}</div>
                                )}
                            </Form.Item>

                            <Form.Item>
                                <label className="label-fotoAddingPage-titel">Bild Beschreibung:</label>
                                <Input.TextArea
                                    id="description"
                                    placeholder="Beschreibung der Fotografie"
                                    type="text"
                                    value={descriptionValue}
                                    onChange={handleChangeDescription}
                                    onBlur={handleBlur}
                                    className={
                                        errors.description && touched.description ? 'text-input error' : 'text-input'
                                    }
                                    rows={6}
                                    maxLength={5000}
                                />
                                {errors.description && touched.description && (
                                    <div className="input-feedback">{errors.description}</div>
                                )}
                            </Form.Item>

                            <Form.Item>
                                <label className="label-fotoAddingPage-titel">Haupt Zuordnung:</label>

                                <Select
                                    onChange={handleChangeMainTag}
                                    value={mainTagValue}
                                >
                                    <Select.Option
                                        value="building"
                                    >Gebäude</Select.Option>
                                    <Select.Option
                                        value="object"
                                    >Gegenstand</Select.Option>
                                    <Select.Option
                                        value="human"
                                    >Mensch</Select.Option>
                                    <Select.Option
                                        value="location"
                                    >Ortschaft</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <label className="label-fotoAddingPage-titel">Kategorie Zuordnung:</label>
                                <ReactTags
                                    tags={tags}
                                    suggestions={suggestions}
                                    handleDelete={handleDeleteTags}
                                    handleAddition={handleAdditionTags}
                                    handleDrag={handleDragTags}
                                    delimiters={delimiters}
                                    autofocus={false}
                                    minQueryLength={0}
                                    // minQueryLength={suggestions.length > 20 ? 2 : suggestions.length > 10 ? 1 : 0}
                                    inline={false}
                                    allowDeleteFromEmptyInput={false}
                                    placeholder={"Kategorie auswählen"}
                                />
                                <label className="label-fotoAddingPage-titel">Neue Kategorie Hinzufügen:</label>
                                <Input
                                    id="tagadd"
                                    prefix={<PlusOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Kategorie hinzufügen"
                                    type="text"
                                    value={newTagValue}
                                    onChange={handleChangeAddTag}
                                    onBlur={handleBlur}
                                    maxLength={255}
                                />
                                <Button type="primary" className="" onClick={()=>handleSaveNewTag()}>
                                    Kategorie hinzufügen
                                </Button>
                            </Form.Item>

                            <Form.Item className="form-item-fotoAddingPage-creationDate">
                                <label className="label-fotoAddingPage-titel">Erstell Datum der Fotografie:</label>
                                <div>
                                    <DatePicker
                                        onChange={handleChangeCreationDate}
                                        className="datePicker-fotoAddingPage"
                                        value={moment(creationDateValue, 'YYYY-MM-DD')}
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item>
                                <label className="label-fotoAddingPage-titel">GPS Location:</label>
                                <Input
                                    id="gpsLocation"
                                    prefix={<CompassOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Beschreibung der Fotografie"
                                    type="text"
                                    value={locationValue}
                                    onChange={handleChangeLocation}
                                    onBlur={handleBlur}
                                    className={
                                        errors.gpsLocation && touched.gpsLocation ? 'text-input error' : 'text-input'
                                    }
                                    rows={6}
                                    maxLength={5000}
                                />
                                {errors.gpsLocation && touched.gpsLocation && (
                                    <div className="input-feedback">{errors.gpsLocation}</div>
                                )}
                            </Form.Item>

                            <Form.Item>
                                <label className="label-fotoAddingPage-titel">Stadt/Dorf:</label>
                                <Input
                                    id="city"
                                    prefix={<CompassOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Beschreibung der Fotografie"
                                    type="text"
                                    value={cityValue}
                                    onChange={handleChangeCity}
                                    onBlur={handleBlur}
                                    className={
                                        errors.city && touched.city ? 'text-input error' : 'text-input'
                                    }
                                    rows={6}
                                    maxLength={5000}
                                />
                                {errors.city && touched.city && (
                                    <div className="input-feedback">{errors.city}</div>
                                )}
                            </Form.Item>

                            <Form.Item>
                                <label className="label-fotoAddingPage-titel">Land:</label>
                                <Input
                                    id="country"
                                    prefix={<CompassOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Beschreibung der Fotografie"
                                    type="text"
                                    value={countryValue}
                                    onChange={handleChangeCountry}
                                    onBlur={handleBlur}
                                    className={
                                        errors.country && touched.country ? 'text-input error' : 'text-input'
                                    }
                                    rows={6}
                                    maxLength={5000}
                                />
                                {errors.country && touched.country && (
                                    <div className="input-feedback">{errors.country}</div>
                                )}
                            </Form.Item>

                            <Form.Item>
                                <div>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                        Änderungen Speichern
                                    </Button>
                                </div>
                            </Form.Item>

                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default FotoAddingPage