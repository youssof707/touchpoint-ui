import React, {useState, useEffect} from 'react'
import MoreFilterButtonActive from './MoreFilterButtonActive'

export default function MoreFilterButton(props) {
	
	const [active, setActive] = useState(props.header.filterList[props.filterID] ? true : false)
	
	function activate(){
		setActive(true)
		
		const newHeaders = [...props.dataHeaders.get()]
		newHeaders[props.header.index].addFilter({
			id: props.filterID,
			value: ''
		})
		
		props.dataHeaders.set(newHeaders)
	}
	
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