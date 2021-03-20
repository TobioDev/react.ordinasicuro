import React, { Fragment, useEffect, useState } from 'react'
import SezioneBoxed from './SezioneBoxed'
import AzioniRapidePannelloControllo from './AzioniRapidePannelloControllo'

import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from "react-router-dom";

import { Button, Form, Input, TextArea, Label, Dropdown, Image, Select, Modal, Header, Icon, Menu, Table} from 'semantic-ui-react'

import imageCompression from 'browser-image-compression';


const CompressioneImmagini = () => {

    const [ordini, setOrdini] = useState([]);
    const [ urlImgModale, setUrlImgModale] = useState('');
    const [ aperturaModaleImg, setAperturaModaleImg ] = useState(false);

    let history = useHistory();

    useEffect(() => {

        if(localStorage.getItem('infoUtente') === null){

            localStorage.removeItem('infoUtente');
            history.push("/login/");

        }
        else{
        }

    }, [])

    function handleImageUpload(event) {

        var imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
      
        var options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 1920,
          useWebWorker: false
        }
        imageCompression(imageFile, options)
          .then(function (compressedFile) {
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
      
            //return uploadToServer(compressedFile); // write your own logic
            let csvURL = window.URL.createObjectURL(compressedFile);
            let tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', 'compressed.jpg');
            tempLink.click();
          })
          .catch(function (error) {
            console.log(error.message);
          });
      }


    return (
        <Fragment>

            <div className="w-100 flex flex-row items-start justify-center mt6">

                <div className="w-20 dn flex-l  justify-center pt6 pl2" style={{'position' : "sticky", "top" : "0"}}>
                    <AzioniRapidePannelloControllo />
                </div>
                <div className="w-100 w-80-l">

                    <SezioneBoxed>
                        <div className="w-100">
                            <Link to='/pannello-controllo/'>
                                <Button icon labelPosition='left'>
                                    <Icon name='arrow left' />
                                    Torna al Pannello di Controllo
                                </Button>
                            </Link>

                            <h2 >Comprimi la tua immagine</h2>
                            <input type="file" accept="image/*" onChange={(e)=>handleImageUpload(e)} />
                        </div>

                    </SezioneBoxed>

                </div>

            </div>
            
            
            
        </Fragment>
    )
}

export default CompressioneImmagini
