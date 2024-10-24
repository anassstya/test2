import { getDeals } from "./getData.js"; 


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

getDeals().then(async (data) => {  
    const entries = Object.entries(data);

    for (let i = 0; i < entries.length; i++) {
        let date = entries[i][1]['updated_at'];
        let dateChange = new Date(date * 1000);
        let readyDate =`${String(dateChange.getDate()).padStart(2, '0')}.${String(dateChange.getMonth() + 1).padStart(2, '0')}.${dateChange.getFullYear()}`; 
        let closed = entries[i][1]['closed'];
        let closedChanged = new Date(closed * 1000);
        let today = new Date();

        let status = '';
        if(closedChanged.getDate() === today.getDate()){
            status = 'green'
        }
        if(closedChanged.getDate() < today.getDate()){
            status = 'red'
        }
        if(closedChanged.getDate() > today.getDate() ){
            status = 'yellow'
        }
        if(closedChanged.getDate() === today.getDate()){
          console.log('green')
      }
      }   
  })