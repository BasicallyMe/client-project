import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function signInUser({email, password}) {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        const user = await credentials.user;
        return { status: 'success', user }; 
    } catch (err) {
        console.log(err.code, err.message);
        return { status: 'error', message: 'Please try again' }
    }
}