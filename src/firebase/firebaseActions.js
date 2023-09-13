import { doc, setDoc } from "firebase/firestore"
import database from "./firebaseConfig"

export const setUserToFirebase = (user) => {
    setDoc(doc(database, `users/${user.uid}`), {
        name: user.displayName,
        email: user.email,
        uid: user.uid
    });
}