import React, { Fragment, useState, useEffect } from 'react'

import { Menu, Segment, Sidebar, Icon, Dropdown } from 'semantic-ui-react'

import { AiOutlineMenu } from 'react-icons/ai';

import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from "react-router-dom";

const NavbarOS = ({loggato}) => {
    const [menuVisibilita, setMenuVisibilita] = useState(false);

    let history = useHistory();

    const apriChiudiMenu = () => {
        setMenuVisibilita(!menuVisibilita);
    }

    const posizionePannello = (posizioneY) => {
        localStorage.setItem('posizionePannello', posizioneY);
    }

    const pushHistory = (indirizzo) => {
        history.push(indirizzo);
    }

    const stampaLoginLogout = loginLogout => {
        console.log('mobile');
        if(loginLogout){
            return (
                <Fragment>
                    <Menu.Item name='PANNELLO DI CONTROLLO' onClick={() => { apriChiudiMenu(); pushHistory("/pannello-controllo", 0); }} />
                    <Menu.Item>
                        <Menu.Header>Gestisci</Menu.Header>
                        <Menu.Menu>
                            <Menu.Item
                                name='Aggiungi Articolo'
                                as={Link}
                                to="/aggiungi-articolo/"
                                onClick={apriChiudiMenu}
                            />
                            <Menu.Item
                                name='Categorie'
                                as={Link}
                                to="/gestione-categorie/"
                                onClick={apriChiudiMenu}
                            />
                            <Menu.Item
                                name='Componenti'
                                as={Link}
                                to="/gestione-componenti/"
                                onClick={apriChiudiMenu}
                            />
                            <Menu.Item
                                name='Ordini'
                                as={Link}
                                to="/gestione-ordini/"
                                onClick={apriChiudiMenu}
                            />
                            <Menu.Item
                                name='Il tuo Profilo'
                                as={Link}
                                to="/gestione-profilo"
                                onClick={apriChiudiMenu}
                            />
                        </Menu.Menu>
                    </Menu.Item>
                    <Menu.Item name='LOGOUT' onClick={() => {apriChiudiMenu(); pushHistory("/logout"); }} />
                    
                </Fragment>
            )
        }
        else{
            return(
                <Menu.Item as={Link} to="/login" name='LOGIN' onClick={apriChiudiMenu} />
            )
        }
    }

    const stampaLoginLogoutDesktop = loggato => {
        console.log('desktop');
        console.log('stato', loggato);
        if(loggato){
            return (
                <Fragment>
                    <Menu.Item onClick={() => {pushHistory("/pannello-controllo", 0)}} name='PANNELLO DI CONTROLLO' />
                    <Menu.Item onClick={() => {pushHistory("/logout", 0)}} name='LOGOUT' />
                </Fragment>
            )
        }
        else{
            return(
                <Menu.Item as={Link} to="/login" name='LOGIN' />
            )
        }
    }

    return (
        <Fragment>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                visible={menuVisibilita}
                width='thin'
            >
                <Menu.Item as={Link} to="/#home" onClick={apriChiudiMenu}>
                    <img className="pv4" style={{ width: "150px" }} src="https://ordinasicuro.it/670914_920408/lib/img/logo_home.png" alt="Ordina Sicuro Logo" />
                </Menu.Item>
                <Menu.Item as={Link} to="/#home" name='HOME' active={true} onClick={apriChiudiMenu} />
                <Menu.Item as={Link} to="/#attivita" name='LE NOSTRE ATTIVITÀ' onClick={apriChiudiMenu} />
                <Menu.Item as={Link} to="/#come-funziona" name='COME FUNZIONA' onClick={apriChiudiMenu} />
                <Menu.Item as={Link} to="/#iscrizione" name='UNISCITI' onClick={apriChiudiMenu} />
                {stampaLoginLogout(loggato)}
                {/* <Menu.Item as={Link} to="/login" name='LOGIN' onClick={apriChiudiMenu} /> */}
            </Sidebar>

            <Segment inverted className="w-100 dn db-l" style={{ marginBottom: "0px", marginTop: '0px', position: "fixed", top: 0, zIndex: 101 }} >
                <Menu inverted secondary >
                    <Menu.Item  >
                        <Link to="/#home"><img style={{ width: "150px" }} src="https://ordinasicuro.it/670914_920408/lib/img/logo_home.png" alt="Ordina Sicuro Logo" /></Link>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item as={Link} to="/" name='HOME' active={true} />
                        <Menu.Item as={Link} to="/#attivita" name='LE NOSTRE ATTIVITÀ'/>
                        <Menu.Item as={Link} to="/#come-funziona" name='COME FUNZIONA' />
                        <Menu.Item as={Link} to="/#iscrizione" name='UNISCITI' />
                        {stampaLoginLogoutDesktop(loggato)}
                        {/* <Menu.Item as={Link} to="/login" name='LOGIN' /> */}
                    </Menu.Menu>
                </Menu>
            </Segment>

            <Segment inverted className="w-100 dn-l" style={{ marginBottom: "0px", marginTop: "0px", position: "fixed", top: 0, zIndex: 101 }} >
                <Menu inverted secondary size="tiny">
                    <Menu.Item >
                        <Link to="/#home"><img style={{ width: "120px" }} src="https://ordinasicuro.it/670914_920408/lib/img/logo_home.png" alt="Ordina Sicuro Logo" /></Link>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item >
                        <AiOutlineMenu className="white f2" onClick={apriChiudiMenu} />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        </Fragment>
    )
}

export default NavbarOS
