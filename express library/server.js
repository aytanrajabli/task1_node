const fs = require('fs')
const express = require('express');
const app = express()
let employee;

try {
   const data = fs.readFileSync('./employee.json', 'utf-8')
   employee = JSON.parse(data)
} catch(err) {
   console.log(err);
}

app.listen(3000, () => {
   console.log('App listening..');
})

// get request
app.get('/', (req, res) => {
   res.send(
      employee.filter(item => ({...item}))
         .map(item => (`<p>Name: ${item.name}, Age: ${item.age}</p>`)).join('')
   )
})