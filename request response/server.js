const fs = require('fs')
const express = require('express');
const app = express()
let product;
try {
   const data = fs.readFileSync('./product.json', 'utf-8')
   product = JSON.parse(data)
} catch(err) {
   console.log(err);
}
app.listen(3000, () => {
   console.log('App listening..');
})

// get request
app.get('/', (req, res) => {
   res.send(
      product.filter(item => ({ ...item }))
         .map(item => (
            `<p>
               <b>ID: </b> ${item.id},
               <b>Name:</b> ${item.name}, 
               <b>Price:</b> ${item.price},
               <b>Quantity:</b> ${item.quantity}
             </p>`
         )).join('')
   )
})

// ID params
app.get('/product/:id', (req, res) => {
   const id = parseInt(req.params.id)
   const productId = product.findIndex(item => Number(item.id) === id)

   if (productId === -1) return res.status(404).send()
   res.send(
      `<p>
         <b>ID: </b> ${product[productId].id},
         <b>Name:</b> ${product[productId].name}, 
         <b>Price:</b> ${product[productId].price},
         <b>Quantity:</b> ${product[productId].quantity}
       </p>`
   )
})

app.get('/product', (req, res) => {
   const count = parseInt(req.query.count);
   const offset = parseInt(req.query.offset);
   const max = count + offset;

   // check
   if(max > product.length) return res.status(404).send()
   res.send(
      product.filter((item, index) => (index >= offset && index < max ))
      .map(item => (
         `<p>
            <b>ID: </b> ${item.id},
            <b>Name:</b> ${item.name}, 
            <b>Price:</b> ${item.price},
            <b>Quantity:</b> ${item.quantity}
          </p>`
      )).join('')
   );
})