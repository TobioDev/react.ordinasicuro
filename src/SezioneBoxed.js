import React from 'react';
import './SezioneBoxed.css';

const SezioneBoxed = ({children, backgroundColor}) => {

	if (!backgroundColor){
		
		backgroundColor = "";
	}

	return(

		<div className={"flex justify-center pa3 ph5-ns " + backgroundColor }>
			<div className='sezioneboxed tc'>
			{children}				
			</div>
		</div>


	)

	

}

export default SezioneBoxed;