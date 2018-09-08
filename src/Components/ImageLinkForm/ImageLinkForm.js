import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm=({onInputChange,onButtonSubmit})=>{
	return(
		<div>
			<p className='f3'>
			   {'This Magic Brain can detect a face in pictures, give it a try'}
			</p>
			<div className='center'>
			  <div className='center form pa4 br-pill shadow-5'>
			    <input 
			    className='f4 hover-bg-black hover-white pa2 w-70 center' 
			    type='text' 
			    onChange={onInputChange}
			    />
			    <button 
			    className='w-30 br-pill grow f4 link ph3 pv2 dib white bg-purple'
			    onClick={onButtonSubmit}
			    >Detect
			    </button>
			  </div>
			</div>
		</div>
		);
}
export default ImageLinkForm;