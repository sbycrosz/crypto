import _ from "lodash";
import moment from "moment";
import React, { useMemo } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { styles as s, sizes } from "react-native-style-tachyons";
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
} from "victory-native";

import {
  PERIOD_PICKER_OPTIONS,
  PERIOD_PICKER_VALUE,
  COLORS,
} from "../constants";
import { HistoricalData } from "../types";
import {
  formatCurrency,
  formatCurrencyShort,
  formatPercentage,
} from "../utilities";

import PeriodPicker from "./PeriodPicker";

type Props = {
  historicalData: HistoricalData;
  displayName: string;
  displayCurrency: string;
  displayPeriod: PERIOD_PICKER_VALUE;
  setDisplayPeriod: (newValue: PERIOD_PICKER_VALUE) => void;
};

function parseChartData(historicalData: HistoricalData) {
  return _.map(historicalData, ({ time, open, close, low, high }) => ({
    x: new Date(time * 1000),
    open,
    close,
    low,
    high,
  }));
}

export default function CoinInfoContent(props: Props) {
  const { width } = useWindowDimensions();

  const {
    historicalData,
    displayName,
    displayCurrency,
    displayPeriod,
    setDisplayPeriod,
  } = props;

  const chartData = useMemo(
    () => parseChartData(historicalData),
    [historicalData]
  );

  const lastClosingPrice = useMemo(
    // Assumes last closing price is included in historicalData
    // Which is probably wrong since cryptocompare does some aggregations
    () => _.last(historicalData)?.close,
    [historicalData]
  );

  const percentChange = useMemo(
    // Approximate value of change % within time period
    // Doing this since cryptocompare API only returns CHANGEPCT24HOUR, CHANGEPCTDAY, CHANGEPCTHOUR
    // Preferrably move this calculation to server instead since JavaScript floating point operation is not great
    () => {
      const lastClose = _.last(historicalData)?.close;
      const firstClose = _.first(historicalData)?.close;

      if (!lastClose || !firstClose) return null;

      return (lastClose - firstClose) / firstClose;
    },
    [historicalData]
  );

  return (
    <View>
      <View style={[s.ph3, s.flx_row, s.aife, s.jcsb]}>
        <View style={[]}>
          <Text style={[s.f5, s.textSecondary]}>{displayName}</Text>
          <Text style={[s.f3, s.b, s.textPrimary]}>
            {formatCurrency(lastClosingPrice, displayCurrency)}
          </Text>
        </View>

        {_.isNumber(percentChange) && (
          <View
            style={[
              s.pa2,
              s.br2,
              percentChange < 0 ? s.bg_negative : s.bg_positive,
            ]}
          >
            <Text style={[s.f5, s.white, s.b]}>
              {formatPercentage(percentChange)}
            </Text>
          </View>
        )}
      </View>

      <PeriodPicker
        options={PERIOD_PICKER_OPTIONS}
        value={displayPeriod}
        onChange={setDisplayPeriod}
      />

      <VictoryChart
        padding={{
          top: sizes.mt4,
          left: sizes.mt3,
          right: sizes.mt3,
          bottom: sizes.mt4,
        }}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          style={{
            axis: { strokeWidth: 0 },
            ticks: { strokeWidth: 0 },
          }}
          tickCount={3}
          tickFormat={(t) => {
            switch (displayPeriod) {
              case PERIOD_PICKER_VALUE.HOUR:
              case PERIOD_PICKER_VALUE.DAY:
                return moment(t).format("HH:mm A");

              case PERIOD_PICKER_VALUE.WEEK:
              case PERIOD_PICKER_VALUE.MONTH:
              case PERIOD_PICKER_VALUE.QUARTER:
                return moment(t).format("MMM D");

              case PERIOD_PICKER_VALUE.YEAR:
                return moment(t).format("MMM YYYY");
            }
          }}
        />
        <VictoryAxis
          style={{
            axis: { strokeWidth: 0 },
            ticks: { strokeWidth: 0 },
          }}
          tickCount={2}
          tickFormat={(tickValue) =>
            formatCurrencyShort(tickValue, displayCurrency)
          }
          dependentAxis
          orientation="left"
          offsetX={width}
        />

        <VictoryCandlestick
          candleColors={{
            positive: COLORS.positive,
            negative: COLORS.negative,
          }}
          data={chartData}
          style={{
            data: {
              strokeWidth: 1,
              stroke: COLORS.borderPrimary,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
}
