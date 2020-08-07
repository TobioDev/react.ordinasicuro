import React, { Fragment, useState } from 'react'

import { Menu, Segment, Sidebar } from 'semantic-ui-react'

import { AiOutlineMenu } from 'react-icons/ai';

import { HashLink as Link } from 'react-router-hash-link';

const NavbarOS = () => {
    const [menuVisibilita, setMenuVisibilita] = useState(false);

    const apriChiudiMenu = () => {
        setMenuVisibilita(!menuVisibilita);
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
                    <img className="pv4" style={{ width: "150px" }} src="https://ordinasicuro.it/img/logo_home.png" alt="Ordina Sicuro Logo" />
                </Menu.Item>
                <Menu.Item as={Link} to="/#home" name='HOME' active={true} onClick={apriChiudiMenu} />
                <Menu.Item as={Link} to="/#attivita" name='LE NOSTRE ATTIVITÀ' onClick={apriChiudiMenu} />
                <Menu.Item as={Link} to="/#come-funziona" name='COME FUNZIONA' onClick={apriChiudiMenu} />
                <Menu.Item as={Link} to="/#fase-2" name='#FASE2INSIEME' onClick={apriChiudiMenu} />
                <Menu.Item as={Link} to="/#unisciti" name='UNISCITI' onClick={apriChiudiMenu} />
                <Menu.Item as={Link} to="/login" name='LOGIN' onClick={apriChiudiMenu} />
            </Sidebar>

            <Segment inverted className="w-100 dn db-l" style={{ marginBottom: "0px", marginTop: '0px', position: "fixed", top: 0, zIndex: 101 }} >
                <Menu inverted secondary >
                    <Menu.Item  >
                        <Link to="/#home"><img style={{ width: "150px" }} src="https://ordinasicuro.it/img/logo_home.png" alt="Ordina Sicuro Logo" /></Link>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item as={Link} to="/" name='HOME' active={true} />
                        <Menu.Item as={Link} to="/#attivita" name='LE NOSTRE ATTIVITÀ'/>
                        <Menu.Item as={Link} to="/#come-funziona" name='COME FUNZIONA' />
                        <Menu.Item as={Link} to="/#fase-2" name='#FASE2INSIEME' />
                        <Menu.Item as={Link} to="/#unisciti" name='UNISCITI' />
                        <Menu.Item as={Link} to="/login" name='LOGIN' />
                    </Menu.Menu>
                </Menu>
            </Segment>

            <Segment inverted className="w-100 dn-l" style={{ marginBottom: "0px", marginTop: "0px", position: "fixed", top: 0, zIndex: 101 }} >
                <Menu inverted secondary size="tiny">
                    <Menu.Item >
                        <Link to="/#home"><img style={{ width: "120px" }} src="https://ordinasicuro.it/img/logo_home.png" alt="Ordina Sicuro Logo" /></Link>
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
