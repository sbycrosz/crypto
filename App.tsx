import { StyleSheet, LogBox } from "react-native";
import NativeTachyons from "react-native-style-tachyons";

import { TACHYONS_CONFIG } from "./src/constants";
import App from "./src/index";

LogBox.ignoreLogs(["Require cycle: node_modules/victory"]);

NativeTachyons.build(TACHYONS_CONFIG, StyleSheet);

export default App;
