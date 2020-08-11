import {useState} from 'react'
import DataHeader  from '../DataObjects/DataHeader'
import {v4 as uuid} from 'uuid'


//Crates a set of DataHeaders, for use with a mainTable
export default function useHeaders(dataHeaders = []) {
	
	const [headers, setHeaders] = useState(dataHeaders.map((hdr, i) => {
		const obj = new DataHeader(hdr)
		obj.index = i
		return (obj)
	}))
	
	const [savedLayouts, setSavedLayouts] = useState({})
	const [settingsEngine, setSettingsEngine] = useState({ save: ()=>{} })
	const [tokenTrigger, setTokenTrigger] = useState(false)
	
	//Coverts the current layout to JSON and saves it
	function saveLayout(layoutName){
		const newLayouts = {...savedLayouts}
		const saveID = uuid()
		
		newLayouts[saveID] = {
			name: layoutName,
			headerOptions: {}
		}
		
		headers.forEach((h)=>{
			newLayouts[saveID].headerOptions[h.headerID] = {
				visible: h.visible,
				sortRule: h.sortRule,
				filterList: []
			}
			
			Object.values(h.filterList).forEach((f) => {
				if (f.options) { newLayouts[saveID].headerOptions[h.headerID].filterList.push( f.options )}
			})
		})
		
		setSavedLayouts(newLayouts)
		setTokenTrigger(true)
	}
	
	function loadLayout(id){
		if(savedLayouts[id]){
			
			const newHeaders = []
			
			headers.forEach(h=>{
				h.clearFilter()
				h.visible = savedLayouts[id].headerOptions[h.headerID].visible 
				h.sortRule = savedLayouts[id].headerOptions[h.headerID].sortRule
				
				savedLayouts[id].headerOptions[h.headerID].filterList.forEach((f)=>{
					h.addFilter(f)
				})
				
				newHeaders.push(h)
			})
				
			setHeaders(newHeaders)
			setTokenTrigger(true)
		}
	}
	
	function deleteLayout(id){
		const newLayouts = {...savedLayouts}
		delete newLayouts[id]
		setSavedLayouts(newLayouts)
		setTokenTrigger(true)
	}
	
	
	//Saves a list of unique values in each column (header) - to be used in the filter dropdowns
	function embedData(data, metaData) {
		
		const newHeaders = [...headers]
		
		newHeaders.forEach((hdr) => {
			hdr.embedData(data, metaData)
		})

		setHeaders(newHeaders)
	}
	
	function applyToken(token){
		const newSettings = JSON.parse(token)
		setSavedLayouts(newSettings.savedLayouts)
		
		const newHeaders = [...headers]
		
		newHeaders.forEach((h)=>{
			h.visible = newSettings.headerOptions[h.headerID].visible
			h.sortRule = newSettings.headerOptions[h.headerID].sortRule
		})
		
		setHeaders(newHeaders)
	}
	
	function setVisible(index, bool){
		const newHeaders = [...headers]
		newHeaders[index].visible = bool
		setHeaders(newHeaders)
		setTokenTrigger(true)
	}
	
	//If settings have changed since the last render, create and save a new token
	if (tokenTrigger) {
		setTokenTrigger(false)
		
		const res = {
			savedLayouts: savedLayouts,
			headerOptions: {}
		}
		
		headers.forEach((hdr)=>{
			res.headerOptions[hdr.headerID] = {
				visible: hdr.visible,
				sortRule: hdr.sortRule,
			}
		})

		settingsEngine.save(JSON.stringify(res))
	}

	return ({
		get: () => {return headers},
		set: setHeaders,
		
		embedData: embedData,
		applyToken: applyToken,
		saveLayout: saveLayout,
		loadLayout: loadLayout,
		deleteLayout: deleteLayout,
		getSavedLayouts: ()=>{return savedLayouts},
		setSettingsEngine: setSettingsEngine,
		setVisible: setVisible,
		
		addSortRule: (headerIndex, direction) => {
			let newHeaders = [...headers]
			newHeaders[headerIndex].sortRule = direction
			setHeaders(newHeaders)
			setTokenTrigger(true)
		},

		removeSortRule: (headerIndex) => {
			let newHeaders = [...headers]
			newHeaders[headerIndex].sortRule = false
			setHeaders(newHeaders)
			setTokenTrigger(true)
		},
	})
}