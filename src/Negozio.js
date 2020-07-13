import React, { useEffect, useState } from 'react'

const Negozio = (props) => {

    const [infoNegozio, setInfoNegozio] = useState([]);
    const [parola, setParola] = useState('nada');

    useEffect(() => {
        fetch('https://ordinasicuro.it/index.php/api/negozio/' + props.match.params.id_negozio)
            .then(response => response.json())
            .then(json => {
                setInfoNegozio(json);
                const risp = json.get_negozio.nome;
                setParola(risp);

                    }
            )
    }, []);

    return (
        <div>
            <p></p>
        </div>
    )
}

export default Negozio
