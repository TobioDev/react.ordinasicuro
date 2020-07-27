import React, {useEffect, useState} from 'react'

import { Dropdown } from 'semantic-ui-react'

const ItemConfermaComposti = ({idArticolo, arrayOpzioniComponenti, index, setValue, register}) => {
    //Per registrare valore Dropdown Semantic UI
    const handleChange = (e, { name, value }) => {
        setValue(name, value);
    }

    useEffect( () => {register("componenti-"+idArticolo+"-"+index);},[register])


    return (
        <Dropdown onChange={handleChange} name={"componenti-"+idArticolo+"-"+index} id={"componenti"+idArticolo} placeholder='Seleziona le opzioni per questo prodotto' fluid multiple selection clearable options={arrayOpzioniComponenti} required/>
    )
}

export default ItemConfermaComposti
