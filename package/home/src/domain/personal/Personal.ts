export interface Personal {
  name: string;
  job: string;
  profileImageUrl: string | null;
  awards?: PersonalAwards[];
  companies?: PersonalCompany[];
  skills?: PersonalSkill[];
  certificates?: PersonalCertificate[];
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
  skillCategory: string;
  skillName: string;
}

export interface PersonalCertificate {
  certificateName: string;
  certificateAcquisitionOrganization: string;
  certificateAcquisitionDate: string;
}
