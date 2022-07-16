import { Text, View } from "react-native";
import { styles as s } from "react-native-style-tachyons";

type Props = {
  errorMessage: string;
};

export default function GenericError(props: Props) {
  return (
    <View style={[s.flx_i, s.jcc]}>
      <Text style={[s.tc, s.f3, s.textPrimary, s.b]}>{"Oh no! (´･_･`)"}</Text>
      <Text style={[s.tc, s.f5, s.textSecondary, s.mt3]}>
        {props.errorMessage}
      </Text>
    </View>
  );
}
