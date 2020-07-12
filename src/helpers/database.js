import { firebaseDatabase } from '../config/firebaseConfig'

export const saveUserDatabase = ( user, cb) => {
  firebaseDatabase().ref(`user/${user.uid}`).set({
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    id: user.uid
  }, cb)
}

export const saveFavorites = (user,movie,cb) => {
  firebaseDatabase().ref(`user/${user.id}`).child(`favorites/${movie.id}`).set(movie,cb)
}

export const getSaveFavorites = (userId) => {
  return new Promise((resolve) => {
    firebaseDatabase().ref(`user/${userId}/favorites`).on('value', snapshot => {
      resolve(snapshot.val())
    })
  })
}

export const removeFavorites = (user,idMovie,cb) => {
  firebaseDatabase().ref(`user/${user.id}`).child(`favorites/${idMovie}`).remove(cb)
}

export const isMovieFavorite = (user,idMovie,cb) => {
  firebaseDatabase().ref(`user/${user.id}/favorites/${idMovie}`).on('value',cb)
}


