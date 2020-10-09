# Swasthify
Swasthify, now known as Swanandam is a grocery store in Faridabad that now delivers its products in the city using this web platform as an interface for the customers.

---
Website: [Swanandam](https://swanandam.com)

---

## Instructions to run locally
* Clone this repository in your local machine by running 
	```
	git clone https://github.com/anirudhganwal06/swasthify.git
	```

* Running the Server (NO NEED TO RUN IT LOCALLY)
	- Running the server requires a Paytm developer account and project, and most of the functionalities except placing order doesn't require server calls, so running server locally will not interest you much.

* Running the Client
	- Walk into the client directory of the project and run
		```
		npm i
		```
	- Create a config.js file in /client/src/ directory and export firebase config of your firebase project. Dummy example:
		```
		const firebaseConfig = {
			apiKey: "<api key>",
			authDomain: "<dummy>.firebaseapp.com",
			databaseURL: "https://<dummy>.firebaseio.com",
			projectId: "<dummy>",
			storageBucket: "<dummy>.appspot.com",
			messagingSenderId: "<id>",
			appId: "<id>",
			measurementId: "<id>"
		};
		export default firebaseConfig;
		```
	- In the client directory run:
		```
		npm start
		```