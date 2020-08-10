import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

import { HashLink as Link } from 'react-router-hash-link';

const CtaIcona = () => {
  return (
    <div className="flex flex-wrap justify-center items-center pa4" style={{ backgroundColor: '#fed136' }} >
      <div className="w-100 w-20-l tc dn db-l">
        < FaShoppingCart className="f1-l f3" />
      </div>
      <div className="w-100 w-50-l">
        <h2 className="titolo f4-l f5 tc tl-l">Crea il tuo menù digitale o la tua vetrina online gestendo asporto e consegna a domicilio</h2>
      </div>
      <div className="w-100 w-30-l">
      <Link to="/#iscrizione">
        <div className="link br2 ph3 pv2 mb2 mt2 mh3-l dib black bg-white w-100 tc b f4 hover-bg-black hover-white titolo"  href="#0">ISCRIVITI ORA</div>
      </Link>
      </div>
    </div>
  )
}

export default CtaIcona