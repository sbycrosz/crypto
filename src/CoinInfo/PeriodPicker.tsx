import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles as s } from "react-native-style-tachyons";

type Props = {
  options: { value: any; label: string }[];
  value?: any;
  onChange: (newValue: any) => void;
};

export default function PeriodPicker(props: Props) {
  const { options, value, onChange } = props;

  return (
    <View
      style={[
        s.bg_backgroundCard,
        s.mt3,
        s.mh3,
        s.br2,
        s.flx_row,
        s.pv1,
        s.ph2,
        s.asfs,
      ]}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => onChange(option.value)}
          style={[s.ph3, s.pv1, s.br2, value === option.value && s.bg_white]}
        >
          <Text style={[s.f6, s.textSecondary]}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
