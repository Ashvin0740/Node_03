// const { response } = require("express");

console.log("this is client side js");

const weatherform  = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent =' this is showing from javascript'

weatherform.addEventListener('submit', (e)=> {
    e.preventDefault()
    var location = search.value

    messageOne.textContent = 'Loding....'
    messageTwo.textContent = ''

    fetch('http://localhost:5000/weather?address=' + location).then((res) => {
    res.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        // console.log(data.location);
        // console.log(data.forecast);
        }
    })
})
})

