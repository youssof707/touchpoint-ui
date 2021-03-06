import React, {useEffect, useState, useContext} from 'react'
import lockedContext from '../../Contexts/LockedContext'
import './AppDrawer.css'
import CloseButton from '../Inputs/CloseButton'
import PropTypes from 'prop-types'
import useSystem from '../../Hooks/UseSystem'
import ReactDOM from 'react-dom'

export default function AppDrawer(props) {
	
	//deccides if the component is locked based on props and parents in the tree
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	
	const {Drawer} = useSystem()
	
	useEffect(()=>{
		Drawer.setExists(true)
		return ()=>Drawer.setExists(false)
	},[])
	
	//Clicking the background closes the popup
	function clickBackdrop(e) {
		if (e.target.classList.contains('SystemDrawerHandler')) {
			Drawer.close()
		}
	}
	
	if (Drawer.portalDestination.current){ return ( 
		ReactDOM.createPortal(
			<div id='TouchPointDrawerHandler' onClick = {clickBackdrop}>
				<lockedContext.Provider value={locked}>
					<div 
						className={'AppDrawer'}
						id={'TouchPointAppDrawer'}
						style={{...props.style, opacity: '93%'}}
					>
						<div className="drawerContainer" style={props.innerStyle}>
							<div className='scroller'>
								<div style={{
									width: '100%',
									height: '100%',
								}}>
									<h1>{props.title}</h1>
									<CloseButton
										locked={false}
										onClick={() => {
											Drawer.close()
										}}
									/>
									
									<div id='TouchPointDrawerContainer'>
										{props.children}
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</lockedContext.Provider>
		</div>, Drawer.portalDestination.current)
		
	)} else return null

		

}


AppDrawer.propTypes = {
	style: PropTypes.object,
	innerStyle: PropTypes.object,
	locked: PropTypes.bool,
}