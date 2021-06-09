import React, { useState, useEffect } from 'react'
import FileUpload from "../../utils/FileUpload"
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Switch, DatePicker, Select, Typography } from 'antd';
import CopyrightOutlined from '@ant-design/icons/CopyrightOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import CompassOutlined from '@ant-design/icons/CompassOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { WithContext as ReactTags } from 'react-tag-input';
import Axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./FotoAddingPage.css"
import "./DropAndDragTags.css"

const { Title } = Typography;

function FotoAddingPage(props) {
    const [originalImage, setOriginalImage] = useState([]);
    const [compressedImage, setCompressedImage] = useState([]);
    const [mainTagValue, setMainTagValue] = useState('building');
    const [imageMaterialValue, setImageMaterialValue] = useState('negativ');
    const [creationDateValue, setCreationDateValue] = useState(moment());
    const [authorValue, setAuthorValue] = useState("");
    const [copyrightSourceValue, setCopyrightSourceValue] = useState("");
    const [copyrightSourceIsAuthor, setCopyrightSourceIsAuthor] = useState(false);
    const [newTagValue, setNewTagValue] = useState("");
    const [tags, setTags] = useState([
    ]);
    const [suggestions, setSuggestions] = useState([
        {
            id: "0",
            text: "Bauernhof"
        },
        {
            id: "1",
            text: "Kirche"
        },
        {
            id: "2",
            text: "Gasthof"
        }
    ]);


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

    function handleSaveNewTag() {
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
        Axios.post("/api/fotos/allTags")
            .then(response => {
                if (response.data.success) {
                    //alert("nice!");
                    //console.log(response.data.tags);
                    var arrTags = []
                    for (let i = 0; i < response.data.tags.length; i++) {
                        arrTags.push({ id: response.data.tags[i]._id + "", text: response.data.tags[i].name });
                        //console.log(response.data.tags[i]._id.toString() + "  " + response.data.tags[i].name )
                    }
                    setSuggestions(arrTags);
                } else {
                    //alert("Zugriff auf Foto-Datenbank fehlgeschlagen!")
                    notifyError("Kategorien konnten nicht geladen werden!");
                    notifyError("Fehler: " + response.data.error.code);
                }
            })
    }, []);

    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
                gpsLocation: '',
                city: '',
                country: ''
            }}
            validationSchema={Yup.object().shape({
                title: Yup.string()
                    .required('Titel muss vorhanden sein'),
                gpsLocation: Yup.string()
                    .required('GPS-Location muss vorhanden sein'),
                // author: Yup.string()
                //     .required('Besitzer der Fotografie muss angegeben werden'),
                // copyrightSource: Yup.string()
                //     .required('Urheber der Fotografie muss angegeben werden')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    /*let dataToSubmit = {
                        email: values.email,
                        password: values.password
                    };*/

                    let newDate = new Date()
                    let date = newDate.getDate();
                    let month = newDate.getMonth() + 1;
                    let year = newDate.getFullYear();

                    console.log("User         " + props.user.userData._id)
                    console.log("Author       " + authorValue)
                    console.log("copyright    " + copyrightSourceValue)
                    console.log("title        " + values.title)
                    console.log("maitag       " + mainTagValue)
                    console.log("creationdate " + creationDateValue)
                    //console.log("uploadedDAte " + `${year}${"-"}${month < 10 ? `0${month}` : `${month}`}${"-"}${date}`);
                    console.log("description  " + values.description)
                    console.log("originalimag " + originalImage[0])
                    console.log("compressedim " + compressedImage[0])
                    console.log("gps          " + values.gpsLocation)
                    console.log("city         " + values.city)
                    console.log("country      " + values.country)
                    console.log("imageMat     " + imageMaterialValue)
                    console.log("tags         " + tags)
                    //console.log("suggestion   " + suggestions)

                    let dataToSubmit = {
                        _userid: props.user.userData._id,
                        originalImage: originalImage[0],
                        compressedImage: compressedImage[0],
                        copyrightSource: copyrightSourceValue,
                        author: authorValue,
                        mainTag: mainTagValue,
                        description: values.description,
                        uploadDate: `${year}${"-"}${month < 10 ? `0${month}` : `${month}`}${"-"}${date}`,
                        creationDate: creationDateValue,
                        title: values.title,
                        gpsLocation: values.gpsLocation,
                        country: values.country,
                        city: values.city,
                        imageMaterial: imageMaterialValue,
                        tags: tags
                    }

                    Axios.post("/api/fotos/uploadFoto", dataToSubmit)
                        .then(response => {
                            if (response.data.success === true) {
                                notify("Fotografie hinzugefügt!");
                                setSubmitting(false);
                            } else {
                                notifyError("Hinzufügen fehlgeschlagen!");
                                notifyError("Fehler: " + response.data.error.code);
                                setSubmitting(false);
                            }
                        })
                }, 500);
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
                        <div className="div-fotoAddingPage-Background">
                            <Title style={{color:"white"}} level={2}>Fotografie hinzufügen</Title>
                            <ToastContainer />
                            <Form onSubmit={handleSubmit} className="form-fotoAddingPage" >

                                <label className="label-fotoAddingPage-titel">Original Fotografie hochladen:</label>
                                <FileUpload className="fileUpload-fotoAddingPage" refreshFunction={updateOriginalImage}></FileUpload>

                                <label className="label-fotoAddingPage-titel">Komprimiertes Bild hochladen (*.jpg oder *.png):</label>
                                <FileUpload className="fileUpload-fotoAddingPage" refreshFunction={updateCompressedImage}></FileUpload>

                                <Form.Item>
                                    <label className="label-fotoAddingPage-titel">Bildmaterial:</label>

                                    <Select
                                        onChange={handleImageMaterial}
                                        defaultValue={imageMaterialValue}
                                    >
                                        <Select.Option
                                            className="option-fotoAddingPage"
                                            value="negativ"
                                        >Negativ</Select.Option>
                                        <Select.Option
                                            className="option-fotoAddingPage"
                                            value="negativ-glas"
                                        >Negativ-Glas</Select.Option>
                                        <Select.Option
                                            className="option-fotoAddingPage"
                                            value="dia"
                                        >Dia</Select.Option>
                                        <Select.Option
                                            className="option-fotoAddingPage"
                                            value="fotografie"
                                        >Fotografie</Select.Option>
                                        <Select.Option
                                            className="option-fotoAddingPage"
                                            value="ansichtskarte"
                                        >Ansichtskarte</Select.Option>
                                        <Select.Option
                                            className="option-fotoAddingPage"
                                            value="digital"
                                        >Digital</Select.Option>
                                        <Select.Option
                                            className="option-fotoAddingPage"
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
                                        value={values.title}
                                        onChange={handleChange}
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
                                        value={values.description}
                                        onChange={handleChange}
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
                                        defaultValue={mainTagValue}
                                    >
                                        <Select.Option
                                            className="option-fotoAddingPage"
                                            value="building"
                                        >Gebäude</Select.Option>
                                        <Select.Option
                                            className="option-fotoAddingPage"
                                            value="object"
                                        >Gegenstand</Select.Option>
                                        <Select.Option
                                            className="option-fotoAddingPage"
                                            value="human"
                                        >Mensch</Select.Option>
                                        <Select.Option
                                            className="option-fotoAddingPage"
                                            value="location"
                                        >Ortschaft</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item>
                                    <label className="label-fotoAddingPage-titel">Kategorie Zuordnung:</label>
                                    <ReactTags
                                        className="reactTages-fotoaddingPage-tags"
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
                                        prefix={<PlusOutlined style={{ color: '#000 !important' }} />}
                                        placeholder="Kategorie hinzufügen"
                                        type="text"
                                        value={newTagValue}
                                        onChange={handleChangeAddTag}
                                        onBlur={handleBlur}
                                        maxLength={255}
                                    />
                                    <Button type="primary" className="" onClick={() => handleSaveNewTag()}>
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
                                        value={values.gpsLocation}
                                        onChange={handleChange}
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
                                        value={values.city}
                                        onChange={handleChange}
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
                                        style={{color:"blue"}}
                                        prefix={<CompassOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Beschreibung der Fotografie"
                                        type="text"
                                        value={values.country}
                                        onChange={handleChange}
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
                                            Fotografie Speichern
                                    </Button>
                                    </div>
                                </Form.Item>

                            </Form>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export default FotoAddingPage