function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
export const getAuthToken = () => {
    const authToken = getCookie('authToken');
    console.log(authToken);
    return authToken;
}
export const getUserName = () => {
    const userName = getCookie('userName');
    console.log(userName);
    return userName;
}
export const getUserEmail = () => {
    const userEmail = getCookie('userEmail');
    console.log(userEmail);
    return userEmail;
}
export const setAuthToken = (token) => localStorage.setItem('authToken', token);
export const removeAuthToken = () => {
    document.cookie = `authToken=; path=/; expires=${new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toUTCString()}`;
};
