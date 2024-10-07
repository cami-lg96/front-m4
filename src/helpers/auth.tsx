import { IUser } from '@/interface/userInterface'; 

export const isAuthenticated = (): boolean => {

  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("userData");
    return userData !== null; 
  }
  return false; 
};

export const getUserData = (): IUser | null => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null; 
  }
  return null; 
};


export const logout = (): void => {
  localStorage.removeItem("cart")
  localStorage.removeItem("userData"); 
};

export const getToken = (): string | null => {
    const userData = getUserData();
    return userData && userData.token ? userData.token : null; 
};
