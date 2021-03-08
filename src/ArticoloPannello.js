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


// import { Dropdown } from 'semantic-ui-react'

import  './ArticoloPannello.css'

const ArticoloPannello = ({id, idCategoriaArticolo, visibilita, nome, descrizione, unita_misura, prezzo, url_immagine, avviaModaleImg }) => {

    const [varVisibilita, setVarVisibilita] = useState(true);

    let randomNumber = Math.floor(1000 + Math.random() * 9000);

    let history = useHistory();

    useEffect( () => {

        if(visibilita === '1'){
            setVarVisibilita(true);
        }
        else if (visibilita === '0'){
            setVarVisibilita(false);
        }
        
    },[])
    

    const link_img = (url_immagine) => {
        if(url_immagine!== ''){
            return <img style={{width:"85px", height: "85px"}} className="fl mr3 img-articolo br3 pointer" src={"https://www.ordinasicuro.it/670914_920408/lib/img_articoli/img_articoli_compressed/" + url_immagine } onClick={() => avviaModaleImg(url_immagine)} alt="" />
        }
    }

    const handleChangeVisibilita = () => {

        fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/change_visibilita_articolo/' + randomNumber + id + '/')
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
        localStorage.setItem('ultimaCategoria', idCategoriaArticolo );
        //console.log('pos', window.pageYOffset);
        history.push(indirizzo);

    }



    let escapeNome = nome.replaceAll("\\\'", "\'")
    escapeNome = nome.replaceAll("\\\"", "\"")
    let escapeDescrizione = descrizione.replaceAll("\\\'", "\'")
    escapeDescrizione = descrizione.replaceAll("\\\"", "\"")

    let prezzoUnita = () => {
        if(unita_misura.toLowerCase() !== 'pz' ){
            return '€ '+prezzo+' / '+unita_misura
        }
        else{
            return '€ '+prezzo
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


    return (
        <Fragment>
            <div id={"cardArticolo"+id} className="w-100 pv2 ph3 shadow-3 br4 mb2">
                <div className="w-80 mv2 mh0 flex items-start justify-start">
                    {link_img(url_immagine)}
                    <div>
                        <h1 className="f5 fw7 titolo mb0">{escapeNome}</h1>
                        <p className="sottotitolo f5 mt3-l mt2">{escapeDescrizione}</p>
                    </div>
                </div>
                {/* <Divider /> */}
                <div className="w-100 mt4 mb2 flex items-start justify-between">
                    <div className="w-100 dn flex-l justify-start items-center">
                        <div className="flex items-center w-100" style={{justifyContent : 'space-evenly'}}>
                            <Button onClick={() => pushHistory('/modifica-articolo/' + randomNumber + id)} variant="contained" startIcon={<CreateIcon />} style={{backgroundColor: '#17a2b8', color: 'white'}}>
                                Modifica
                            </Button>
                            <Button onClick={() => pushHistory('/duplica-articolo/' + randomNumber + id)} variant="contained" startIcon={<FileCopyIcon />} style={{backgroundColor: '#ffc107', color: 'black'}}>
                                Duplica
                            </Button>
                            <Button onClick={() => pushHistory('/elimina-articolo/' + randomNumber + id)} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
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
                            <IconButton onClick={() => pushHistory('/modifica-articolo/' + randomNumber + id)} style={{backgroundColor: '#17a2b8', color: 'white'}}>
                                <CreateIcon />
                            </IconButton>
                            <IconButton onClick={() => pushHistory('/duplica-articolo/' + randomNumber + id)} style={{backgroundColor: '#ffc107', color: 'black'}}>
                                <FileCopyIcon />
                            </IconButton>
                            <IconButton onClick={() => pushHistory('/elimina-articolo/' + randomNumber + id)} style={{backgroundColor: '#dc3545', color: 'white'}}>
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
                <div className="w-100 mv2 flex items-start justify-end">
                    <p className="w-40 f5 titolo flex justify-end"><b>{prezzoUnita()}</b></p>
                </div>

            </div>
            
        </Fragment>
    )
}

export default ArticoloPannello