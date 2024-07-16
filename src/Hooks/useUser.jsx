import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxioxSecure";

const useUser = () => {
  const axiosSecure = useAxiosSecure();
  const user = JSON.parse(localStorage.getItem('user')); // Parse user data from localStorage

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user) {
        return null; // Return null if no user data is found
      }
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data; // Assuming you get user data directly
    },
    enabled: !!user, // Only run the query if user data is available
  });

  console.log(userData);
  return { userData, isUserLoading };
};

export default useUser;
