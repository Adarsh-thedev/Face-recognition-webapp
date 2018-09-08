import React from 'react';
import './FaceReconition.css';

const FaceReconition=({imageUrl,box})=>{
	return(
		<div className='center ma shadow-5'>
		   <div className='absolute mt2'>
		     <img alt='' src={imageUrl} 
		     	id='inputImage'
		     	width='480px' height='auto'
		     />
		     <div className='bounding-box'
		       style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}
		     >
		     </div>
		   </div>
		</div>
		);
}

export default FaceReconition;