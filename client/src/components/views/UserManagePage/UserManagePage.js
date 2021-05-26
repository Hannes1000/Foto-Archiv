import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap';
import Switch from '@material-ui/core/Switch';
import "./UserManagePage.css";


function UserManagePage(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.post("/api/users/getAllUsers")
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users);
                    //console.log(response.data.users);
                } else {
                    //alert("Zugriff auf Foto-Datenbank fehlgeschlagen!")
                    notifyError("Kategorien konnten hinzugefügt werden!");
                    notifyError("Fehler: " + response.data.error.code);
                }
            })
    }, []);

    function edtiSingleUser(_id, role) {
        const dataToSubmit = {
            role: role,
            _id: _id
        }
        Axios.post("/api/users/editSingle", dataToSubmit)
            .then(response => {
                if (response.data.success) {
                    notify("Benutzer erfolgreich aktualisiert!");
                } else {
                    //alert("Zugriff auf Foto-Datenbank fehlgeschlagen!")
                    notifyError("Kategorien konnten hinzugefügt werden!");
                    notifyError("Fehler: " + response.data.error.code);
                }
            })
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
    });

    const userCards = users.map((user, index) => {
        return (
            <Col key={index} xs="12" sm="6" md="4" lg="4" xl="2" xxl="1" className="card-col">
                <Card className="card-fotodisplay-usermanagePage">
                    <CardBody className="cardBody-landingPage">
                        <CardTitle tag="h5" className="card-text">{user.email}</CardTitle>
                    </CardBody>
                    <CardText>
                        <label className="label-usermanagePage-admin">Administrator</label>
                    </CardText>
                    <Switch onChange={()=>edtiSingleUser(user._id, user.role)} className="switch-usermanagePage" defaultChecked={user.role === 1 ? true : false} color="secondary">

                    </Switch>
                </Card>
            </Col >
        )
    });

    return (
        <div className="div-userManagePage-main">
            <ToastContainer />
            <Row className="card-row">
                {userCards}
            </Row>
        </div>
    )
}

export default UserManagePage
