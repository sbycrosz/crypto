import { StyleSheet } from "react-native";
import NativeTachyons from "react-native-style-tachyons";

import { TACHYONS_CONFIG } from "./src/constants";
import App from "./src/App";

NativeTachyons.build(TACHYONS_CONFIG, StyleSheet);

export default App;
