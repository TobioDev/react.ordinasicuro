import React from 'react'

import {Icon, Menu,} from 'semantic-ui-react'
import { HashLink as Link } from 'react-router-hash-link';

const AzioniRapidePannelloControllo = () => {
    return (
        <Menu vertical>
            <Menu.Item active><b className="f3">Azioni Rapide</b></Menu.Item>
            {/* {stampaSubmenuCategorieDesktop(categorieArticoli)} */}
            <Menu.Item as={Link}
                        key={'pannello-controllo'}
                        to={'/pannello-controllo'}  
                        name= 'Pannello Controllo'
                    >
                        Prodotti <Icon name='home' />
            </Menu.Item>
            <Menu.Item as={Link}
                        key={'aggiungi-prodotto'}
                        to={'/aggiungi-articolo'}  
                        name= 'Aggiungi Articolo'
                    >
                        Aggiungi Prodotto <Icon name='plus' />
            </Menu.Item>
            <Menu.Item as={Link}
                        key={'gestione-ordini'}
                        to={'/gestione-ordini'}  
                        name= 'Gestione Ordini'
                    >
                        Gestione Ordini <Icon name='paper plane' />
            </Menu.Item>
            <Menu.Item as={Link}
                        key={'gestione-categorie'}
                        to={'/gestione-categorie'}  
                        name= 'Gestione Categorie'
                    >
                        Gestione Categorie <Icon name='list' />
            </Menu.Item>
            <Menu.Item as={Link}
                        key={'gestione-componenti'}
                        to={'/gestione-componenti'}  
                        name= 'Gestione Componenti'
                    >
                        Gestione Componenti <Icon name='chart pie' />
            </Menu.Item> 
            <Menu.Item as={Link}
                        key={'gestione-profilo'}
                        to={'/gestione-profilo'}  
                        name= 'Gestione Profilo'
                    >
                        Gestione Profilo <Icon name='user' />
            </Menu.Item>
            <Menu.Item as={Link}
                        key={'compressione-immagini'}
                        to={'/compressione-immagini'}  
                        name= 'Compressione Immagini'
                    >
                        Comprimi Immagine <Icon name='file image' />
            </Menu.Item>    
        </Menu>
    )
}

export default AzioniRapidePannelloControllo
