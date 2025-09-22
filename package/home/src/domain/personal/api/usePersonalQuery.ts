import axios from '@config/axios/axios';
import { useQueryWithLoading } from '@config/hooks/useQueryWithLoading';

interface PersonalResponse {
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
const fetchPersonal = async (): Promise<PersonalResponse> => {
  return axios
    .get<PersonalResponse>(import.meta.env.VITE_REST_API + '/personal')

    .then(res => res.data);
};

const usePersonalQuery = () => {
  return useQueryWithLoading<PersonalResponse>({
    queryKey: ['personal'], // 고정된 key
    queryFn: () => fetchPersonal(),
  });
};

export default usePersonalQuery;
