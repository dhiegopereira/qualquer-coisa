import firebase from 'firebase';

export const TOKEN_KEY = '@jacode-token';
export const EMAIL_USER = '@jacode-email';

export const istAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getEmail = () => localStorage.getItem(EMAIL_USER);

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const email = (emailUser) => {
  localStorage.setItem(EMAIL_USER, emailUser);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_USER);
};

export const getUserLogged = async () => {
  const db = firebase.firestore();

  var usersRef = db.collection('users');

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      usersRef
        .where('uid', '==', user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            return doc.data();
          });
        });
    }
  });
};
