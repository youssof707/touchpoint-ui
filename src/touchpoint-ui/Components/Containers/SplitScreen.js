import React from 'react'
import './SplitScreen.css'
import Split from 'react-split'
import PropTypes from 'prop-types'

export default function SplitScreen(props) {
	
	let splitSize = 50
	if(props.defaultSize){splitSize = props.defaultSize}
	
	return (
		<div className='SplitScreen'>
			<Split 
				direction="vertical" 
				sizes={[100 - splitSize, splitSize]}
				minSize={100}
				gutterSize={4}
				snapOffset={1}
				dragInterval={20}
			>
				{props.children}

			</Split>
		</div>
	)
}

//Proptypes
SplitScreen.propTypes = {
	defaultSize: PropTypes.number,
}