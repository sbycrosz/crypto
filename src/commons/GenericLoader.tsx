import { ActivityIndicator, View } from "react-native";
import { styles as s } from "react-native-style-tachyons";

export default function GenericLoader() {
  return (
    <View style={[s.flx_i, s.jcc, s.aic]}>
      <ActivityIndicator accessibilityHint="loading" />
    </View>
  );
}
