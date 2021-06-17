import React, { useState, useEffect, useRef } from 'react'
import ImageGallery from 'react-image-gallery';
import {USER_IP} from "./../../IPConfig";
import {
  Typography,
  Input
} from 'antd';

import "./ViewingPage.css"

const { Title } = Typography;

function ViewingPage(props) {
  const [fotos, setFotos] = useState([]);
  const [fotoData, setFotoData] = useState([]);
  const [startIndexValue, setStartIndexValue] = useState(0);
  const refImg = useRef(0);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [titleValue, settitleValue] = useState("");
  const [copyrightSourceValue, setcopyrightSourceValue] = useState("");
  const [authorValue, setauthorValue] = useState("");
  const [creationDate, setcreationDateValue] = useState("");
  const [coutnryValue, setcoutnryValue] = useState("");
  const [cityValue, setcityValue] = useState("");

  useEffect(() => {
    if (props.location.params == null) {
      /*RELOAD*/
      //have to request again to get data from mysql
      //props.match.params.id
      //also on landing page overgive search options to search again for every picture
      props.history.push("/landingPage")
      return
    }
    var arrFotos = []
    for (let i = 0; i < props.location.params.length; i++) {
      arrFotos.push({ "original": "https://"+USER_IP+":5000/" + props.location.params[i].compressedImage, "thumbnail": "https://"+USER_IP+":5000/" + props.location.params[i].compressedImage, "thumbnailTitle": props.location.params[i].title });
      //console.log(props.location.params[i].compressedImage)
    }
    setFotos(arrFotos);
    setFotoData(props.location.params);
    setStartIndexValue(props.location.indexValue);

    setDescriptionValue(props.location.params[props.location.indexValue].description);
    settitleValue(props.location.params[props.location.indexValue].title);
    setcityValue(props.location.params[props.location.indexValue].city);
    setcopyrightSourceValue(props.location.params[props.location.indexValue].copyrightSource);
    setcoutnryValue(props.location.params[props.location.indexValue].country);
    var d = new Date(props.location.params[props.location.indexValue].creationDate);
    setcreationDateValue(d.toDateString());
    setauthorValue(props.location.params[props.location.indexValue].author);
  }, []);

  function handleSlide(index) {
    setDescriptionValue(fotoData[index].description);
    settitleValue(fotoData[index].title);
    setcityValue(fotoData[index].city);
    setcopyrightSourceValue(fotoData[index].copyrightSource);
    setcoutnryValue(fotoData[index].country);
    var d = new Date(fotoData[index].creationDate);
    setcreationDateValue(d.toDateString());
    setauthorValue(fotoData[index].author);
  }

  return (
    <div className="div-vieingPage-main">
      <div className="div-backgroundBox-viewingPage">
        <div className="div-backgroundBox2-viewingPage">
          <div className="div-viewingPage-main-title">
            <Title className="title-viewingPage-main" level={2}>Bilder Galerie</Title>
            <Title className="title-viewingPage-title" level={4}>{titleValue}</Title>
          </div>

          <ImageGallery
            className="imageGallery-viewingPage"
            ref={refImg}
            items={fotos}
            startIndex={startIndexValue}
            thumbnailPosition="left"
            showBullets={true}
            showIndex={true}
            onSlide={handleSlide}
          />

          <div className="div-viewingPage-description">
            <label className="input-viewingPage-all title-viewinpage-smaller">Beschreibung</label>
            <label style={{whiteSpace:"pre-wrap"}} className="input-viewingPage-all label-viewingpage-display">
              {descriptionValue}
            </label>
            <div className="div-viewingPage-line"></div>

            <label className="input-viewingPage-all title-viewinpage-smaller">Urheber</label>
            <label className="input-viewingPage-all label-viewingpage-display">
              {copyrightSourceValue}
            </label>
            <div className="div-viewingPage-line"></div>

            <label className="input-viewingPage-all title-viewinpage-smaller">Besitzer</label>
            <label className="input-viewingPage-all label-viewingpage-display">
              {authorValue}
            </label>
            <div className="div-viewingPage-line"></div>

            <label className="input-viewingPage-all title-viewinpage-smaller">Datum</label>
            <label className="input-viewingPage-all label-viewingpage-display">
              {creationDate}
            </label>
            <div className="div-viewingPage-line"></div>

            <label className="input-viewingPage-all title-viewinpage-smaller">Land</label>
            <label className="input-viewingPage-all label-viewingpage-display">
              {coutnryValue}
            </label>
            <div className="div-viewingPage-line"></div>

            <label className="input-viewingPage-all title-viewinpage-smaller">Stadt/Dorf</label>
            <label className="input-viewingPage-all label-viewingpage-display">
              {cityValue}
            </label>
            <div className="div-viewingPage-line"></div>
          </div>

          {/* <button onClick={() => console.log(refImg.current.getCurrentIndex())}>kjhlkkj</button> */}
        </div>
      </div>
    </div>
  )
}

export default ViewingPage
