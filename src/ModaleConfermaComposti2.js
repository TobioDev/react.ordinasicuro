import React, {useEffect, useState} from 'react'

import { Dropdown, Button, Icon, Image, Modal, List } from 'semantic-ui-react'
import ItemConfermaComposti2 from './ItemConfermaComposti2';

const ModaleConfermaComposti2 = ({infoArticolo, idArticolo, numeroMaxComponenti, arrayOpzioniComponenti, index, setValue, getValues, register}) => {

    const [open, setOpen] = React.useState(false)
    const [arrayScelte, setArrayScelte] = useState([]);
    const [variabileSelezionati, setVariabileSelezionati] = useState(0);
    //setValue("componenti-"+idArticolo+"-"+index, []);

    //console.log('index', index);

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
    useEffect( () => {register("componenti-"+ idArticolo +"-"+index); console.log('dentro', infoArticolo)},[register])
    useEffect( () => {setValue("componenti-"+ idArticolo +"-"+index, []); console.log('negato');},[])

    const stampaListaComponenti = arrayOpzioniComponenti.map(componente => {
        if(componente.visibilita==='1'){
            return <ItemConfermaComposti2 componente={componente} numeroMaxComponenti={numeroMaxComponenti} variabileSelezionati={variabileSelezionati} setVariabileSelezionati={setVariabileSelezionati} setValue={setValue} getValues={getValues} index={index} infoArticolo={infoArticolo} idArticolo={idArticolo} arrayScelte={arrayScelte} setArrayScelte={setArrayScelte} arrayScelteTemp={arrayScelteTemp}></ItemConfermaComposti2>
        }
    }
)


    return (

        <div className="pa3 ba b--black-30 br3 mb3" key={idArticolo+index}>
            <h4>{index+1} - {infoArticolo.nome}</h4>
            <p>{infoArticolo.descrizione}</p>
    <h4>Componenti selezionati: {variabileSelezionati} su {infoArticolo.numero_max_componenti}</h4>
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
                                                            
        </div> 
        
    )
}

export default ModaleConfermaComposti2
