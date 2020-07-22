// Source:
// https://math.stackexchange.com/a/1698634/297773
export default function computeCompoundInterest(options = {}) {
  const {
    principal = 0,
    annualContribution = 0,
    numberOfYears = 5,
    interestRate = 0.07,
    contributionsMadeAtStart = false,
  } = options;

  if (interestRate === 0) {
    return principal + annualContribution * numberOfYears;
  }

  const normalizedInterest = 1 + interestRate;
  const discountRate = interestRate / normalizedInterest;
  const growthFactor = normalizedInterest ** numberOfYears;

  const rateToApply = contributionsMadeAtStart ? discountRate : interestRate;
  const appliedContributions = annualContribution / rateToApply;

  return (
    (principal + appliedContributions) * growthFactor - appliedContributions
  );
}
