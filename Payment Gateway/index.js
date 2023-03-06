const express = require('express') 
const bodyparser = require('body-parser') 
const path = require('path') 
const app = express() 

var Publishable_Key = 'pk_test_51MiawdSEomcKrV6KHYktHwFXFeh3tSWOIQQgI6w6zMmdeE5Z1c9UdNGv5WywyWfm5b4jZ0tk4C1ZwFsrp3Ijn5HO003pYfksWM'
var Secret_Key = 'sk_test_51MiawdSEomcKrV6KN7ua9s2Lja34zFsg3tKMf3P4QYBma8ER9HGiwhRpNqB5PG4UPcMFAc6ZxfqNaWcnmX8jAlzj00qAjQxLtY'

const stripe = require('stripe')(Secret_Key) 

const port = process.env.PORT || 3000 

app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.get('/', function(req, res){ 
	res.render('Home', { 
	key: Publishable_Key 
	}) 
}) 

app.post('/payment', function(req, res){ 

	
	stripe.customers.create({ 
		email: req.body.stripeEmail, 
		source: req.body.stripeToken, 
		name: 'Abhishek', 
		address: { 
			line1: 'Sec-4 UIT', 
			postal_code: '301019', 
			city: 'Bhiwadi', 
			state: 'Rajasthan', 
			country: 'India', 
		} 
	}) 
	.then((customer) => { 

		return stripe.charges.create({ 
			amount: 7000,	 
			description: 'React JS', 
			currency: 'USD', 
			customer: customer.id 
		}); 
	}) 
	.then((charge) => { 
		res.send("Success") // If no error occurs 
	}) 
	.catch((err) => { 
		res.send(err)	 // If some error occurs 
	}); 
})

app.listen(port, function(error){ 
	if(error) throw error 
	console.log("Server created Successfully") 
}) 