export const logout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
}
