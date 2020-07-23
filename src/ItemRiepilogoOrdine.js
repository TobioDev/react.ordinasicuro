import React, { Fragment } from 'react'

import { List } from 'semantic-ui-react'


const ItemRiepilogoOrdine = ({articoloOrdinato, infoArticoloFiltrato}) => {

    const quantita = articoloOrdinato.quantita;

    let prezzo = (infoArticoloFiltrato.prezzo*1).toFixed(2);

    //prezzo = arrotondaNumero2Decimali(prezzo, 2);
    const prezzoTotale = (quantita*prezzo).toFixed(2);

    const stampaNota = () => {

        if(articoloOrdinato.nota!==''){
                return <Fragment><b> Nota: </b>{articoloOrdinato.nota}</Fragment>

        }

    }

    return (
        <Fragment>
            <List.Item>
                <List.Icon name='caret square right' size='large' verticalAlign='middle' />
                <List.Content> 
                    <List.Header className="f4">{infoArticoloFiltrato.nome}</List.Header>
                    <List.Description className="mt2">
                        <b>Quantità: </b>{quantita}
                        <br />
                        <b> Prezzo totale: €</b>{prezzoTotale} ({quantita} x €{prezzo})
                        <br />
                        {stampaNota()}
                    </List.Description>
                </List.Content>
            </List.Item>
            
        </Fragment>
    )
}

export default ItemRiepilogoOrdine
