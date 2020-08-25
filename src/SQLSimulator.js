import faker from 'faker'


//returns a lis of pending actions actions for a given user in a given module
export function queryNotifications(){
	return([
		{title: 'Support', action: 'Pending Approval', due: Date('10-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'Vendor Rubric 2', action: 'Pending Review', due: Date('1-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'New Vendor Review', action: 'Approval Required', due: Date('1-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'Vendor Review', action: 'Approval Required', due: Date('1-Jun-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'Vendor Rubric 2', action: 'Pending Review', due: Date('1-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'New Vendor Review', action: 'Approval Required', due: Date('1-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'Vendor Review', action: 'Approval Required', due: Date('1-Jun-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'Vendor Rubric 2', action: 'Pending Review', due: Date('1-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'New Vendor Review', action: 'Approval Required', due: Date('1-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'Vendor Review', action: 'Approval Required', due: Date('1-Jun-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
	])
}

//
export function fakeData(n = 500){
	
	const data = []
	const statuses = ['Complete', 'In Progress', 'Pending Approval']
	
	for (let i = 0; i < n; i++) {
		
		data.push({
			id: i,
			vendor: faker.company.companyName(),
			project: faker.random.number(40000),
			SM: faker.name.findName(),
			projectName: faker.company.catchPhrase(),
			status: statuses[i % 3],
			due: faker.date.future(),
			intern: faker.name.findName(),
			toq: faker.random.number(7000000),
			perparedBy: faker.name.findName(),
			approvedBy: faker.name.findName(),
			preparedDate: faker.date.past(),
			approvedDate: faker.date.past(),
			
			scrList: [...new Array(2 + i% 7)].map(()=>faker.random.number(2000000)),
			
			statusLog: [],
			
		})
		
	}


	return (JSON.parse(JSON.stringify(data)))
}