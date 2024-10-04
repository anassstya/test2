import { getDeals } from "./getData.js"; 

const tableBody = document.getElementById('deals-container');
const popup = document.getElementById('popup');

let currentPopupIndex = null; 

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
        
        let statusCode = `<svg width="10" height="10" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="${status}" />
    </svg>`;


        const rowElement = document.createElement('tr');
        rowElement.innerHTML = `<td>${entries[i][0]}</td><td>${entries[i][1].name}</td><td>${entries[i][1].price}</td>`; 
        
        tableBody.appendChild(rowElement);

        rowElement.addEventListener('click', () => {
            if (currentPopupIndex !== null) {
                popup.classList.add('hidden');
                popup.innerHTML = '';
            }

            rowElement.innerHTML = '<div class="spinner" role="status"><div class="animation"></div><span class="visually-hidden">Загрузка...</span></div>';

            setTimeout(() => {
                if (popup.classList.contains('hidden')) {
                    rowElement.innerHTML = `<td>${entries[i][0]}</td><td>${entries[i][1].name}</td><td>${entries[i][1].price}</td>`;
                    popup.classList.remove('hidden');
                    currentPopupIndex = i; 

                    popup.innerHTML = `<div class="popup__name">Название: ${entries[i][1].name}</div>
                                       <div class="popup__text">ID: ${entries[i][0]}</div>
                                       <div class="popup__text">Дата: ${readyDate}</div>
                                       <div>Статус: ${statusCode}</div>
                                       <button class="popup-btn" id="btn">Закрыть</button>`;
                    
                    const closeButton = document.getElementById("btn");
                    closeButton.addEventListener('click', () => {
                        popup.classList.add('hidden');
                        popup.innerHTML = '';
                        currentPopupIndex = null; 
                    });
                }
            }, 500);
        });

        if ((i + 1) % 3 === 0) {
            await delay(3000);  
        }
    }
}).catch(error => {
    console.error("Ошибка при получении данных:", error);
});
