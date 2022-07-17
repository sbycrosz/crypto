import { ScrollView } from "react-native";
import { styles as s } from "react-native-style-tachyons";

import CoinInfo from "./CoinInfo";

export default function App() {
  // Displays latest market data of BTC/USD and ETH/USD
  // Display currency should be a part of user settings!
  // e.g. SG users would use SGD display curency; US users would use USD display curency; and so on
  return (
    <ScrollView style={[s.flx_i]} contentContainerStyle={[s.pv5]}>
      <CoinInfo symbol="BTC" displayName="Bitcoin" displayCurrency="USD" />
      <CoinInfo symbol="ETH" displayName="Etherium" displayCurrency="USD" />
    </ScrollView>
  );
}
