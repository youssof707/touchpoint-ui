import DataFilter from './DataFilter'
import DataType from './DataType'
import {valueFilter, tagFilter, uniqueByColumn} from './headerSupport'

export default class DataHeader{
	
	constructor(options){
		this.headerID = options.headerID
		this.displayName = options.displayName
		this.width = options.width ? options.width : 100
		this.required = options.required ? options.required : false
		this.visible = (!options.visible === undefined) ? options.visible : true
		this.index = options.index
		this.onEdit = options.onEdit ? options.onEdit : null
		this.locked = options.locked ? options.locked : false
		this.styling = options.styling ? options.styling : null
		this.uniqueValues = {}
		this.type = options.type ? options.type : 'string'
		this.onClick = options.onClick
		this.options=options.options
		this.component = options.component
		
		//Adds type = 'component' unless you explicitly give a type in the options
		//Used to determine if a filter should appear or not
		if(options.component){
			this.type = options.type ? options.type : 'component'
			this.onEdit = null
		}
		
		this.props = options.props
		
		//Default filter list only has 1 functions (array filter)
		this.filterList = {
			arrayFilter: {
				func: this.type === 'tags' ? 
				(cellValue) => tagFilter(cellValue, this.uniqueValues) 
				: (cellValue) => valueFilter(cellValue, this.uniqueValues)
			},
		}
		
		this.dataType = new DataType(this.type)
		this.format = this.dataType.format
		this.parse = this.dataType.parse
		this.compare = this.dataType.compare
	}

	
	filter(cellValue, dataRow){
		//Check if any of the filters fail
		//If any filters fail, res will be true. Return the opposite
		return !Object.keys(this.filterList).some( (f)=>{
			return !this.filterList[f].func(cellValue, dataRow)
		})
	}
	
	
	addFilter(options){
		this.filterList[options.id] = new DataFilter({...options, headerType: this.type})
	}
	
	
	removeFilter(filterID){
		delete this.filterList[filterID]
	}
	
	
	//Saves a list of unique values in the column - to be used in the filter dropdowns
	embedData(data, metaData){
		this.uniqueValues = uniqueByColumn(data, metaData, this.headerID, this.uniqueValues)
	}
	
	selectAll(setVal){
		Object.keys(this.uniqueValues).map((uv)=>{
			this.uniqueValues[uv] = setVal
		})
	}
	
	//checks if there are any active filters, including the array filter
	hasFilter(){
		//array filter is always there, check if any other filters are there
		let testRes = Object.keys(this.filterList).length === 1
		
		//if there are no other filters, check if the array filter is active
		if(testRes){
			Object.keys(this.uniqueValues).forEach((val) => {
				if (!this.uniqueValues[val]){testRes = false}
			})
		}
		return !testRes
	}
	
	clearFilter(){
		this.filterList = {
			arrayFilter: {
				func: (cellValue) => {
					return (this.uniqueValues[cellValue] || this.uniqueValues[cellValue] === undefined)
				}, displayName: 'Array Filter'
			}
		}
		this.selectAll(true)
	}
}


