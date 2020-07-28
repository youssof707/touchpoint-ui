import React, {useState} from 'react'
import {Module, ControlBar, SplitScreen, Popup, InfoTab, InfoTabContainer, ControlButton, MainTable} from '../../touchpoint-ui'
import {useSystem, useHeaders, useDataset} from '../../touchpoint-ui'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCalendarAlt, faChartArea, faSyncAlt} from "@fortawesome/free-solid-svg-icons"
import {getTableData} from '../../SQLSimulator/SQLSimulator'
import RubricHeader from './RubricHeader'
import RubricDetail  from './RubricDetail'
import PBI from '../../Temp/PBI.jpg'
import './StatusLog'
import StatusLog from './StatusLog'



//And begin
export default function VendorRubrics(){
	
	//Access to system functions
	const system = useSystem()
	
	//Conditional formatting for the status
	const statusStyle = (cellValue) => {
		switch(cellValue){
			case 'Complete': return {textColor: 'white', badgeColor: '#66CD00'}
			case 'Pending': return {textColor: 'white', badgeColor: '#EE0000'}
			case 'Open': return {textColor: 'white', badgeColor: '#FFB90F'}
			default: return {textColor: 'white', badgeColor: 'orange'}
		}
	}
	
	//Headers for table
	const dataHeaders = useHeaders([
		{ headerID:'id',displayName:'ID', width: 50, required: true},
		{ headerID: 'vendor', displayName:'My Vendor', width: 200},
		{ headerID: 'project', displayName:'Project', width: 200},
		{ headerID: 'projectName', displayName:'Project Name', width: 300},
		{ headerID: 'status', displayName:'Status', width: 200, required: true, styling: statusStyle},
		{ headerID: 'due', displayName:'Due', width: 200},
		{ headerID: 'SM', displayName:'SM', width: 300},
		{ headerID: 'intern', displayName:'Intern', width: 300},
	])
	
	//Data from the 'server'
	const data  = useDataset(getTableData, [{}])
	const [activeRecord, setActiveRecord] = useState(data.read()[0])
	
	// const subData =  useDataset(data.sub( (r)=> r.status === 'Complete'))
	
	return (
		<Module moduleName = "VendorRubrics">
			
			<ControlBar searchBar>
				
				<ControlButton>
					<FontAwesomeIcon icon={faCalendarAlt} /> Post Job Report
				</ControlButton>
				
				<ControlButton onClick={()=>{
					data.refresh()
				}}>
					<FontAwesomeIcon icon={faSyncAlt} /> Refresh
				</ControlButton>
				
				<ControlButton onClick={() => system.openPopup(
					<Popup 
						closeButton
						width='fit-content'
						height='90%'
						title = 'Embedded Reports Coming Soon!'						
					>
						<img src={PBI} height={'90%'}/>
					</Popup>
				)}>
					<FontAwesomeIcon icon = {faChartArea}/> Business Intelligence
				</ControlButton>
				
			</ControlBar>
			
			<SplitScreen defaultSize={55}>
				<InfoTabContainer defaultTab='Test'>
					
					<InfoTab tabID = "RubricHeader" tabTitle='Rubric Header'>
						<RubricHeader activeRecord = {activeRecord} system={system}/>
					</InfoTab>	
					
					<InfoTab tabID = "RubricDetail" tabTitle='Rubric Detail'>
						{/* <RubricDetail /> */}
					</InfoTab>	
					
					<InfoTab tabID = "StatusLog" tabTitle='Status Log'>
						<StatusLog
							dataRow={activeRecord}
							statusStyle={statusStyle}
						/>
					</InfoTab>		
						
						
						
						
						
					<InfoTab tabID = "DataTest" tabTitle='Test'>
						{/* <MainTable
							data={subData}
							dataHeaders={subDataHeaders}
							setActiveRecord={setActiveRecord}
							activeRecord={activeRecord}
							pageSize={200}
							searchable
						/> */}
					</InfoTab>			
							
							
							
				</InfoTabContainer>
			</SplitScreen>
			
			<MainTable
				data={data}
				dataHeaders={dataHeaders}
				setActiveRecord={setActiveRecord}
				activeRecord={activeRecord}
				pageSize={200}
				searchable
			/>
					
		</Module>
	)
}