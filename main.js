import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  addDoc,
  getDocs,
  setDoc,
  getDoc,
  doc,
  where,
  onSnapshot,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsE1OHPIdIC5ORogrF-2bRkUVykIlDZ8A",
  authDomain: "web-239-spring-2023-to-do-app.firebaseapp.com",
  projectId: "web-239-spring-2023-to-do-app",
  storageBucket: "web-239-spring-2023-to-do-app.appspot.com",
  messagingSenderId: "861081233083",
  appId: "1:861081233083:web:cd40f8a65fe20d2143ab9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const q = query(collection(db, "todos"), where("Completed", "==", false));

onSnapshot(q, (querySnapshot) => {
  const todos = [];
  querySnapshot.forEach((doc) => {
    todos.push(
      ` <tr>
        <td>${doc.data().Title}</td>
        <td>${doc.data().Description}</td>
        <td>${doc.data().Deadline}</td>
        <td><btn id="complete">Complete</btn></td>
        </tr>
      `
    );
    document.querySelector("#innerApp").innerHTML = `
  ${todos.join("<br>")}
`;
  });
});

async function AddDocument_AutoID() {
  var ref = collection(db, "todos");
  await addDoc(ref, {
    Title: document.getElementById("title").value,
    Description: document.getElementById("description").value,
    Deadline: document.getElementById("deadline").value,
    Completed: false,
  })
    .then(() => {
      alert("data added successfully");
    })
    .catch((error) => {
      alert("Unsuccessful operation, error: " + error);
    });
}

document
  .getElementById("addTask")
  .addEventListener("click", AddDocument_AutoID);

// document.getElementById("addTask").addEventListener("click", function () {
//   document.querySelector("#display-form").style.display = "block";
// });

// function writeData(e) {

// document.querySelector("#submit").addEventListener("click", (e) => {
//   e.preventDefault();
//   const docRef = await addDoc(collection(db, "todos"),{
//     Title: "Sometitle",
//     Description: "Somedescription",
//     Deadline: "Somedeadline",
//     Completed: "false"
//   });
//   // await setDoc(doc(db, "todos"), {
//   //   Title: document.getElementById("task").value,
//   //   Description: document.getElementById("description").value,
//   //   Deadline: document.getElementById("deadline").value,
//   // });
// //});
// console.log("Doc written with ID: ", docRef.id);
// })}
