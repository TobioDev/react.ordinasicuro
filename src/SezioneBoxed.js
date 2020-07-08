import React from 'react';
import './SezioneBoxed.css';

const SezioneBoxed = ({children, backgroundColor, align, direction}) => {

	if (!backgroundColor){
		
		backgroundColor = "";
	}
	

	if (!align){
		
		align = "items-center";
	}

	if (!direction){
		
		direction = "flex-row";
	}

	return(

		<div className={"flex flex-wrap justify-center items-center" + backgroundColor }>
			<div className={'pa3 sezioneboxed flex flex-wrap justify-center ' + align + ' ' + direction }>
				{children}				
			</div>
		</div>


	)

	

}

export default SezioneBoxed;