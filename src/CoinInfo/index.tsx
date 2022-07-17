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
    // Cryptocompare API is kind of a pain to use
    const [api, limit] = (() => {
      switch (displayPeriod) {
        case PERIOD_PICKER_VALUE.HOUR:
          return ["histominute", 60];

        case PERIOD_PICKER_VALUE.DAY:
          return ["histohour", 24];

        case PERIOD_PICKER_VALUE.WEEK:
          return ["histoday", 7];

        case PERIOD_PICKER_VALUE.MONTH:
          return ["histoday", 30];

        case PERIOD_PICKER_VALUE.QUARTER:
          return ["histoday", 90];

        case PERIOD_PICKER_VALUE.YEAR:
          return ["histoday", 365];
      }
    })();

    return `${API_BASE_URL}/data/v2/${api}?${makeQueryString({
      limit,
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
