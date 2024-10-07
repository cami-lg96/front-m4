import { IRegister } from "@/interface/userInterface";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function register(userData: IRegister) {
    try {
        console.log('Register Data to send:', userData);
        const res = await fetch(`${APIURL}/users/register`, {
            method: "POST",
            headers: { "Content-type" : "application/json"},
            body: JSON.stringify(userData)
        })
         console.log('Register Response:', res);



   if (res.ok) {
    const data = await res.json();
    console.log('Register Response Data:', data);
    return data;
} else {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to register");
}
} catch (error) {
    console.error('Register Error:', error);
throw new Error((error as Error).message || "Registration failed");
}
};


import { ILogin } from "@/interface/userInterface";


export async function login(userData: ILogin) {
    try {
        console.log('Login Data to send:', userData);

        const res = await fetch(`${APIURL}/users/login`, {
            method: "POST",
            headers: { "Content-type" : "application/json"},
            body: JSON.stringify(userData)
        });
        console.log('Login Response:', res);

   
if (res.ok) {
    const data = await res.json();
    console.log('Login Response Data:', data);
    return data;
} else {
    throw new Error("Failed to login");
}
} catch (error) {
console.error('Login Error:', error);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
throw new Error(error as any);
}
};



