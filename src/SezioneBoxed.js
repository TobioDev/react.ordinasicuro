import React from 'react';
import './SezioneBoxed.css';		

const SezioneBoxed = ({children, backgroundColor, align, direction, className}) => {

	if (!backgroundColor){
		
		backgroundColor = "";
	}
	

	return(

		<div className={"flex flex-wrap justify-center items-center " + className }>
			<div className='pa3 sezioneboxed flex flex-wrap justify-center items-center flex-column w-100'>
				{children}				
			</div>
		</div>


	)
	

}

export default SezioneBoxed;