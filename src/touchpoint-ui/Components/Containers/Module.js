import React, {useEffect} from 'react'
import './Module.css'
import PropTypes from 'prop-types'
import useModuleData from '../../Hooks/UseModuleData'

export default function Module(props) {
	
	const moduleData = useModuleData()
	
	useEffect(()=>{
		moduleData.clear()
	}, [])
	
	return (
		<div className={'Module ' + props.moduleName}>
			{props.children}	
		</div>
	)
}

//Proptypes
Module.propTypes = {
	moduleName: PropTypes.string,
}
