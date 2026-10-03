/** Localized, serializable view-models used by the public site (no raw DB rows leave the query layer). */
export type ProfileView = {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  location: string;
  relocation: string;
  email: string;
  phone: string;
  linkedin: string;
  cvUrl: string;
};

export type ExperienceView = {
  id: string;
  company: string;
  role: string;
  location: string;
  /** ISO strings: Dates do not survive the cache serialization, strings do. */
  startDate: string;
  endDate: string | null;
  highlights: string[];
};

export type CertificationView = {
  id: string;
  name: string;
  issuer: string;
  year: number | null;
  credentialUrl: string;
};

export type EducationView = {
  id: string;
  institution: string;
  degree: string;
  note: string;
  graduationYear: number;
};

export type SkillGroupView = {
  id: string;
  title: string;
  items: string[];
};
