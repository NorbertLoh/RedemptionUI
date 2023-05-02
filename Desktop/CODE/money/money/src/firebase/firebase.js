import { initializeApp } from "firebase/app"
import { getDatabase, push, ref } from "firebase/database"


const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: "money-82971.firebaseapp.com",
    projectId: "money-82971",
    storageBucket: "money-82971.appspot.com",
    messagingSenderId: "778983437430",
    appId: "1:778983437430:web:fa621a5534db431f5b1b57",
    databaseURL: "https://money-82971-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)



export { db }