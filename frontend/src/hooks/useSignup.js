import axios from "axios";
import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const { dispatch } = useAuthContext();

    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            await axios.post("https://bloodio-api.vercel.app/api/auth/signup", {
                username,
                email,
                password,
            });

            // const json = await response.data;

            // localStorage.setItem("user", JSON.stringify(json));

            // dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    };
    return { signup, isLoading, error };
};
