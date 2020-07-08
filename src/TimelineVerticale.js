import React from 'react';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { Md3DRotation } from "react-icons/md";



const TimelineVerticale = () => {

	return(

		<VerticalTimeline>
		  <VerticalTimelineElement
		    className="vertical-timeline-element--work"
		    contentStyle={{ background: '', color: '' }}
		    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
		    date="21 febbraio 2020"
		    iconStyle={{ background: '#fed136', color: '#fff' }}
		    icon={<Md3DRotation />}
		  >
		    <h3 className="vertical-timeline-element-title">21 Febbraio 2020</h3>
		    <h4 className="vertical-timeline-element-subtitle">Identificato il "paziente 1"</h4>
		    <p>
		      Tra il 21 e il 22 febbraio si registrano i primi contagi in Italia legati al Covid19. L'emergenza investe anche il nostro Paese dove si registrano centinaia di casi positivi con i focolai maggiori nel Lodigiano e in Veneto.
		    </p>
		  </VerticalTimelineElement>
		  <VerticalTimelineElement
		    className="vertical-timeline-element--work"
		    date="09 marzo 2020"
		    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
		    icon={<Md3DRotation />}
		  >
		    <h3 className="vertical-timeline-element-title">09 marzo 2020</h3>
		    <h4 className="vertical-timeline-element-subtitle">L'Italia va in lockdown</h4>
		    <p>
		      La sera del 9 marzo, con un nuovo decreto in vigore dal giorno successivo, tutta l'Italia diventa zona rossa.
		    </p>
		  </VerticalTimelineElement>
		  <VerticalTimelineElement
		    className="vertical-timeline-element--work"
		    date="11 marzo 2020"
		    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
		    icon={<Md3DRotation />}
		  >
		    <h3 className="vertical-timeline-element-title">11 marzo 2020</h3>
		    <h4 className="vertical-timeline-element-subtitle">Sars-CoV-2 è pandemia</h4>
		    <p>
		      L'Oms dichiara che quella di Sars-CoV-2 è una pandemia. "Il numero dei paesi fuori dalla Cina che sono stati colpiti dal coronavirus è triplicato."
		    </p>
		  </VerticalTimelineElement>
		  <VerticalTimelineElement
		    className="vertical-timeline-element--work"
		    date="2006 - 2008"
		    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
		    icon={<Md3DRotation />}
		  >
		    <h3 className="vertical-timeline-element-title">Nasce Ordina Sicuro</h3>
		    <h4 className="vertical-timeline-element-subtitle"></h4>
		    <p>
		      
		    </p>
		  </VerticalTimelineElement>
		</VerticalTimeline>


	);


}

export default TimelineVerticale;