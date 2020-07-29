import {useEffect} from 'react'
import useSystem from './UseSystem'

//Allows a system component (like the app-wide toolbar) to declare its presence, so the module container 
//can resize to fit around them
export default function usePresence(componentName, height, width) {
	const {layout} = useSystem()
	
	function refreshCSS(){
		
		let heightCSS = 'calc(100%'
		let widthCSS = 'calc(100%'
		
		Object.values(layout.heights).forEach((h)=>{
			if(h){
				heightCSS = heightCSS + ' - ' + h
			}
		})
		
		Object.values(layout.widths).forEach((w)=>{
			if(w){
				widthCSS = widthCSS + ' - ' + w
			}
		})
		
		layout.heightCSS = heightCSS + ')'
		layout.widthCSS = widthCSS + ')'
	}
	
	useEffect(() => {
		layout.widths[componentName] = width
		layout.heights[componentName] = height
		
		refreshCSS()

		return (() => {
			delete layout.widths[componentName]
			delete layout.height[componentName]
			
			refreshCSS()
		})
	}, [])
}