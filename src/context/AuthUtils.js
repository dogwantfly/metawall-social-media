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
export const setAuthToken = (token) => localStorage.setItem('authToken', token);
export const removeAuthToken = () => localStorage.removeItem('authToken');
