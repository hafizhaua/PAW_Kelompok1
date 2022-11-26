import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost:8000/auth/signup",
                {
                    username,
                    email,
                    password,
                    // roles: ["user", "admin"],
                }
            );

            const json = await response.data;

            console.log("Data masuk, ", json);

            localStorage.setItem("user", JSON.stringify(json));

            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error);
            console.log(error);
        }
    };
    return { signup, isLoading, error };
};
