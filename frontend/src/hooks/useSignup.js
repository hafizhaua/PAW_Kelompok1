import axios from "axios";
import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "https://bloodio-api.vercel.app/api/auth/signup",
                {
                    username,
                    email,
                    password,
                }
            );

            setIsLoading(false);
            return response;
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    };
    return { signup, isLoading, error };
};
