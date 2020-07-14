import React from 'react'
import Articolo from './Articolo'
import SezioneBoxed from './SezioneBoxed'

const ListaArticoli = ({articoli, categorieArticoli}) => {

    const stampaArticoliPerCategoria = categorieArticoli
                                        .map( (categoriaArticolo) => (
                                            <div>
                                                <h1>{categoriaArticolo.nome}</h1>
                                                {articoli.filter((articolo) =>
                                                    articolo.id_categoria_articolo === categoriaArticolo.id
                                                )
                                                .map((articoloFiltrato) => 

                                                    <Articolo
                                                        key={articoloFiltrato.id} 
                                                        id={articoloFiltrato.id} 
                                                        visibilita={articoloFiltrato.visibilita} 
                                                        nome={articoloFiltrato.nome} 
                                                        tipologia={articoloFiltrato.tipologia} 
                                                        id_categoria_articolo = {articoloFiltrato.id_categoria_articolo} 
                                                        descrizione = {articoloFiltrato.descrizione} 
                                                        unita_misura = {articoloFiltrato.unita_misura} 
                                                        prezzo = {articoloFiltrato.prezzo} 
                                                        url_immagine = {articoloFiltrato.url_immagine}
                                                    />

                                                )}
                                            </div>                                            
                                            
                                        ))
    

    return (
        <SezioneBoxed >
            {stampaArticoliPerCategoria}
        </SezioneBoxed >
    )
}

export default ListaArticoli
