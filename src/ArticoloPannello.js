import React, { Fragment, useState, useEffect } from 'react'
import { Divider, Icon, Header} from 'semantic-ui-react'

import { HashLink as Link } from 'react-router-hash-link';

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

const ArticoloPannello = ({id, visibilita, nome, tipologia, id_categoria_articolo, descrizione, unita_misura, prezzo, url_immagine, register, setValue, componentiArticolo, associazioniComponenteArticolo, avviaModaleImg }) => {



    //Per registrare valore Dropdown Semantic UI
    // const handleChange = (e, { name, value }) => {setValue(name, value)}
    // useEffect( (id) => {register("componenti"+id);},[register])

    useEffect( () => {
        
    },[])


    // const stampaSelectComponenti = (componentiArticolo, associazioniComponenteArticolo, id) => {
    //     let arrayOpzioniComponenti = [];
    //     associazioniComponenteArticolo
    //         .filter( associazione => associazione.id_articolo === id)
    //         .map( associazioneFiltrata => componentiArticolo
    //                                         .filter( componente => componente.id === associazioneFiltrata.id_componente)
    //                                         .map( componenteFiltrato => arrayOpzioniComponenti.push({key: componenteFiltrato.nome, text: componenteFiltrato.nome, value: componenteFiltrato.id}))
    //         )
    //     if(arrayOpzioniComponenti.length>0)
    //     return (<Dropdown onChange={handleChange} name={"componenti"+id} id={"componenti"+id} placeholder='Seleziona le opzioni per questo prodotto' fluid multiple selection clearable options={arrayOpzioniComponenti}/>)
    // } 
    

    const link_img = (url_immagine) => {
        if(url_immagine!== ''){
            return <img style={{width:"85px", height: "85px"}} className="fl mr3 img-articolo br3 pointer" src={"https://www.ordinasicuro.it/img_articoli/img_articoli_compressed/" + url_immagine } onClick={() => avviaModaleImg(url_immagine)} alt="" />
        }
    }




    let escapeNome = nome.replace("\\\'", "\'")
    let escapeDescrizione = descrizione.replace("\\\'", "\'")

    let prezzoUnita = () => {
        if(unita_misura.toLowerCase() !== 'pz' ){
            return '€ '+prezzo+' / '+unita_misura
        }
        else{
            return '€ '+prezzo
        }
    }

    let randomNumber = Math.floor(1000 + Math.random() * 9000);

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
                        <Link to={'/modifica-articolo/' + randomNumber + id}>
                            <Button variant="contained" startIcon={<CreateIcon />} style={{backgroundColor: '#17a2b8', color: 'white'}}>
                                Modifica
                            </Button>
                        </Link>
                        <Link to={'/duplica-articolo/' + randomNumber + id}>
                            <Button variant="contained" startIcon={<FileCopyIcon />} style={{backgroundColor: '#ffc107', color: 'black'}}>
                                Duplica
                            </Button>
                        </Link>
                        <Link to={'/elimina-articolo/' + randomNumber + id}>
                            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                                Elimina
                            </Button>
                        </Link>
                        <Button variant="contained" startIcon={<LinkIcon />}>
                            Condividi
                        </Button>
                        <Button variant="contained" startIcon={<VisibilityIcon />}>
                            Visibile
                        </Button>
                        </div>
                    </div>
                    <div className="w-100 flex dn-l justify-start items-center">
                        <div className="flex items-center w-100" style={{justifyContent : 'space-evenly'}}>
                            <Link to={'/modifica-articolo/' + randomNumber + id}>
                                <IconButton style={{backgroundColor: '#17a2b8', color: 'white'}}>
                                    <CreateIcon />
                                </IconButton>
                            </Link>
                            <Link to={'/duplica-articolo/' + randomNumber + id}>
                                <IconButton style={{backgroundColor: '#ffc107', color: 'black'}}>
                                    <FileCopyIcon />
                                </IconButton>
                            </Link>
                            <Link to={'/elimina-articolo/' + randomNumber + id}>
                                <IconButton  style={{backgroundColor: '#dc3545', color: 'white'}}>
                                    <DeleteIcon />
                                </IconButton>
                            </Link>
                            <IconButton  style={{backgroundColor: '#e0e0e0', color: 'black'}}>
                                <LinkIcon />
                            </IconButton>
                            <IconButton  style={{backgroundColor: '#e0e0e0', color: 'black'}}>
                                <VisibilityIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className="w-100 mv2 flex items-start justify-end">
                    <p className="w-40 f5 titolo flex justify-end"><b>{prezzoUnita()}</b></p>
                </div>

            </div>

            {/* <div className="w-100 pa4 ba b--black-20 br3 mb2">
                <div className="w-100 flex items-start justify-start">
                    <p className="w-60 f4 fw7 titolo mb0">{escapeNome}</p>
                    <p className="w-40 f4 titolo flex justify-end">{prezzoUnita()}</p>
                </div>
                <div className="w-100 mt3 flex items-start justify-start">
                    {link_img(url_immagine)}
                    <p className="sottotitolo">{escapeDescrizione}</p>
                </div>
                <div className="w-100 mt3 flex justify-start items-center">
                    {stampaSelectComponenti(componentiArticolo, associazioniComponenteArticolo, id) }
                </div>
                <div className="w-100 mt3 flex justify-start items-center">
                    <div className="flex justify-start items-center w-70">
                        <p className="mh2 mv0">{unita_misura}</p> 
                        <input ref={register} name={"quantita"+id} id={"quantita"+id} className="input-reset ba b--black-20 pa2 mv0 mr2 w-20 w-10-l" value={quantita} type="text" aria-describedby="name-desc"/>
                        <Button type="button" color='red' content='-' onClick={diminuisci} />
                        <Button type="button" color='green' content='+' onClick={aggiungi} />
                    </div>
                    <div className="flex justify-end items-center w-30 titolo fw7">
                        <Button disabled={disabilitaNota} type="button" primary onClick={comparsaNota}>Nota</Button>
                    </div>
                </div>
                <div className={"w-100 mt3 justify-start items-center " + visibilitaNota}>
                    <textarea ref={register} name={"nota"+id} id={"nota"+id} rows="10" className="w-100 pa2" placeholder="Inserisci qui una tua nota per questo prodotto..."></textarea>
                </div>
            </div> */}
            
        </Fragment>
    )
}

export default ArticoloPannello