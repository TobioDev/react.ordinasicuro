import React from 'react';
import './SezioneBoxed.css';

const SezioneBoxed = ({children, backgroundColor, align}) => {

	if (!backgroundColor){
		
		backgroundColor = "";
	}
	

	if (!align){
		
		align = "items-start";
	}

	return(

		<div className={" " + backgroundColor }>
			<div className={'pa3 ph5-ns sezioneboxed flex flex-wrap justify-center ' + align}>
				{children}				
			</div>
		</div>


	)

	

}

export default SezioneBoxed;