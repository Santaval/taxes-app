type BaseReport = {
  month: number;
  year: number;
}

export interface BalanceReport extends BaseReport {
  income: number;
  expenses: number;
  balance: number;
}

export interface IVAReport extends BaseReport {
  vatCharged: number;
  vatDeductible: number;
  vatNet: number;
}


export type ReportsDataMap = {
  balance: BalanceReport;
  iva: IVAReport
}
