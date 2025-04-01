import { signIn, getSession } from "next-auth/react";
import { toast } from "react-toastify"; 


async function handleLogin(username, password, router, setError){
    const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
    });

    console.log(response);

    if (response?.error) {
        setError(response.error);
    } else {
        toast.success(`Login successful!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            style: {
            padding: "16px", 
            },
        });
        
        const updatedSession = await getSession();
        if(updatedSession?.user?.role === "admin"){
            router.push("/admin");
        }else{
            router.push("/Dashboard");
        }   
    }
};

export default handleLogin;