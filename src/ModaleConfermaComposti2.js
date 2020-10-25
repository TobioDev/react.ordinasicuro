import React, {useEffect, useState} from 'react'

import { Dropdown, Button, Icon, Image, Modal, List } from 'semantic-ui-react'
import ItemConfermaComposti2 from './ItemConfermaComposti2';

const ModaleConfermaComposti2 = ({idArticolo, arrayOpzioniComponenti, index, setValue, getValues, register}) => {

    const [open, setOpen] = React.useState(false)
    const [arrayScelte, setArrayScelte] = useState([]);
    //setValue("componenti-"+idArticolo+"-"+index, []);

    let arrayScelteTemp = [];
    //console.log('negato');

    //Per registrare valore Dropdown Semantic UI
    // const handleChange = (e, { name, value }) => {
    //     setValue(name, value);
    // }

    // const handleClickListItem = (e, {id}) => {
    //     if(arrayScelte.indexOf(id) === -1){
    //         arrayScelteTemp = arrayScelte;
    //         arrayScelteTemp.push(id);
    //         setArrayScelte(arrayScelteTemp);
    //         setValue("componenti-"+idArticolo+"-"+index, arrayScelteTemp);
    //         console.log(arrayScelteTemp);
    //         console.log('contr',arrayScelte)
    //     }
    //     else{
    //         arrayScelteTemp = arrayScelte;
    //         //console.log('ciao',arrayScelteTemp)
    //         arrayScelteTemp = arrayScelteTemp.filter(scelta => scelta !== id)
    //         setArrayScelte(arrayScelteTemp);
    //         setValue("componenti-"+idArticolo+"-"+index, arrayScelteTemp);
    //         //console.log(arrayScelteTemp);
    //         //console.log('filtr',arrayScelteTemp)

    //     }
        
    // }

    useEffect( () => {register("componenti-"+idArticolo+"-"+index);},[register])
    useEffect( () => {setValue("componenti-"+idArticolo+"-"+index, []); console.log('negato');},[])

    const stampaListaComponenti = arrayOpzioniComponenti.map(componente => (

        <ItemConfermaComposti2 componente={componente} setValue={setValue} getValues={getValues} index={index} idArticolo={idArticolo} arrayScelte={arrayScelte} setArrayScelte={setArrayScelte} arrayScelteTemp={arrayScelteTemp}></ItemConfermaComposti2>

    )
)


    return (
        // <Dropdown onChange={handleChange} name={"componenti-"+idArticolo+"-"+index} id={"componenti"+idArticolo} placeholder='Seleziona le opzioni per questo prodotto' fluid multiple selection clearable options={arrayOpzioniComponenti} required/>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button type="button">Seleziona i componenti...</Button>}
            >
            <Modal.Header>Seleziona componenti</Modal.Header>
            <Modal.Content image scrolling>
                <List selection verticalAlign='middle'>
                    {stampaListaComponenti}
                </List>
                
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)} primary>
                Fatto <Icon name='chevron right' />
                </Button>
            </Modal.Actions>
            </Modal>
    )
}

export default ModaleConfermaComposti2
