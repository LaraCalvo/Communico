const homePage = document.getElementById('home-page');
const startButton = document.getElementById('start-button');

const registrationPage = document.getElementById('registration-page')
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('sign-up-form');

const userPage = document.getElementById('main-page');
const logoutButton = document.getElementById('logout-btn');
const sendMessageForm = document.getElementById('send-message-form');
const getMessageButton = document.getElementById('get-message-btn');
const getMessageTextArea = document.getElementById('get-message-text-area');

const successMessageToast = document.getElementById('success-message-toast');
const closeToastBtn = document.getElementById('close-toast-btn');

startButton.addEventListener('click', (e) => {
    homePage.style.display = 'none';
    registrationPage.style.display = 'block';
})


//Sign up 
signupForm.addEventListener('submit', (e) => {
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;
    const name = document.querySelector("#signup-name").value;
    auth_firebase.createUserWithEmailAndPassword(email, password).then(userCredential => {
        //clear the form
        signupForm.reset();
        console.log("sign-up");
        registrationPage.style.display = 'none';
        userPage.style.display = 'block';
    })
})


//Login 
loginForm.addEventListener('submit', (e) =>{
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    auth_firebase.signInWithEmailAndPassword(email, password).then(userCredential => {
        //clear the form
        loginForm.reset();
        registrationPage.style.display = 'none';
        userPage.style.display = 'block';
    })
})

//Send message
sendMessageForm.addEventListener('submit', (e) => {
    var newMessage = {
        message: document.querySelector('#message-text-area').value
    };
    fs.collection('messages').add(newMessage).then(() => {
        console.log("Document successfully written!");
    })
    sendMessageForm.reset();
    successMessageToast.style.display = 'block';
})

closeToastBtn.addEventListener('click', (e) => {
    successMessageToast.style.display = 'none';
})

getMessageButton.addEventListener('click', (e) => {
    fs.collection("messages_approved").doc('messages').get().then(function(doc) {
        if (doc.exists) {
            messages = doc.data().messagesArray;
            index = Math.floor(Math.random() * messages.length);
            console.log(messages[index]);
            getMessageTextArea.value = messages[index];

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
})



//Sign out
logoutButton.addEventListener('click', (e) => {
    auth_firebase.signOut().then(() => {
        console.log('sign out');
        userPage.style.display = 'none';
        homePage.style.display = 'block';
    })
})


