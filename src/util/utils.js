import firebase from 'firebase';
import { notify } from './toast';

export const getCart = () => {
  return JSON.parse(localStorage?.getItem('localCart'));
};

export const addToCart = async (course, props, buy) => {
  if (!verifyMyCourses(course.id)) {
    const currentCart = JSON.parse(localStorage?.getItem('localCart')) || [];

    const arr = [...currentCart];

    if (!arr.some((c) => c?.id === course?.id)) {
      arr.push(course);
    }

    localStorage.setItem('localCart', JSON.stringify(arr));

    notify('Curso adicionado ao carrinho!', 2000, 'success');
    if (buy) {
      props.history.push('/cart');
    }
  } else {
    notify('Você já tem esse curso!', 2000, 'success');
    props.history.push('/dashboard');
  }
};

export const removeItemToCart = (course) => {
  const currentCart = JSON.parse(localStorage?.getItem('localCart')) || [];

  let arr = [...currentCart];

  arr = arr.filter(item => item.id !== course.id)

  localStorage.setItem('localCart', JSON.stringify(arr));
};

export const clearCart = () => {
  localStorage.removeItem('localCart');
};

export const updateLocalStorageMyCourses = (props) => {
  async function fetchData() {
    const db = firebase.firestore();

    const userRef = db.collection('users').doc(localStorage.getItem('user'));

    await userRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          localStorage.setItem(
            'myCourses',
            JSON.stringify(doc.data().myCourses)
          );
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
        notify('Agora você já pode estudar!', 1000, 'success');
        localStorage.removeItem('localCart');
        props.history.push('/dashboard');
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }
  fetchData();
};

export const verifyMyCourses = (courseId) => {
  const myCourses = JSON.parse(localStorage?.getItem('myCourses')) || [];

  const arr = [...myCourses];

  if (arr.includes(courseId)) {
    return true;
  }
  return false;
};

export const verifyProfileCompleted = async () => {
  const db = firebase.firestore();

  const usersRef = db.collection('users');

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      usersRef
        .where('uid', '==', user.uid)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            return true;
          } else {
            return false;
          }
        })
        .catch((error) => {
          console.log(error);
          notify(error, 1000, 'error');
        });
    }
  });
};
