
export type PlanKey = "200" | "300" | "400" | "500" | "POR_APORTES";
export type FamilyTypeKey =
  | "Individual"
  | "Matrimonio"
  | "Matrimonio + 1 Hijo"
  | "Matrimonio + 2 Hijos"
  | "Matrimonio + 3 Hijos"
  | "Adicional Menor de 1 año"
  | "Adicional Menor de 25 años";
export type AgeRangeKey = "1-29" | "30-39" | "40-49" | "50-59";

export type PlanDetails = {
  [key in FamilyTypeKey]?: number;
};

export type AgeRangeDetails = {
  [key in AgeRangeKey]?: PlanDetails;
};

export type PlanData = {
  [key in PlanKey]?: {
    age_ranges: AgeRangeDetails;
  };
};

export interface Result {
    message: string;
    amount: number | null;
    planValue?: number;
}