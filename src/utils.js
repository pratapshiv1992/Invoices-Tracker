import {db } from './firestore';
export const getFormattedDate = (date,format) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    let formattedDate  = null;
    switch(format){
        case 'YYYY-MM-DD' :
        formattedDate = [year, month, day].join('-');
        break;
        default : 
        formattedDate = date;
    }
    return formattedDate;
}



export const checkInteger = (value) => {
  if (isNaN(value)) {
    return true;
  }else{
      return false;
  }
}

export const addInCollection = (collection,data)=>{
db.collection(collection).add(data);
}

export const readCollection = (collection)=>{
return db.collection(collection)//.onSnapshot(snap=>snap);
}
