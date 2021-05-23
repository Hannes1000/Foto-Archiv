import React, { useEffect, useState } from 'react'
import "./LandingPage.css"
import { Card, CardTitle, CardText, CardImg, CardBody, Row, Col } from 'reactstrap';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Input, Button } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import Collapsible from 'react-collapsible';

function LandingPage() {
    const [fotos, setFotos] = useState([]);
    const [loadingValue, setLoadingValue] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        getAllFotos();
    }, []);

    function getAllFotos() {
        Axios.post("/api/fotos/allFotos")
            .then(response => {
                if (response.data.success) {
                    //alert("nice!");
                    //console.log(response.data.fotos);
                    setFotos(response.data.fotos);
                    if (response.data.fotos.length === 0) {
                        //setDisplayedTextValue("Keine Einträge gefunden!");
                        notifyError("Keine Einträge gefunden!");
                    }
                } else {
                    //alert("Zugriff auf Foto-Datenbank fehlgeschlagen!")
                    notifyError("Anmelden um Fotgrafien einzusehen!")
                }
            })
    }

    const onSearch = value => {
        const dataToSubmit = {
            searched: value
        }
        setLoadingValue(true);

        Axios.post("/api/fotos/searchFotos", dataToSubmit)
            .then(response => {
                setLoadingValue(false);
                if (response.data.success) {
                    //alert("nice!");
                    console.log(response.data.fotos);
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
                <Link to={{
                    pathname: "/fotos/view",
                    params: fotos
                }}
                    style={{ textDecoration: 'none' }}
                >
                    <Card id="card-fotodisplay">
                        <CardBody className="cardBody-landingPage">
                            <CardTitle tag="h5" className="card-text">{foto.title}</CardTitle>
                        </CardBody>
                        <div id="card-img-div">
                            <CardImg id="card-img" src={"https://localhost:5000/" + foto.compressedImage} alt="Card image cap" />
                        </div>
                        <div className="card-description card-text">
                            {foto.description}
                        </div>
                    </Card>
                </Link>
            </Col >
        )
    });

    return (
        <div className="div-landingPage-main">
            <div className="Searchbar-landingPage">
                <Input.Search
                    placeholder="Nach Fotografien Suchen..."
                    allowClear
                    enterButton="Search"
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
                        <Button className="button-landingPage-collapsible">öhlkasf</Button>
                    }>
                    <p>
                        This is the collapsible content. It can be any element or React
                        component you like.
                </p>
                    <p>
                        It can even be another Collapsible component. Check out the next
                        section!
                </p>
                </Collapsible>
            </div>

            <ToastContainer />
            {fotos.length === 0 ?
                <div className="div-landingPage-displayedText">
                </div> :
                <Row className="card-row">
                    {fotoCards}
                </Row>
            }

        </div>
    )
}

export default LandingPage
