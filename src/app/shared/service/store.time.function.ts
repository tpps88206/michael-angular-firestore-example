import * as firebase from 'firebase';

export function storeTimeObject(obj: any, isNew = true) {
  const newObj = {
    ...obj,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  if (isNew) {
    newObj.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  }
  if (newObj.date) {
    newObj.date = firebase.firestore.Timestamp.fromDate(new Date(newObj.date));
  }
  return newObj;
}
