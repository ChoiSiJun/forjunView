export interface PersonalParams {
  name: string;
  job: string;
  profile_image: File | null;
  awards?: PersonalAwardsParams[];
  companies?: PersonalCompanyParams[];
  skills?: PersonalSkillParams[];
}

export interface PersonalCompanyParams {
  companyName: string;
  startDate: string;
  endDate: string;
}

export interface PersonalAwardsParams {
  awardName: string;
}

export interface PersonalSkillParams {
  skillName: string;
}
