import React, {useEffect, useState} from 'react'

import { Dropdown, Button, Icon, Image, Modal, List } from 'semantic-ui-react'

const ItemConfermaComposti2 = ({componente, numeroMaxComponenti, variabileSelezionati, setVariabileSelezionati, register, setValue, getValues, index, idArticolo, arrayScelte, setArrayScelte, arrayScelteTemp}) => {

    //const [arrayScelte, setArrayScelte] = useState([]);
    const [backColor, setBackColor] = useState('');
    const [textColor, setTextColor] = useState('');

    //let arrayScelteTemp = [];
    //console.log('negato');

    let visibilita = '';


    useEffect( () => {
        if(getValues("componenti-"+idArticolo+"-"+index).indexOf(componente.id) !== -1){
            setBackColor('#21ba45');
            setTextColor('white');
        }
    })

    const handleClickListItem = (e, {id}) => {
        if(arrayScelte.indexOf(id) === -1){
            if(variabileSelezionati<numeroMaxComponenti){

                arrayScelteTemp = arrayScelte;
                arrayScelteTemp.push(id);
                setArrayScelte(arrayScelteTemp);
                setValue("componenti-"+idArticolo+"-"+index, arrayScelteTemp);
                console.log(arrayScelteTemp);
                console.log('contr',arrayScelte)
                setBackColor('#21ba45');
                setTextColor('white');
                setVariabileSelezionati(variabileSelezionati+1);

            }
            
        }
        else{
            arrayScelteTemp = arrayScelte;
            //console.log('ciao',arrayScelteTemp)
            arrayScelteTemp = arrayScelteTemp.filter(scelta => scelta !== id)
            setArrayScelte(arrayScelteTemp);
            setValue("componenti-"+idArticolo+"-"+index, arrayScelteTemp);
            setBackColor('');
            setTextColor('');
            setVariabileSelezionati(variabileSelezionati-1);
            //console.log(arrayScelteTemp);
            //console.log('filtr',arrayScelteTemp)

        }
        
    }

    //useEffect( () => {register("componenti-"+idArticolo+"-"+index);},[register])
    //useEffect( () => {setValue("componenti-"+idArticolo+"-"+index, []); console.log('negato');},[])

    if(componente.url_immagine === ''){

        visibilita = 'none';

    }

    return (
        
        <List.Item key={componente.id} id={componente.id} onClick={handleClickListItem} style={{backgroundColor: backColor}}>
            <Image avatar style={{display: visibilita }} src={'https://www.ordinasicuro.it/670914_920408/lib/img_componenti/img_componenti_compressed/'+componente.url_immagine} />
            <List.Content>
                <List.Header style={{ color: textColor}}>{componente.nome}</List.Header>
            </List.Content>
        </List.Item>
    )
}

export default ItemConfermaComposti2
