const FirestoreInit = (function (){
    var instance;
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDVxegRPtYPOi4p2tBPeinn1ZmqXWSVsFE",
        authDomain: "new-app-1b211.firebaseapp.com",
        databaseURL: "https://new-app-1b211.firebaseio.com",
        projectId: "new-app-1b211",
        storageBucket: "new-app-1b211.appspot.com",
        messagingSenderId: "31628800631"
    };
    firebase.initializeApp(config);

    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();

    function getDb() {
        return db;
    }

    function createInstance() {
        return {
            getDb
        }
    }

    return {
        getInstance() {
            return instance || (instance = createInstance());
        }
    }
})();