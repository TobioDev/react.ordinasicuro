import React from 'react';
import './SezioneBoxed.css';

const SezioneBoxed = ({children}) => {

	return(

		<div className="flex justify-center">
			<div className='sezioneboxed'>
			{children}				
			</div>
		</div>


	)

	

}

export default SezioneBoxed;