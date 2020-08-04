import React, { useState } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes, faCheck} from '@fortawesome/free-solid-svg-icons'
import produce from 'immer'

export default function MoreFilterButtonActive(props) {
	
	const [value, setValue] = useState('')
	const [validClass, setValidClass] = useState('')
	
	function changeHandler(e){
		setValidClass('')
		setValue(e.target.value)
	}
	
	function addFilter(argValue) {
		setValidClass('')
		props.dataHeaders.set(produce(props.dataHeaders.get(), h => {
			h[props.header.index].addFilter({
				id: props.filterID,
				value:  argValue
			})
		}))
		
		props.data.filter()
	}
	
	function cancelHandler(e) {
		setValidClass('')
		e.stopPropagation()
		
		props.setActive(false)
		
		props.dataHeaders.set(produce(props.dataHeaders.get(), h => {
			h[props.header.index].removeFilter(props.filterID)
		}))

		props.data.filter()
	}
	
	
	function commitHandler() {
		const inputValid = value.trim() !== ''
		
		if(inputValid){
			addFilter(value)
		} else{
			setValidClass('invalid')
		}
	}
	
	
	function keyDownHandler(e){
		if (e.key === 'Enter') {
			commitHandler()
			e.target.blur()
		} 
	}
	
	
	return (
		<button className='MoreFilterButtonActive disabled'>
			
			<span className = 'tag'>{props.filter.displayName}</span>
			<br/>
			
			<input 
				className = {'input ' + validClass}
				autoFocus 
				onChange = {changeHandler}
				value = {value}
				onKeyDown = {keyDownHandler}
			/>
			
			<span className='cancelIcon' onClick={cancelHandler} >
				<FontAwesomeIcon icon={faTimes} />
			</span>
			
			<span className='commitIcon' onClick = {commitHandler}>
				<FontAwesomeIcon icon={faCheck} />
			</span>
			
		</button>
	)
}
