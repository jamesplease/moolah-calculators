import _ from "lodash";
import { maxDollarInput } from "@moolah/lib";
import { ValuesObject, NumberInput, Validator } from "../vendor/form/types";

const yearRange = {
  minYear: 1871,
  maxYear: 2020,
};

export const isRequiredNumber: Validator = (val) => {
  if (typeof val === "undefined") {
    return "empty";
  }
};

export const isRequiredString: Validator = (val) => {
  if (typeof val === "string" && val.length === 0) {
    return "empty";
  }
};

export const numberRequired: Validator = (val) => {
  const valueToVerify = Number(val);

  if (!_.isFinite(valueToVerify)) {
    return "NaN";
  }
};

export function lessThanValue(inputName: string): Validator {
  return (val, inputs) => {
    const comparisonInput = inputs[inputName] as NumberInput;
    if (Number(comparisonInput.value) < Number(val)) {
      return "greaterThanValue";
    }
  };
}

export function greaterThanValue(inputName: string): Validator {
  return (val, inputs) => {
    const comparisonInput = inputs[inputName] as NumberInput;
    if (Number(comparisonInput.value) > Number(val)) {
      return "lessThanValue";
    }
  };
}

export const greaterThanZero: Validator = (val) => {
  if (Number(val) <= 0) {
    return "lessThanZero";
  }
};

export const withinDollarLimit: Validator = (val) => {
  if (Number(val) > maxDollarInput) {
    return "tooManyDollars";
  }
};

export const integerRequired: Validator = (val) => {
  if (!Number.isInteger(Number(val))) {
    return "nonInteger";
  }
};

export const withinYearLimit: Validator = (val) => {
  const { minYear, maxYear } = yearRange;

  const year = Number(val);
  if (year > maxYear) {
    return "yearTooLarge";
  } else if (year < minYear) {
    return "yearTooSmall";
  }
};

export function dollarsTooLarge(limit: number): Validator {
  return (val) => {
    if (Number(val) > limit) {
      return {
        code: "dollarsTooLarge",
        limit,
      };
    }
  };
}

export function dollarsTooSmall(limit: number): Validator {
  return (val) => {
    if (Number(val) < limit) {
      return {
        code: "dollarsTooSmall",
        limit,
      };
    }
  };
}

export function tooLarge(limit: number): Validator {
  return (val) => {
    if (Number(val) > limit) {
      return {
        code: "tooLarge",
        limit,
      };
    }
  };
}

export function tooSmall(limit: number): Validator {
  return (val) => {
    if (Number(val) < limit) {
      return {
        code: "tooSmall",
        limit,
      };
    }
  };
}

export const isValidHexCode: Validator = (val) => {
  if (typeof val === "undefined") {
    return { code: "invalidHex" };
  }

  // First, we ensure that the length is one of the valid lengths.
  if (val.length !== 2 && val.length !== 3 && val.length !== 6) {
    return {
      code: "invalidHex",
    };
  }

  // Then we ensure that it is only comprised of valid characters
  if (!/^[0-9A-Fa-f]+$/i.test(val)) {
    return {
      code: "invalidHex",
    };
  }
};

function addUpAllInvestments(inputs: ValuesObject, types: string[]): number {
  return types.reduce((value, type) => {
    const valueInput = inputs[type] as NumberInput;
    return value + Number(valueInput.value);
  }, 0);
}

export function percentsEqualOneHundred(types: string[]): Validator {
  return (val, inputs) => {
    const investmentTotal = addUpAllInvestments(inputs, types);
    if (investmentTotal !== 100) {
      return "doesNotEqual100";
    }
  };
}
