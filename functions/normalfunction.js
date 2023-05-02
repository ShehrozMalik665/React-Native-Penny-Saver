export const sortDate = (arr)=> {
    const sorted = arr.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
      return sorted;
}
export const calculateAmount = (arr)=> {
    const calculateincome= arr.reduce((accumulator, object) => {
        return accumulator + object.enteredvalue;
      }, 0);
      return calculateincome;
}
export const calculateDate = () =>{
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    const val = date + '-' + month + '-' + year;
    return val;
}
export const calculatePercentange = (arr) => {
    let chartdata = arr.map((item)=> {
        let each = arr.filter((i)=> {
          return i.categoryid===item.categoryid
        })
       //console.log(item.categoryurlwithrequire)
        return({
          id:item.categoryid,
          name:item.categoryname,
          color:item.color,
          url:item.categoryurlwithrequire,
          expenses:[...each]
        })
      })
       //console.log('chartdata',chartdata);
       //console.log('====================================');
      let filteredArr = chartdata.reduce((acc, current) => {
        let x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      // console.log('====================================');
      // console.log('filter',filteredArr);
      // console.log('====================================');
      let chartdataforeachCat = filteredArr.map((item)=>{
        //console.log('item.expenses, ',item.expenses);
        let eachtotal= item.expenses.reduce((a,b)=> a+(b.enteredvalue|| 0),0)
        return(
          {
            id:item.id,
            name:item.name,
            color:item.color,
            url:item.url,
            total:eachtotal,
          }
        )
      
      })
      //console.log(chartdataforeachCat);
      let filterchartdata = chartdataforeachCat.filter((i)=>{
        return i.total>0
      })
      //console.log(filterchartdata);
      let totalExpense = filterchartdata.reduce((a,b)=> a+(b.total|| 0),0);
      //console.log('total',totalExpense);
      let finalChartData = filterchartdata.map((item)=>{
        let percentageeach = (item.total/totalExpense*100).toFixed(0);
        return( {
          id:item.id,         
          name:item.name,
          total:item.total,
          percentage:percentageeach+'%',
          url:item.url,
          color:item.color,
        })
      })
      //console.log('finalChartData',finalChartData);
      return finalChartData;
}