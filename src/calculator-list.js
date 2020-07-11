import PurchasingPowerOverTime from "./calculators/purchasing-power-over-time/purchasing-power-over-time";
import CounteractingInflation from "./calculators/counteracting-inflation/counteracting-inflation";

export default [
  {
    url: "/purchasing-power-over-time",
    name: "Purchasing Power Over Time",
    Component: PurchasingPowerOverTime,
  },

  {
    url: "/counteracting-inflation",
    name: "Counteracting Inflation",
    Component: CounteractingInflation,
  },
];
