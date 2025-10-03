export interface Personal {
  name: string;
  job: string;
  profile_image_url: string | null;
  awards?: PersonalAwards[];
  companies?: PersonalCompany[];
  skills?: PersonalSkill[];
}

export interface PersonalCompany {
  companyName: string;
  startDate: string;
  endDate: string;
}

export interface PersonalAwards {
  awardName: string;
}

export interface PersonalSkill {
  skillName: string;
}
