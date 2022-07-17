// API
export const API_BASE_URL = "https://min-api.cryptocompare.com";
export const API_KEY =
  "803c94d04602d67745b502400692d6d662240a7f37e5c7e9d72b64f74d3dd133";

// UI
const REM_SIZE = 16;

export const COLORS = {
  primary: "#3FB6B2",
  accent: "#6DC849",
  textPrimary: "#131313",
  textSecondary: "#666666",
  background: "#FFFFFF",
  backgroundCard: "#F0F0F0",
  borderPrimary: "#CFCFCF",

  white: "#FFFFFF",
  positive: "#16c784",
  negative: "#ea3943",
};

export const TACHYONS_CONFIG = {
  rem: REM_SIZE,
  colors: {
    palette: COLORS,
  },
};

// PERIOD_PICKER
export enum PERIOD_PICKER_VALUE {
  HOUR = "1H",
  DAY = "24H",
  WEEK = "7D",
  MONTH = "30D",
  QUARTER = "90D",
  YEAR = "1Y",
}

export const PERIOD_PICKER_OPTIONS = [
  { label: "1H", value: PERIOD_PICKER_VALUE.HOUR },
  { label: "24H", value: PERIOD_PICKER_VALUE.DAY },
  { label: "7D", value: PERIOD_PICKER_VALUE.WEEK },
  { label: "30D", value: PERIOD_PICKER_VALUE.MONTH },
  { label: "90D", value: PERIOD_PICKER_VALUE.QUARTER },
  { label: "1Y", value: PERIOD_PICKER_VALUE.YEAR },
];
