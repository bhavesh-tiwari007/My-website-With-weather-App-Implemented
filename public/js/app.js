console.log("Client side JS is loaded")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();




    fetch('http://localhost:3000/weather?location=' + encodeURIComponent(search.value)).then((response) => {
        response.json().then((data) => {
            console.log(data.forecast.Temp + '\n' + data.address)
        })
    })

})