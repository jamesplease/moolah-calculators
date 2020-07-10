type AdjustmentTypes = 'additionalIncome' | 'additionalWithdrawals';

interface LocationObject {
  query: {
    [Key: string]: any;
    [Key: number]: any;
  };
}

export default function adjustmentFromLocation(
  location: LocationObject,
  key: AdjustmentTypes
): any[] {
  const query = location.query || {};
  const stringifiedAdjustments = query[key];

  let result;
  try {
    result = JSON.parse(stringifiedAdjustments);
  } catch {
    result = [];
  }

  if (Array.isArray(result)) {
    return result;
  } else {
    return [];
  }
}
