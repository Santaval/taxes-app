export interface Company {
  id: string;
  name: string;
}

export interface NewCompany {
  name: string;
}

export type CompanyFields = keyof Company;
