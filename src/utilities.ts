import _ from "lodash";
import numeral from "numeral";

// API
export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const makeQueryString = (params: Record<string, any>) => {
  return new URLSearchParams(params).toString();
};

// Formatters
const CURRENCY_SYMBOL: Record<string, string> = {
  USD: "US$",
  SGD: "SG$",
  EUR: "€",
  GBP: "£",
  // TODO: Add more currencies :)
};

export const formatCurrency = (
  value: number | null | undefined,
  currency: string
) => {
  if (!_.isNumber(value)) return "";
  const prefix = CURRENCY_SYMBOL[currency] || "";
  return `${prefix}${numeral(value).format("0,0.00")}`;
};

export const formatCurrencyShort = (
  value: number | null | undefined,
  currency: string
) => {
  if (!_.isNumber(value)) return "";
  const prefix = CURRENCY_SYMBOL[currency] || "";
  return `${prefix}${numeral(value).format("0,0")}`;
};

export const formatPercentage = (value: number | null | undefined) => {
  if (!_.isNumber(value)) return "";

  const prefix = value > 0 ? "+" : " ";
  return `${prefix}${numeral(value * 100).format("0,0.00")}%`;
};
