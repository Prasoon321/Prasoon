import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, addDoc, collection, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";

// Initializing the Firebase configuration
// this is the confurigation we use when we create our database in the firebase website
const firebaseConfig = {
    apiKey: "AIzaSyDs8WR1Xi-v22iIhsG0rX6YGXMRx7q27cU",
    authDomain: "prasoon-portfolio-e5b47.firebaseapp.com",
    projectId: "prasoon-portfolio-e5b47",
    storageBucket: "prasoon-portfolio-e5b47.appspot.com",
    messagingSenderId: "426782865116",
    appId: "1:426782865116:web:9f2ee135fced301a7f2619",
    measurementId: "G-G29HCZS4LY"
};

// Initializing the Firebase app
const app = initializeApp(firebaseConfig);

// Initializing Firestore
// this is the database of the firebase which will result in adding and subtraction of the collection 
const db = getFirestore(app);

// Reference to the collection
// as firebase is no sql we create collection here just like the moongodb 
const colref = collection(db, "clients");


// we use query just like in other database to extract a particular data according to where condition 
// where("requestType", "==", "frontend"),
const q = query(colref, orderBy("createdAt"))

// this function will only run when this condition is fullfill "requestType", "==", "frontend"
async function fetchClientsquery() {
    try {
        // omSnapshot is the method of the firestore that allows to fetch data in real time without refreshing the page
        onSnapshot(q, (snapshot) => {

            let clientsquery = [];
            console.log(snapshot.docs);
            snapshot.docs.forEach((docs) => {
                // here spread operator added all the data inside the clients array the checks for the id: docs.id  
                // if it was already inside the docs.data() it will update it if not it will add it in the array
                // we get data as the prototype from the docs
                clientsquery.push({ ...docs.data(), id: docs.id });
            });
            console.log(clientsquery);
        });
    } catch (error) {
        console.log(error);
    }
}

// fetchClientsquery();

// this method will fetch the clients (collection from the database)
async function fetchClients() {
    try {
        // omSnapshot is the method of the firestore that allows to fetch data in real time without refreshing the page
        onSnapshot(colref, (snapshot) => {

            let clients = [];
            console.log(snapshot.docs);
            snapshot.docs.forEach((docs) => {
                // here spread operator added all the data inside the clients array the checks for the id: docs.id  
                // if it was already inside the docs.data() it will update it if not it will add it in the array
                // we get data as the prototype from the docs
                clients.push({ ...docs.data(), id: docs.id });
            });
            console.log(clients);
        });
    } catch (error) {
        console.log(error);
    }
}

// fetchClients(); // Calling the async function

//  adding a new data ij our clients collections

let handleAddFormquery = document.querySelector(".addclient")
console.log(handleAddFormquery)
async function addClient(e) {
    try {
        const snapshot = await addDoc(colref, {
            email: e.target.email.value,
            requestType: e.target.category.value,
            message: e.target.message.value,
            createdAt: serverTimestamp()
        })
        console.log("Client added successfully:", snapshot);

    } catch (error) {
        console.log("Error adding client:", error);;
    }
}
handleAddFormquery.addEventListener("submit", (e) => {
    e.preventDefault();
    addClient(e);
    e.target.reset()
})


