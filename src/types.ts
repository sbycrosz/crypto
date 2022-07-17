export type HistoricalAPIResponse = {
  Data: {
    Data: HistoricalData;
  };
};

export type HistoricalData = {
  time: number;
  high: number;
  low: number;
  open: number;
  close: number;
}[];
