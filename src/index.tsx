import { ScrollView } from "react-native";
import { styles as s } from "react-native-style-tachyons";

import CoinInfo from "./CoinInfo";

export default function App() {
  // Displays latest market data of BTC, ETH, and BNB against uses's displayCurrency

  // Display currency which could be a part of user settings
  // e.g. SG users would use SGD display curency; US users would use USD display curency; and so on
  const displayCurrency = "USD";

  return (
    <ScrollView style={[s.flx_i]} contentContainerStyle={[s.pv5]}>
      <CoinInfo
        symbol="BTC"
        displayName="Bitcoin"
        displayCurrency={displayCurrency}
      />
      <CoinInfo
        symbol="ETH"
        displayName="Etherium"
        displayCurrency={displayCurrency}
      />
      <CoinInfo
        symbol="BNB"
        displayName="BNB"
        displayCurrency={displayCurrency}
      />
    </ScrollView>
  );
}
