import _ from "lodash";
import { View } from "react-native";
import { styles as s } from "react-native-style-tachyons";
import useSWR from "swr";

import GenericError from "../commons/GenericError";
import GenericLoader from "../commons/GenericLoader";
import { fetcher, makeQueryString } from "../utilities";
import { API_BASE_URL, API_KEY } from "../constants";
import { useMemo } from "react";

export default function Watchlist() {
  const { data, error } = useSWR(
    `${API_BASE_URL}/data/v2/histoday?${makeQueryString({
      fsym: "BTC",
      tsym: "USD",
    })}`,
    fetcher
  );

  return (
    <View style={[s.flx_i, s.bg_background, { overflow: "hidden" }]}>
      {error && <GenericError errorMessage={error.message} />}

      {!error && !data && <GenericLoader />}
    </View>
  );
}
