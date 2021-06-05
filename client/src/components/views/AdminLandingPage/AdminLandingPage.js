import React, { useEffect, useState } from 'react'
import "./AdminLandingPage.css"
import { Card, CardTitle, CardImg, CardBody, Row, Col } from 'reactstrap';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Input, Button, Checkbox, Select } from 'antd';
import DownOutlined from '@ant-design/icons/DownOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import 'react-toastify/dist/ReactToastify.css';
import Collapsible from 'react-collapsible';
import { USER_IP } from '../../IPConfig';

function LandingPage(props) {
    const [fotos, setFotos] = useState([]);
    const [loadingValue, setLoadingValue] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [onCollapseValue, setOnCollapseValue] = useState(false);
    const [filterCopyrightSource, setFilterCopyrightSource] = useState(true);
    const [filterAuthor, setFilterAuthor] = useState(true);
    const [filtercreationDate, setFiltercreationDate] = useState(true);
    const [filterTitle, setFilterTitle] = useState(true);
    const [filterImageMaterial, setFilterImageMaterial] = useState(true);
    const [filterCountry, setFilterCountry] = useState(true);
    const [filterCity, setFilterCity] = useState(true);
    const [filterAll, setfilterAll] = useState(true);
    const [filterDescription, setfilterDescription] = useState(true);
    const [mainTagValue, setMainTagValue] = useState('unspecified');

    useEffect(() => {
        getAllFotos();
    }, []);

    function getAllFotos() {
        Axios.post("/api/fotos/allFotos")
            .then(response => {
                if (response.data.success) {
                    //alert("nice!");
                    console.log(response.data.fotos);
                    setFotos(response.data.fotos);
                    if (response.data.fotos.length === 0) {
                        //setDisplayedTextValue("Keine Einträge gefunden!");
                        notifyError("Keine Einträge gefunden!");
                    }
                } else if (response.data.error) {
                    notifyError("Hinzufügen fehlgeschlagen!");
                    notifyError("Fehler: " + response.data.error.code);
                } else {
                    //alert("Zugriff auf Foto-Datenbank fehlgeschlagen!")
                    notifyError("Anmelden um Fotgrafien einzusehen!")
                }
            })
    }

    const onSearch = value => {
        // console.log(filterCopyrightSource)
        // console.log(filterAuthor)
        // console.log(filtercreationDate)
        // console.log(filterTitle)
        // console.log(filterImageMaterial)
        // console.log(filterCountry)
        // console.log(filterCity)
        var mainTag = mainTagValue;
        if (mainTagValue === "unspecified") {
            mainTag = "false";
        }

        const dataToSubmit = {
            searched: value,
            filterCopyrightSource: filterCopyrightSource,
            filterAuthor: filterAuthor,
            filtercreationDate: filtercreationDate,
            filterTitle: filterTitle,
            filterImageMaterial: filterImageMaterial,
            filterCountry: filterCountry,
            filterCity: filterCity,
            mainTag: mainTag,
            filterDescription: filterDescription
        }
        setLoadingValue(true);

        Axios.post("/api/fotos/searchFotos", dataToSubmit)
            .then(response => {
                setLoadingValue(false);
                if (response.data.success) {
                    //alert("nice!");
                    //console.log(response.data.fotos);
                    setFotos(response.data.fotos);
                    if (response.data.fotos.length === 0) {
                        //setDisplayedTextValue("Keine Einträge gefunden!");
                        notifyError("Keine Einträge gefunden!");
                    }
                } else {
                    if (response.data.error) {
                        notifyError("Fehler: " + response.data.error.code);
                    } else {
                        //alert("Zugriff auf Foto-Datenbank fehlgeschlagen!")
                        notifyError("Anmelden um Fotgrafien einzusehen!")
                    }
                }
            })
    };

    function handleChangeSearchValue(event) {
        //console.log(event.target.value);
        if (event.target.value === "") {
            getAllFotos();
        }
        setSearchValue(event.target.value);
    }

    function handleOnCollapseValue() {
        setOnCollapseValue(!onCollapseValue);
    }

    function handleChangefilterCopyrightSource() {
        setFilterCopyrightSource(!filterCopyrightSource);
    }

    function handleChangefilterAuthor() {
        setFilterAuthor(!filterAuthor);
    }

    function handleChangefiltercreationDate() {
        setFiltercreationDate(!filtercreationDate);
    }

    function handleChangefilterTitle() {
        setFilterTitle(!filterTitle);
    }

    function handleChangefilterImageMaterial() {
        setFilterImageMaterial(!filterImageMaterial);
    }

    function handleChangefilterCountry() {
        setFilterCountry(!filterCountry);
    }

    function handleChangefilterCity() {
        setFilterCity(!filterCity);
    }

    function handleChangeFilterDescription() {
        setfilterDescription(!filterDescription);
    }

    function handleChangefiltefilterAll() {
        setFilterCopyrightSource(!filterAll);
        setFilterAuthor(!filterAll);
        setfilterAll(!filterAll);
        setFilterCity(!filterAll);
        setFilterCountry(!filterAll);
        setFilterImageMaterial(!filterAll);
        setFiltercreationDate(!filterAll);
        setFilterTitle(!filterAll);
        setfilterDescription(!filterAll);
    }

    function handleChangeMainTag(value) {
        setMainTagValue(value);
    }

    function handleEditClick(_id) {
        //console.log(_id)
        //console.log(props.user.userData.role)
        if (props.user.userData.role === 1) {
            props.history.push("/fotos/edit/" + _id);
        }
    }

    function handleDeleteClick(_id){

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

    const fotoCards = fotos.map((foto, index) => {
        return (
            <Col key={index} xs="12" sm="6" md="4" lg="4" xl="2" xxl="1" className="card-col">

                <Card id="card-fotodisplay">
                    <Button onClick={() => handleEditClick(foto._fotosid)} type="primary" className="button-adminLandingPage-edit">
                        <EditOutlined />
                    </Button>
                    <Button shape="circle" onClick={() => handleDeleteClick(foto._fotosid)} type="danger" className="button-adminLandingPage-delete">
                        <DeleteOutlined />
                    </Button>
                    <Link to={{
                        pathname: "/fotos/view/" + foto._id,
                        params: fotos,
                        indexValue: index,
                        exact: true,
                        strict: true
                    }}
                        style={{ textDecoration: 'none' }}
                    >
                        <CardBody className="cardBody-landingPage">
                            <div className="div-landingPage-titlebutton">
                                <CardTitle tag="h5" className="card-text">{foto.title}</CardTitle>
                            </div>
                        </CardBody>
                        <div id="card-img-div">
                            <CardImg id="card-img" src={"https://"+USER_IP+":5000/" + foto.compressedImage} alt="Card image cap" />
                        </div>
                        <div className="card-description card-text">
                            {foto.description}
                        </div>
                    </Link>
                </Card>
            </Col >
        )
    });

    return (
        <div className="div-landingPage-main">
            <div className="Searchbar-landingPage">
                <Input.Search
                    placeholder="Nach Fotografien Suchen..."
                    allowClear
                    enterButton="Suchen"
                    loading={loadingValue}
                    size="large"
                    onSearch={onSearch}
                    value={searchValue}
                    onChange={handleChangeSearchValue}
                />
            </div>
            <div className="div-collapsible-landingPage">
                <Collapsible
                    className="collapsible-landingPage"
                    trigger={
                        <Button className="button-landingPage-collapsible" onClick={() => handleOnCollapseValue()}>
                            {onCollapseValue === false ?
                                <DownOutlined className="p-landingPage-collappsiblebutton"></DownOutlined>
                                :
                                <UpOutlined className="p-landingPage-collappsiblebutton"></UpOutlined>
                            }
                            <p className="p-landingPage-collappsiblebutton">Suchfilter</p>
                        </Button>
                    }>
                    <div className="div-landingPage-filtermain">
                        <div className="div-landingpage-checkboxes">
                            <div className="div-landingPage-CheckboxWrapper">
                                <p style={{ fontWeight: "bolder" }} className="p-landingPage-checkboxName">Personalisierte Suche:</p>
                            </div>
                            <div className="div-landingPage-CheckboxWrapper">
                                <Checkbox className="checkbox-landingPage" checked={filterAll} onClick={() => handleChangefiltefilterAll()} />
                                <p className="p-landingPage-checkboxName">Alle Auswählen</p>
                            </div>
                            <div className="div-landingPage-CheckboxWrapper">
                                <Checkbox className="checkbox-landingPage" checked={filterCopyrightSource} onClick={() => handleChangefilterCopyrightSource()} />
                                <p className="p-landingPage-checkboxName">Urheber der Fotografie</p>
                            </div>
                            <div className="div-landingPage-CheckboxWrapper">
                                <Checkbox className="checkbox-landingPage" checked={filterAuthor} onClick={() => handleChangefilterAuthor()} />
                                <p className="p-landingPage-checkboxName">Besiter der Fotografie</p>
                            </div>
                            <div className="div-landingPage-CheckboxWrapper">
                                <Checkbox className="checkbox-landingPage" checked={filtercreationDate} onClick={() => handleChangefiltercreationDate()} />
                                <p className="p-landingPage-checkboxName">Aufnahme Datum</p>
                            </div>
                            <div className="div-landingPage-CheckboxWrapper">
                                <Checkbox className="checkbox-landingPage" checked={filterTitle} onClick={() => handleChangefilterTitle()} />
                                <p className="p-landingPage-checkboxName">Titel der Fotografie</p>
                            </div>
                            <div className="div-landingPage-CheckboxWrapper">
                                <Checkbox className="checkbox-landingPage" checked={filterImageMaterial} onClick={() => handleChangefilterImageMaterial()} />
                                <p className="p-landingPage-checkboxName">Bildmaterial</p>
                            </div>
                            <div className="div-landingPage-CheckboxWrapper">
                                <Checkbox className="checkbox-landingPage" checked={filterCountry} onClick={() => handleChangefilterCountry()} />
                                <p className="p-landingPage-checkboxName">Land</p>
                            </div>
                            <div className="div-landingPage-CheckboxWrapper">
                                <Checkbox className="checkbox-landingPage" checked={filterCity} onClick={() => handleChangefilterCity()} />
                                <p className="p-landingPage-checkboxName">Stadt/Dorf</p>
                            </div>
                            <div className="div-landingPage-CheckboxWrapper">
                                <Checkbox className="checkbox-landingPage" checked={filterDescription} onClick={() => handleChangeFilterDescription()} />
                                <p className="p-landingPage-checkboxName">Beschreibung</p>
                            </div>
                        </div>
                        <div className="select-landingPage-mainTag">
                            <Select
                                onChange={handleChangeMainTag}
                                defaultValue={mainTagValue}
                                className="selection-landingpage"
                            >
                                <Select.Option
                                    value="unspecified"
                                >Beliebige Kategorie</Select.Option>
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
                        </div>
                    </div>
                </Collapsible>
            </div>

            <ToastContainer />
            {
                fotos.length === 0 ?
                    <div className="div-landingPage-displayedText">
                    </div> :
                    <Row className="card-row">
                        {fotoCards}
                    </Row>
            }

        </div >
    )
}

export default LandingPage
