import React from 'react'
import Proptypes from 'prop-types'
import {v4 as uuid} from 'uuid'

export default function CheckButton(props) {
	
	const checkID = uuid()
	
	function clickHandler(e, id) {
		if(!props.disabled){
			const cb = document.getElementById(id)
			if (e.target !== cb) {cb.checked = !cb.checked}
			
			if(props.onClick){props.onClick(cb.checked, props.value)}
		}
	}
	
	return (<button
		onClick={(e) => clickHandler(e, checkID)}
	>

		<input
			type='checkbox'
			defaultChecked={props.defaultChecked}
			id={checkID}
			value={props.value}
			style={{cursor: 'pointer'}}
			disabled = {props.disabled}
		/>
		{' '}
		{props.children}

	</button>)
	
}


CheckButton.propTypes={
	defaultChecked: Proptypes.bool,
	value: Proptypes.any,
	label: Proptypes.string,
	onClick: Proptypes.func,
	disabled: Proptypes.bool,
}