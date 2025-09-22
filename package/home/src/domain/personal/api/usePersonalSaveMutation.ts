import axios from '@config/axios/axios';
import { useMutationWithLoading } from '@config/hooks/useMutationWithLoading';
import { AxiosError } from 'axios';
import { useQueryClient } from 'react-query';

interface PersonalParams {
  name: string;
  job: string;
  profile_image_url: string;
  awards: PersonalAwardsParams[];
  companies: PersonalCompanyParams[];
  skills: PersonalSkillParams[];
}

interface PersonalAwardsParams {
  awardName: string;
}

interface PersonalCompanyParams {
  companyName: string;
  startDate: string;
  endDate: string;
}

interface PersonalSkillParams {
  skillName: string;
}

const usePersonaSaveMutation = () => {
  const queryClient = useQueryClient();

  return useMutationWithLoading<void, AxiosError, PersonalParams>({
    mutationFn: async (params: PersonalParams) => {
      await axios.post<void>(
        import.meta.env.VITE_REST_API + '/personal',
        params,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['personal']);
    },
  });
};

export default usePersonaSaveMutation;
