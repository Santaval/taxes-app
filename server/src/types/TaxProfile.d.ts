export type TaxProfile = {
  id: string;
  userID: string;
  contributorType: 'persona_fisica' | 'persona_juridica';
  paysIva: boolean;
  paysRenta: boolean;
  monthlyIvaDue: boolean;
  notes?: string;
  createdAt: string; // ISO date string
};