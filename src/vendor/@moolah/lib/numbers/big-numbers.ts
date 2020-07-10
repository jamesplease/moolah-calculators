const ONE_THOUSAND = 1000;
const ONE_MILLION = ONE_THOUSAND * 1000;
const ONE_BILLION = ONE_MILLION * 1000;
const ONE_TRILLION = ONE_BILLION * 1000;
const ONE_QUADRILLION = ONE_TRILLION * 1000;
// Numbers beyond quadrillion are unsafe
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
//
// If I ever have a need to support larger numbers, then I can turn to
// solutions such as bignumber.js:
// https://github.com/MikeMcl/bignumber.js
// As of Jan 2018, that library is 8kb gzipped, though, which is quite hefty.

export {
  ONE_THOUSAND,
  ONE_MILLION,
  ONE_BILLION,
  ONE_TRILLION,
  ONE_QUADRILLION,
};
