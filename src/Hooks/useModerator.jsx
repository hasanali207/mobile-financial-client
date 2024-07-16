import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxioxSecure";

const useModerator = (userEmail) => {
  const axiosSecure = useAxiosSecure();

  const { data: isModerator, isLoading: isModeratorLoading } = useQuery({
    queryKey: ["isModerator", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/moderator/${userEmail}`);
      return res.data?.moderator || false; // Assuming moderator field is boolean
    },
  });

  return [isModerator, isModeratorLoading];
};

export default useModerator;
