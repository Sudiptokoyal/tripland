import { signOut } from '../firebase';

export const logout = () => {
    signOut().then(() => {
        localStorage.setItem('token', '');
        localStorage.setItem('user', '');
    }).catch(err => console.log(err))
}
