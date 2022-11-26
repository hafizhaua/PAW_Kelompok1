import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost:8000/auth/signin",
                {
                    username,
                    password,
                }
            );

            const json = await response.data;

            console.log(json);

            localStorage.setItem("user", JSON.stringify(json));

            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    };
    return { login, isLoading, error };
};
