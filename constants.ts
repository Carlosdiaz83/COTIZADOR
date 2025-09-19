
import { PlanData, PlanKey, FamilyTypeKey } from './types';

export const PLAN_DATA: PlanData = {
  "200": {
    "age_ranges": {
      "1-29": {
        "Individual": 59473,
        "Matrimonio": 120429,
        "Matrimonio + 1 Hijo": 148187,
        "Matrimonio + 2 Hijos": 175522,
        "Matrimonio + 3 Hijos": 198124,
        "Adicional Menor de 1 año": 123482,
        "Adicional Menor de 25 años": 39766
      },
      "30-39": {
        "Individual": 74659,
        "Matrimonio": 138087,
        "Matrimonio + 1 Hijo": 168882,
        "Matrimonio + 2 Hijos": 201162,
        "Matrimonio + 3 Hijos": 227507,
        "Adicional Menor de 1 año": 123482,
        "Adicional Menor de 25 años": 39766
      },
      "40-49": {
        "Individual": 83180,
        "Matrimonio": 156998,
        "Matrimonio + 1 Hijo": 191062,
        "Matrimonio + 2 Hijos": 222030,
        "Matrimonio + 3 Hijos": 246948,
        "Adicional Menor de 1 año": 123482,
        "Adicional Menor de 25 años": 39766
      },
      "50-59": {
        "Individual": 98088,
        "Matrimonio": 185157,
        "Matrimonio + 1 Hijo": 224695,
        "Matrimonio + 2 Hijos": 259119,
        "Matrimonio + 3 Hijos": 282525,
        "Adicional Menor de 1 año": 123482,
        "Adicional Menor de 25 años": 39766
      }
    }
  },
  "300": {
    "age_ranges": {
      "1-29": {
        "Individual": 86878,
        "Matrimonio": 179548,
        "Matrimonio + 1 Hijo": 204128,
        "Matrimonio + 2 Hijos": 241351,
        "Matrimonio + 3 Hijos": 262471,
        "Adicional Menor de 1 año": 138756,
        "Adicional Menor de 25 años": 55941
      },
      "30-39": {
        "Individual": 117391,
        "Matrimonio": 202150,
        "Matrimonio + 1 Hijo": 247002,
        "Matrimonio + 2 Hijos": 292348,
        "Matrimonio + 3 Hijos": 318623,
        "Adicional Menor de 1 año": 138756,
        "Adicional Menor de 25 años": 55941
      },
      "40-49": {
        "Individual": 131288,
        "Matrimonio": 237370,
        "Matrimonio + 1 Hijo": 286846,
        "Matrimonio + 2 Hijos": 327248,
        "Matrimonio + 3 Hijos": 358215,
        "Adicional Menor de 1 año": 138756,
        "Adicional Menor de 25 años": 55941
      },
      "50-59": {
        "Individual": 161535,
        "Matrimonio": 300025,
        "Matrimonio + 1 Hijo": 358791,
        "Matrimonio + 2 Hijos": 399913,
        "Matrimonio + 3 Hijos": 436642,
        "Adicional Menor de 1 año": 138756,
        "Adicional Menor de 25 años": 55941
      }
    }
  },
  "400": {
    "age_ranges": {
      "1-29": {
        "Individual": 100793,
        "Matrimonio": 202927,
        "Matrimonio + 1 Hijo": 247708,
        "Matrimonio + 2 Hijos": 280553,
        "Matrimonio + 3 Hijos": 305062,
        "Adicional Menor de 1 año": 166491,
        "Adicional Menor de 25 años": 62227
      },
      "30-39": {
        "Individual": 137239,
        "Matrimonio": 236337,
        "Matrimonio + 1 Hijo": 288675,
        "Matrimonio + 2 Hijos": 342568,
        "Matrimonio + 3 Hijos": 372869,
        "Adicional Menor de 1 año": 166491,
        "Adicional Menor de 25 años": 62227
      },
      "40-49": {
        "Individual": 150949,
        "Matrimonio": 272730,
        "Matrimonio + 1 Hijo": 329696,
        "Matrimonio + 2 Hijos": 375931,
        "Matrimonio + 3 Hijos": 391919,
        "Adicional Menor de 1 año": 166491,
        "Adicional Menor de 25 años": 62227
      },
      "50-59": {
        "Individual": 181916,
        "Matrimonio": 338842,
        "Matrimonio + 1 Hijo": 404738,
        "Matrimonio + 2 Hijos": 451406,
        "Matrimonio + 3 Hijos": 492960,
        "Adicional Menor de 1 año": 166491,
        "Adicional Menor de 25 años": 62227
      }
    }
  },
  "500": {
    "age_ranges": {
      "1-29": {
        "Individual": 143172,
        "Matrimonio": 288181,
        "Matrimonio + 1 Hijo": 383817,
        "Matrimonio + 2 Hijos": 434885,
        "Matrimonio + 3 Hijos": 472814,
        "Adicional Menor de 1 año": 240853,
        "Adicional Menor de 25 años": 117956
      },
      "30-39": {
        "Individual": 194875,
        "Matrimonio": 335575,
        "Matrimonio + 1 Hijo": 419840,
        "Matrimonio + 2 Hijos": 531086,
        "Matrimonio + 3 Hijos": 577986,
        "Adicional Menor de 1 año": 240853,
        "Adicional Menor de 25 años": 117956
      },
      "40-49": {
        "Individual": 214324,
        "Matrimonio": 414533,
        "Matrimonio + 1 Hijo": 511108,
        "Matrimonio + 2 Hijos": 582766,
        "Matrimonio + 3 Hijos": 607468,
        "Adicional Menor de 1 año": 240853,
        "Adicional Menor de 25 años": 117956
      },
      "50-59": {
        "Individual": 276475,
        "Matrimonio": 525512,
        "Matrimonio + 1 Hijo": 660761,
        "Matrimonio + 2 Hijos": 699578,
        "Matrimonio + 3 Hijos": 764178,
        "Adicional Menor de 1 año": 240853,
        "Adicional Menor de 25 años": 117956
      }
    }
  }
};


export const PLAN_OPTIONS: { value: PlanKey; label: string }[] = [
    { value: "200", label: "Plan 200" },
    { value: "300", label: "Plan 300" },
    { value: "400", label: "Plan 400" },
    { value: "500", label: "Plan 500" },
    { value: "POR_APORTES", label: "Plan por Aportes" },
];

export const FAMILY_TYPE_OPTIONS: { value: FamilyTypeKey; label: string }[] = [
    { value: "Individual", label: "Individual" },
    { value: "Matrimonio", label: "Matrimonio" },
    { value: "Matrimonio + 1 Hijo", label: "Matrimonio + 1 Hijo" },
    { value: "Matrimonio + 2 Hijos", label: "Matrimonio + 2 Hijos" },
    { value: "Matrimonio + 3 Hijos", label: "Matrimonio + 3 Hijos" },
    { value: "Adicional Menor de 1 año", label: "Adicional Menor de 1 año" },
    { value: "Adicional Menor de 25 años", label: "Adicional Menor de 25 años" },
];