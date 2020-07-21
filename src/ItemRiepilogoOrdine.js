import React from 'react'

import { List } from 'semantic-ui-react'


const ItemRiepilogoOrdine = ({articoloOrdinato, infoArticoloFiltrato}) => {

    const quantita = articoloOrdinato.quantita;

    let prezzo = (infoArticoloFiltrato.prezzo*1).toFixed(2);

    //prezzo = arrotondaNumero2Decimali(prezzo, 2);
    const prezzoTotale = (quantita*prezzo).toFixed(2);

    return (
        <List.Item>
            <List.Icon name='caret square right' size='large' verticalAlign='middle' />
            <List.Content> 
                <List.Header className="f4">{infoArticoloFiltrato.nome}</List.Header>
                <List.Description className="mt2"><b>Quantità: </b>{quantita}<br></br><b> Prezzo totale: €</b>{prezzoTotale} ({quantita} x €{prezzo})</List.Description>
            </List.Content>
        </List.Item>  
    )
}

export default ItemRiepilogoOrdine
