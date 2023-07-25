import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import BusInfo from "./src/components/BusInfo";
import { COLOR } from "./src/helper/color";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <BusInfo isBookmarked={true} onPressBookmark={() => {}} numColor={COLOR.BUS_B} num={146} directionDescription="강남역.강남역사거리" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
