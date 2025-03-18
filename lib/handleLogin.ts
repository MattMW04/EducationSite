import { signIn, getSession } from "next-auth/react";
import { toast } from "react-toastify"; 


async function handleLogin(username, password, router){
    const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
    });

    console.log(response);

    if (response?.error) {
        toast.error(`Login failed: ${response.error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
    } else {
        toast.success(`Login successful!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        
        const updatedSession = await getSession();
        if(updatedSession?.user?.role === "admin"){
            router.push("/admin");
        }else{
            router.push("/");
        }   
    }
};

export default handleLogin;