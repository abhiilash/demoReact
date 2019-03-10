import firebase from 'firebase';
import 'firebase/firestore';

/**
  * Get all this User's Details
  */
export function getUsers() {
  return dispatch => { 
    firebase.firestore().collection('users').onSnapshot(function(snapshot) {
      const data = []
      snapshot.forEach( async function(doc) {
        const users = doc.data()
        users.id = doc.id
        data.push(users)       
      })
      return dispatch({
        type: 'getUsersRef',
        data: {success: true, data}
      });
    })
  }
}

/**
  * Get this User's Details
  */
export function getUserById(id) {
  return dispatch => { 
    firebase.firestore().collection('users').doc(id).get().then(function(doc) {
      if (doc.exists) {
        return dispatch({
          type: 'getUsersByIDRef',
          data: {success: true, data: doc.data()}
        });
      } else {
        return dispatch({
          type: 'getUsersByIDRef',
          data: {success: false}
        });
      }
    }).catch(function(error) {
      return dispatch({
        type: 'getUsersByIDRef',
        data: {success: false}
      });
    });
    
  }
}

/**
  * Edit this User's Details
  */
export function editUsers(data) {
  const id = data.id 
  delete data.id
  return dispatch => { 
    firebase.firestore().collection('users').doc(id).set(data)
    .then(function() {
      return dispatch({
        type: 'editUsersRef',
        data: {success: true}
      });
    })
    .catch(function(error) {
      return dispatch({
        type: 'editUsersRef',
        data: {success: false}
      });
    });
  }
}

/**
  * Delete this User's Details
  */
export function deleteUsers(id) {
  return dispatch => { 
  firebase.firestore().collection("users").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
  }
}

/**
  * Delete this User's Details
  */
export function addUsers(data) {
  return dispatch => {
    firebase.firestore().collection("users").add(data)
    .then(function(docRef) {
      return dispatch({
        type: 'addUsersRef',
        data: {success: true}
      });
    })
    .catch(function(error) {
      return dispatch({
        type: 'addUsersRef',
        data: {success: false}
      });
    });
  }
}
/**
  * reset props
  */
export function resetUsers() {
  return dispatch => { 
    return dispatch({
      type: 'resetUsersRef'
    });
  }
}