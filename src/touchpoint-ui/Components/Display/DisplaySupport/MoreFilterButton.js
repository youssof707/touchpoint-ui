import React, { useState } from 'react'
import MoreFilterButtonActive from './MoreFilterButtonActive'
import { useEffect } from 'react'

export default function MoreFilterButton(props) {
	
	const [active, setActive] = useState(props.header.filterList[props.filterID] ? true : false)
	
	function activate(){
		setActive(!active)
	}
	
	useEffect(()=>{
		setActive(props.header.filterList[props.filterID] ? true : false)
	}, [props.openTrigger])
	
	if(!active){return(
		
		<button onClick = {activate} className = 'MoreFilterButton'>
			<span style = {{paddingRight: '10px'}}>{props.filter.displayName}</span>
		</button>
		
	)} else{ return(
		
		<MoreFilterButtonActive
			dataHeaders = {props.dataHeaders}
			data = {props.data}
			filter = {props.filter}
			filterID = {props.filterID}
			header = {props.header}
			setActive = {setActive}
			active = {active}
		/>
		
	)}
}