const express = require('express');

const request = require('request');

const https = require('https');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/signup.html');
});

app.get('/success', (req, res) => {
	res.sendFile(__dirname + '/success.html');
});

app.get('/failure', (req, res) => {
	res.sendFile(__dirname + '/failure.html');
});

app.post('/failure', (req, res)=>{
    res.redirect('/')
})

app.post('/', (req, res) => {
	const username = req.body.username;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
				merge_fields: {
					UNAME: username,
				},
			},
		],
	};

	const jsonData = JSON.stringify(data);

	const url = 'https://us6.api.mailchimp.com/3.0/lists/47b34541c1';

	const options = {
		method: 'POST',
		auth: 'olutunde:b368b6d141c1344740b4d3f5f52ad1c1-us6',
	};
	const request = https.request(url, options, (response) => {
		if (response.statusCode === 200) {
			res.redirect('/success');
		} else {
			res.redirect('/failure');
		}
		response.on('data', (data) => {
			console.log(JSON.parse(data));
		});
	});

	request.write(jsonData);
	request.end();
});

app.listen(3000, () => {
	console.log('Listening boss');
});

//API KEY
//b368b6d141c1344740b4d3f5f52ad1c1-us6

//Audience ID
//47b34541c1
