import React, { Fragment, useState, useEffect } from 'react'
import { Divider} from 'semantic-ui-react'

import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CreateIcon from '@material-ui/icons/Create';
import LinkIcon from '@material-ui/icons/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { useSnackbar } from 'notistack';


// import { Dropdown } from 'semantic-ui-react'

import  './ArticoloPannello.css'

const ArticoloPannello = ({infoArticolo, avviaModaleImg }) => {

    const { enqueueSnackbar } = useSnackbar();

    const [varVisibilita, setVarVisibilita] = useState(true);

    let randomNumber = Math.floor(1000 + Math.random() * 9000);

    let history = useHistory();

    useEffect( () => {

        if(infoArticolo.visibilita === '1'){
            setVarVisibilita(true);
        }
        else if (infoArticolo.visibilita === '0'){
            setVarVisibilita(false);
        }
        
    },[])
    

    const link_img = (url_immagine) => {
        if(url_immagine!== ''){
            return <img style={{width:"85px", height: "85px"}} className="fl mr3 img-articolo br3 pointer" src={"https://www.ordinasicuro.it/670914_920408/lib/img_articoli/img_articoli_compressed/" + url_immagine } onClick={() => avviaModaleImg(url_immagine)} alt="" />
        }
    }

    const handleChangeVisibilita = () => {

        fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/change_visibilita_articolo/' + randomNumber + infoArticolo.id + '/')
        .then(response => response.text())
        .then(risp => {
            console.log(risp);
            if(risp === 'ok'){
                setVarVisibilita(!varVisibilita);
            }
            else{
                alert("Errore nell\'aggiornamento della visibilita. Riprovare più tardi");
            }
                }
        );

    }


    const stampaBottoneVisibilita = (v) => {
        if(v){

        return <Button onClick={handleChangeVisibilita} variant="contained" startIcon={<VisibilityIcon />}>
                    Visibile
                </Button>

        }
        else {

            return <Button onClick={handleChangeVisibilita} style={{backgroundColor: '#ffc107', color: 'black'}} variant="contained" startIcon={<VisibilityOffIcon />}>
                    Non Visibile
                </Button>
        }
    }

    const stampaBottoneVisibilitaMobile = (v) => {
        if(v){

        return <IconButton onClick={handleChangeVisibilita} style={{backgroundColor: '#e0e0e0', color: 'black'}}>
                    <VisibilityIcon />
                </IconButton>

        }
        else {

            return <IconButton onClick={handleChangeVisibilita} style={{backgroundColor: '#ffc107', color: 'black'}} variant="contained">
                    <VisibilityOffIcon />
                </IconButton>
        }
    }

    const pushHistory = (indirizzo) => {

        localStorage.setItem('posizioneCategoria', window.pageYOffset);
        localStorage.setItem('ultimaCategoria', infoArticolo.idCategoriaArticolo );
        //console.log('pos', window.pageYOffset);
        history.push(indirizzo);

    }



    let escapeNome = infoArticolo.nome.replaceAll("\\\'", "\'")
    escapeNome = infoArticolo.nome.replaceAll("\\\"", "\"")
    let escapeDescrizione = infoArticolo.descrizione.replaceAll("\\\'", "\'")
    escapeDescrizione = infoArticolo.descrizione.replaceAll("\\\"", "\"")

    let prezzoUnita = () => {
        if(infoArticolo.unita_misura.toLowerCase() !== 'pz' ){
            return '€ '+infoArticolo.prezzo+' / '+infoArticolo.unita_misura
        }
        else{
            return '€ '+infoArticolo.prezzo
        }
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));

    const classes = useStyles();

    const handlePosizione = (e) => {

        if(e.target.value!== ''){

            const formDataPosizione = new FormData();

            formDataPosizione.append('id_articolo', infoArticolo.id);
            formDataPosizione.append('nuova_posizione', e.target.value);

            console.log(formDataPosizione.get('id_articolo'));
            console.log(formDataPosizione.get('nuova_posizione'));

            const requestOptionsPosizione = {
                method: 'POST',
                body: formDataPosizione
            };


            fetch('https://ordinasicuro.it/670914_920408/lib/api/aggiorna_ordine_articolo/', requestOptionsPosizione)
                .then(response => response.text())
                .then(dati => {
                    console.log(dati);
                    if(dati==="ok"){
                        let message = "Posizione aggiornata!"
                        enqueueSnackbar(message, { 
                            variant: 'success',
                            autoHideDuration: 1500,
                        });

                    }
                    else{

                        let message = "Errore nell'aggiornamento della posizione!"
                        enqueueSnackbar(message, { 
                            variant: 'error',
                            autoHideDuration: 1500,
                        });


                    }

                });

        }

    }


    return (
        <Fragment>
            <div id={"cardArticolo"+infoArticolo.id} className="w-100 pv2 ph3 shadow-3 br4 mb2">
                <div className="w-80 mv2 mh0 flex items-start justify-start">
                    {link_img(infoArticolo.url_immagine)}
                    <div>
                        <h1 className="f5 fw7 titolo mb0">{escapeNome}</h1>
                        <p className="sottotitolo f5 mt3-l mt2">{escapeDescrizione}</p>
                    </div>
                </div>
                {/* <Divider /> */}
                <div className="w-100 mt4 mb2 flex items-start justify-between">
                    <div className="w-100 dn flex-l justify-start items-center">
                        <div className="flex items-center w-100" style={{justifyContent : 'space-evenly'}}>
                            <Button onClick={() => pushHistory('/modifica-articolo/' + randomNumber + infoArticolo.id)} variant="contained" startIcon={<CreateIcon />} style={{backgroundColor: '#17a2b8', color: 'white'}}>
                                Modifica
                            </Button>
                            <Button onClick={() => pushHistory('/duplica-articolo/' + randomNumber + infoArticolo.id)} variant="contained" startIcon={<FileCopyIcon />} style={{backgroundColor: '#ffc107', color: 'black'}}>
                                Duplica
                            </Button>
                            <Button onClick={() => pushHistory('/elimina-articolo/' + randomNumber + infoArticolo.id)} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                                Elimina
                            </Button>
                        {/* <Button variant="contained" startIcon={<LinkIcon />}>
                            Condividi
                        </Button> */}
                        {stampaBottoneVisibilita(varVisibilita)}
                        </div>
                    </div>
                    <div className="w-100 flex dn-l justify-start items-center">
                        <div className="flex items-center w-100" style={{justifyContent : 'space-evenly'}}>
                            <IconButton onClick={() => pushHistory('/modifica-articolo/' + randomNumber + infoArticolo.id)} style={{backgroundColor: '#17a2b8', color: 'white'}}>
                                <CreateIcon />
                            </IconButton>
                            <IconButton onClick={() => pushHistory('/duplica-articolo/' + randomNumber + infoArticolo.id)} style={{backgroundColor: '#ffc107', color: 'black'}}>
                                <FileCopyIcon />
                            </IconButton>
                            <IconButton onClick={() => pushHistory('/elimina-articolo/' + randomNumber + infoArticolo.id)} style={{backgroundColor: '#dc3545', color: 'white'}}>
                                <DeleteIcon />
                            </IconButton>
                            {/* <IconButton  style={{backgroundColor: '#e0e0e0', color: 'black'}}>
                                <LinkIcon />
                            </IconButton> */}
                            {stampaBottoneVisibilitaMobile(varVisibilita)}
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className="w-100 mv2 flex items-start justify-between">
                    <p>Posizione: <input type="number" placeholder={infoArticolo.ordine} onChange={(e)=>handlePosizione(e)} step="1" style={{width: "50px"}}></input></p>
                    <p className="w-40 f5 titolo flex justify-end"><b>{prezzoUnita()}</b></p>
                </div>
            </div>
            
        </Fragment>
    )
}

export default ArticoloPannello