import dayjs from 'dayjs'
/*
Uses dayjs and its implimentation of time to generate a 2-dimentional array
representing a month

@param
    month
        0-11 index corresponding to the given month of the year
@ensures
    returns 7x5 matrix representing of the given month
*/
export function getMonth(month = dayjs().month()){
    const year = dayjs().year();
    const firtsDayOfMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount= 0 - firtsDayOfMonth;
    let daysMatrix = null;
    if(firtsDayOfMonth==6){
        daysMatrix = new Array(6).fill([]).map(() =>{
            return new Array(7).fill(null).map(() =>{
                currentMonthCount++;
                return dayjs(new Date(year, month, currentMonthCount));
            })
        })
    }else{
        daysMatrix = new Array(5).fill([]).map(() =>{
            return new Array(7).fill(null).map(() =>{
                currentMonthCount++;
                return dayjs(new Date(year, month, currentMonthCount));
            })
        })
    }
    return daysMatrix;
}