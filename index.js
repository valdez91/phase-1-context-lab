
createEmployeeRecord= (row) => {
 return {
    firstName:row [0],
    familyName: row [1],
    title: row [2],
    payPerHour: row [3],
    timeInEvents:  [],
    timeOutEvents: []
 }
}
createEmployeeRecords = (employeeRowData) =>{
    return employeeRowData.map((row)=>{
        return createEmployeeRecord(row);
    });
};

 createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}
 createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}
hoursWorkedOnDate= function(workedDate) {
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === workedDate
    })
    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === workedDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}
wagesEarnedOnDate= function(earnDate) {
    let Wage= hoursWorkedOnDate.call(this, earnDate) 
    * this.payPerHour
    return parseFloat(Wage.toString())
}


 allWagesFor = function(){
    let wageDates = this.timeInEvents.map(function(e){
        return e.date
    })

    let payable = wageDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

findEmployeeByFirstName=(srcArray,firstName)=>{
    return srcArray.find((rec)=>{
        return rec.firstName === firstName
    })

}
calculatePayroll=(arrayOfEmployeeRecords)=>{
    return arrayOfEmployeeRecords.reduce((memo, rec)=>{
       return memo + allWagesFor.call(rec)
    },0)

}