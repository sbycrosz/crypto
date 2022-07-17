import { useState } from "react";
import { View } from "react-native";
import { styles as s } from "react-native-style-tachyons";
import useSWR from "swr";

import GenericError from "../commons/GenericError";
import GenericLoader from "../commons/GenericLoader";
import { fetcher, makeQueryString } from "../utilities";
import { API_BASE_URL, API_KEY, PERIOD_PICKER_VALUE } from "../constants";
import { HistoricalAPIResponse } from "../types";
import CoinInfoContent from "./CoinInfoContent";

type Props = {
  symbol: string;
  displayName: string;
  displayCurrency: string;
};

export default function CoinInfo(props: Props) {
  const { symbol, displayName, displayCurrency } = props;

  const [displayPeriod, setDisplayPeriod] = useState(PERIOD_PICKER_VALUE.HOUR);

  const { data, error } = useSWR<HistoricalAPIResponse>(() => {
    // Cryptocompare API is kind of a pain to use, but here it is :)
    const [api, limit, aggregate] = (() => {
      switch (displayPeriod) {
        case PERIOD_PICKER_VALUE.HOUR:
          // 60 datapoints 1 minute each
          return ["histominute", 60, 1];

        case PERIOD_PICKER_VALUE.DAY:
          // 24 datapoints 1 hour each
          return ["histohour", 48, 30];

        case PERIOD_PICKER_VALUE.WEEK:
          // 14 datapoints 12 hours each
          return ["histohour", 14, 12];

        case PERIOD_PICKER_VALUE.MONTH:
          // 15 datapoints 2 days each
          return ["histoday", 15, 2];

        case PERIOD_PICKER_VALUE.QUARTER:
          // 30 datapoints 3 days each
          return ["histoday", 30, 3];

        case PERIOD_PICKER_VALUE.YEAR:
          // 36 datapoints 10 days each
          return ["histoday", 36, 10];
      }
    })();

    return `${API_BASE_URL}/data/v2/${api}?${makeQueryString({
      limit,
      aggregate,
      fsym: symbol,
      tsym: displayCurrency,
      api_key: API_KEY,
    })}`;
  }, fetcher);

  const historicalData = data?.Data?.Data;

  return (
    <View style={[s.min_h5, s.mb5]}>
      {error && <GenericError errorMessage={error.message} />}

      {!error && !historicalData && <GenericLoader />}

      {!error && historicalData && (
        <CoinInfoContent
          displayName={displayName}
          historicalData={historicalData}
          displayCurrency={displayCurrency}
          displayPeriod={displayPeriod}
          setDisplayPeriod={setDisplayPeriod}
        />
      )}
    </View>
  );
}
