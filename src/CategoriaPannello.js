import React, { Fragment } from 'react'

import { useHistory } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';

import { Divider, Icon, Header} from 'semantic-ui-react'

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


const CategoriaPannello = ({id, nome, id_negozio, posizione}) => {

    const { enqueueSnackbar } = useSnackbar();

    let escapeNome = nome.replace("\\\'", "\'")
    let history = useHistory();
    let randomNumber = Math.floor(1000 + Math.random() * 9000);

    //Stile per Material UI ##########################################
    //##################################################################
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
    }));

    const classes = useStyles();
    //##################################################################
    //##############################################################

    const handlePosizione = (e) => {

        if(e.target.value!== ''){

            const formDataPosizione = new FormData();

            formDataPosizione.append('id_categoria_articolo', id);
            formDataPosizione.append('nuova_posizione', e.target.value);

            console.log(formDataPosizione.get('id_categoria_articolo'));
            console.log(formDataPosizione.get('nuova_posizione'));

            const requestOptionsPosizione = {
                method: 'POST',
                body: formDataPosizione
            };


            fetch('https://ordinasicuro.it/670914_920408/lib/api/aggiorna_ordine_categoria/', requestOptionsPosizione)
                .then(response => response.text())
                .then(dati => {
                    console.log(dati);
                    if(dati==="ok"){
                        let message = "Posizione aggiornata!"
                        enqueueSnackbar(message, { 
                            variant: 'success',
                        });

                    }
                    else{

                        let message = "Errore nell'aggiornamento della posizione!"
                        enqueueSnackbar(message, { 
                            variant: 'error',
                        });


                    }

                });

        }

    }

    return (
        <Fragment>

            <div id={"cardArticolo"+id} className="w-100 pv2 ph3 shadow-3 br4 mb2">
                <div className="w-80 mv2 mh0 flex items-start justify-start">
                    <div>
                        <h1 className="f4 fw7 titolo mb0">{escapeNome}</h1>
                        {/* <p className="sottotitolo f5 mt3-l mt2">{escapeDescrizione}</p> */}
                    </div>
                </div>
                {/* <Divider /> */}
                <div className="w-100 mt4 mb2 flex items-start justify-between">
                    <div className="w-100 dn flex-l justify-start items-center">
                        <div className="flex items-center w-100" style={{justifyContent : 'space-evenly'}}>
                        <Link to={'/modifica-categoria/' + randomNumber + id}>
                            <Button variant="contained" startIcon={<CreateIcon />} style={{backgroundColor: '#17a2b8', color: 'white'}}>
                                Modifica
                            </Button>
                        </Link>
                        <Link to={'/elimina-categoria/' + randomNumber + id}>
                            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                                Elimina
                            </Button>
                        </Link>
                        {/* <Button variant="contained" startIcon={<VisibilityIcon />}>
                            Visibile
                        </Button> */}
                        </div>
                    </div>
                    <div className="w-100 flex dn-l justify-start items-center">
                        <div className="flex items-center w-100" style={{justifyContent : 'space-evenly'}}>
                            <Link to={'/modifica-categoria/' + randomNumber + id}>
                                <IconButton style={{backgroundColor: '#17a2b8', color: 'white'}}>
                                    <CreateIcon />
                                </IconButton>
                            </Link>
                            <Link to={'/elimina-categoria/' + randomNumber + id}>
                                <IconButton  style={{backgroundColor: '#dc3545', color: 'white'}}>
                                    <DeleteIcon />
                                </IconButton>
                            </Link>
                            {/* <IconButton  style={{backgroundColor: '#e0e0e0', color: 'black'}}>
                                <VisibilityIcon />
                            </IconButton> */}
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className="w-100 mv2 flex items-start justify-end">
                    {/* <p className="w-40 f5 titolo flex justify-end"><b>{prezzoUnita()}</b></p> */}
                    <p>Posizione di visualizzazione nel tuo negozio: <input type="number" onChange={(e)=>handlePosizione(e)} step="1" placeholder={posizione} style={{width: "50px"}}></input></p>
                </div>

            </div>
            
        </Fragment>
    )
}

export default CategoriaPannello
