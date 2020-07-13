import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

const CtaIcona = () => {
  return (
    <div className="flex flex-wrap justify-center items-center pa4" style={{ backgroundColor: '#fed136' }} >
      <div className="w-100 w-20-l tc-l">
        < FaShoppingCart className="f1" />
      </div>
      <div className="w-100 w-50-l">
        <h2 className="titolo">Crea il tuo menù digitale o la tua vetrina online gestendo asporto e consegna a domicilio</h2>
      </div>
      <div className="w-100 w-30-l">
      <a className="link br2 ph3 pv2 mb2 mt2 mh3-l dib black bg-white w-100 tc b f4 hover-bg-black hover-white titolo"  href="#0">ISCRIVITI ORA</a>
      </div>
    </div>
  )
}

export default CtaIcona