import React, { useState, useEffect, useRef } from 'react'
import ImageGallery from 'react-image-gallery';
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
      arrFotos.push({ "original": "https://localhost:5000/" + props.location.params[i].compressedImage, "thumbnail": "https://localhost:5000/" + props.location.params[i].compressedImage, "thumbnailTitle": props.location.params[i].title });
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
    setcreationDateValue(props.location.params[props.location.indexValue].creationDate);
    setauthorValue(props.location.params[props.location.indexValue].author);
  }, []);

  function handleSlide(index) {
    setDescriptionValue(fotoData[index].description);
    settitleValue(fotoData[index].title);
    setcityValue(fotoData[index].city);
    setcopyrightSourceValue(fotoData[index].copyrightSource);
    setcoutnryValue(fotoData[index].country);
    setcreationDateValue(fotoData[index].creationDate);
    setauthorValue(fotoData[index].author);
  }

  return (
    <div className="div-vieingPage-main">
      <div className="div-backgroundBox-viewingPage">
        <div className="div-backgroundBox2-viewingPage">

        </div>
      </div>
      <Title className="title-viewingPage-main" level={2}>Bilder Galerie</Title>
      <Title className="title-viewinpage-smaller" level={4}>{titleValue}</Title>
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
      <div className="div-viewingPage-descritption">
        <Title className="title-viewinpage-smaller title-viewingpage-description" level={4}>Beschreibung</Title>
        <Input.TextArea className="input-viewingPage-all"
          value={descriptionValue}
          rows={6}
        >
        </Input.TextArea>
      </div>
      <label className="title-viewinpage-smaller">Urheber</label>
      <Input className="input-viewingPage-all"
        value={copyrightSourceValue}
      >
      </Input>
      <label className="title-viewinpage-smaller">Besitzer</label>
      <Input className="input-viewingPage-all"
        value={authorValue}
      >
      </Input>
      <label className="title-viewinpage-smaller">Datum</label>
      <Input className="input-viewingPage-all"
        value={creationDate}
      >
      </Input>
      <label className="title-viewinpage-smaller">Land</label>
      <Input className="input-viewingPage-all"
        value={coutnryValue}
      >
      </Input>
      <label className="title-viewinpage-smaller">Stadt/Dorf</label>
      <Input className="input-viewingPage-all"
        value={cityValue}
      >
      </Input>
      {/* <button onClick={() => console.log(refImg.current.getCurrentIndex())}>kjhlkkj</button> */}
    </div>
  )
}

export default ViewingPage
