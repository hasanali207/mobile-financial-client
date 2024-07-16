import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxioxSecure";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const user = JSON.parse(localStorage.getItem('user')); // Parse user data from localStorage

    const { data: roles, isLoading } = useQuery({
        queryKey: [user?.email, 'roles'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data;
        },
        enabled: !!user // Ensure the query only runs if user exists
    });

    const isAdmin = roles?.admin;
    const isModerator = roles?.moderator;

    return { isAdmin, isModerator, isLoading };
};

export default useAdmin;
