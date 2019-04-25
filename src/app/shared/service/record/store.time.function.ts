import * as firebase from 'firebase';

export function storeTimeObject(obj: any, isNew = true) {
  const newObj = {
    ...obj,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  if (isNew) {
    newObj.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    newObj.date = firebase.firestore.Timestamp.fromDate(new Date(newObj.date));
  } else {
    newObj.createdAt = firebase.firestore.Timestamp.fromDate(new Date(newObj.createdAt.seconds * 1000));
    newObj.date = firebase.firestore.Timestamp.fromDate(new Date(newObj.date.seconds * 1000));
  }
  return newObj;
}
