import React, { Fragment } from 'react'

import { List } from 'semantic-ui-react'


const ItemRiepilogoOrdine = ({articoloOrdinato, infoArticoloFiltrato, componentiArticolo, associazioniOrdineComponenteArticolo}) => {

    const quantita = articoloOrdinato.quantita;

    let prezzo = (infoArticoloFiltrato.prezzo*1).toFixed(2);

    //prezzo = arrotondaNumero2Decimali(prezzo, 2);
    const prezzoTotale = (quantita*prezzo).toFixed(2);

    const stampaNota = () => {

        if(articoloOrdinato.nota!==''){
                return <Fragment><b> Nota: </b>{articoloOrdinato.nota}</Fragment>

        }

    }

    const stampaComponenti = () => {
        if(infoArticoloFiltrato.tipologia==='composto'){

            let risultato = []
            for (let index = 0; index < articoloOrdinato.quantita; index++) {

                risultato.push(
                    <Fragment> <b>{(index*1)+1}</b> 
                    {associazioniOrdineComponenteArticolo
                        .filter( associazione => associazione.replica*1 === (index*1)+1)
                        .map( associazioneFiltrata =>
                                componentiArticolo.filter( componente => componente.id === associazioneFiltrata.id_componente)
                                                    .map(componenteFiltrato => <Fragment>{' - '+componenteFiltrato.nome}</Fragment>)
                                )}

                        <br />
                    </Fragment>
                ) 

            }
            return risultato;

        }
        
    }

    return (
        <Fragment>
            <List.Item key={articoloOrdinato.id}>
                <List.Icon name='caret square right' size='large' verticalAlign='middle' />
                <List.Content> 
                    <List.Header className="f4"><div className="mt2">{infoArticoloFiltrato.nome}</div></List.Header>
                    <List.Description className="mt2">
                        <b>Quantità: </b>{quantita}
                        <br />
                        <b> Prezzo totale: €</b>{prezzoTotale} ({quantita} x €{prezzo})
                        <br />
                        {stampaNota()}
                        
                        <div className='mt3 mb2'>
                            {stampaComponenti()}
                        </div>
                    </List.Description>
                </List.Content>
            </List.Item>
            
        </Fragment>
    )
}

export default ItemRiepilogoOrdine
