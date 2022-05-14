//fetch('https://puzzle.mead.io/puzzle').then((response) => {
//    response.json().then((data) => {
//        console.log(data);
//    });
//});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${search.value}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error;
            //console.log(data.error);
        }
        else {
            messageOne.textContent = `${data.Forecast.weather}. Currently ${data.Forecast.temp} degrees out there. Feels like ${data.Forecast.feelslike} degrees.`;
            messageTwo.textContent = data.location;
            console.log(data.Forecast);
            //console.log(data.location);
        }
    });
});
});