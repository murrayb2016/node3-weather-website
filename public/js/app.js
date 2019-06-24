const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault();

    messageOne.textContent = 'Loading...'; 
    messageTwo.textContent = '';

    const location = search.value;

    getWeather(location);
});

const getWeather = (location) => {

    let url = 'http://localhost:3000/weather?address='+location;

    fetch(url).then((response)=>{
        response.json().then((data) => {
            if(data.error){
                //console.log(data.error);
                messageOne.textContent = data.error; 
                messageTwo.textContent = '';
            }
            else{
                messageOne.textContent = data.forecast; 
                messageTwo.textContent = data.location;
                // console.log(data.forecast);
                // console.log(data.location);
            }
        });
    });    

}