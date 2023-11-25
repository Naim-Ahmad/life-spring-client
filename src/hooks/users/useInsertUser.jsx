import { useMutation } from "@tanstack/react-query";
import axios from '../../config/axios.config';

export default function useInsertUser() {
    const {data, isPending, mutateAsync, mutate, isError, error}= useMutation({
        mutationKey: ['createUser'],
        mutationFn: async(formData)=>{
            const response = await axios.post("/users", formData);
            return response.data;
        }
    })

    return {data, isPending, mutateAsync, mutate, isError, error}
}