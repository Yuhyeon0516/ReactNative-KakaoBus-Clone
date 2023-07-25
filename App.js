import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Platform, RefreshControl, SectionList, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

import BusInfo from "./src/components/BusInfo";
import { busStop, getBusNumColorByType, getRemainedTimeText, getSeatStatusText, getSections } from "./src/helpers/data";
import { COLOR } from "./src/helpers/color";
import Margin from "./src/components/Margin";
import BookmarkButton from "./src/components/BookmarkButton";
import { useTheme } from "./src/hooks/useTheme";

export default function App() {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false);

  const { NEWCOLOR, isDark, toggleIsDark } = useTheme();

  const onPressBusStopBookmark = () => {};

  const onRefresh = () => {
    setRefreshing(true);
  };

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
      setNow(dayjs());
    }
  }, [refreshing]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = dayjs();
      setNow(newNow);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const ListHeaderButton = ({ iconName }) => (
    <TouchableOpacity style={{ padding: 10 }}>
      <SimpleLineIcons name={iconName} size={20} color={NEWCOLOR.WHITE_BLACK} />
    </TouchableOpacity>
  );

  const ListHeaderComponent = () => (
    <View style={{ backgroundColor: NEWCOLOR.GRAY_3_GRAY_2, height: 170, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 13 }}>{busStop.id}</Text>
      <Margin height={4} />
      <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 20 }}>{busStop.name}</Text>
      <Margin height={4} />
      <Text style={{ color: NEWCOLOR.GRAY_1_GRAY_4, fontSize: 14 }}>{busStop.directionDescription}</Text>
      <Margin height={20} />
      <BookmarkButton
        NEWCOLOR={NEWCOLOR}
        size={25}
        isBookmarkedProp={busStop.isBookmarked}
        onPress={onPressBusStopBookmark}
        style={{ borderWidth: 0.3, borderColor: NEWCOLOR.GRAY_1_GRAY_4, borderRadius: 35 / 2, padding: 5 }}
      />
      <Switch
        value={isDark}
        onValueChange={(v) => {
          toggleIsDark();
        }}
      />
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View
      style={{
        paddingLeft: 13,
        paddingVertical: 3,
        backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
        borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3,
      }}
    >
      <Text style={{ color: NEWCOLOR.GRAY_4_GRAY_1, fontSize: 12 }}>{title}</Text>
    </View>
  );

  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);

    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos = !firstNextBusInfo && !secondNextBusInfo ? [null] : [firstNextBusInfo, secondNextBusInfo];

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });

    return (
      <BusInfo
        NEWCOLOR={NEWCOLOR}
        isBookmarked={bus.isBookmarked}
        onPressBookmark={() => {}}
        numColor={numColor}
        num={bus.num}
        directionDescription={bus.directionDescription}
        processedNextBusInfo={processedNextBusInfos}
      />
    );
  };

  const ItemSeparatorComponent = () => <View style={{ width: "100%", height: 1, backgroundColor: NEWCOLOR.GRAY_1_GRAY_4 }} />;
  const ListFooterComponent = () => <Margin height={15} />;

  return (
    <SafeAreaProvider>
      <View style={{ ...styles.container, backgroundColor: NEWCOLOR.WHITE_BLACK }}>
        <View style={{ backgroundColor: NEWCOLOR.GRAY_3_GRAY_2, width: "100%" }}>
          <SafeAreaView style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <ListHeaderButton iconName={"arrow-left"} />
            <ListHeaderButton iconName={"home"} />
          </SafeAreaView>
          <View style={{ position: "absolute", width: "100%", height: 500, backgroundColor: NEWCOLOR.GRAY_3_GRAY_2, zIndex: -1 }} />
        </View>
        <SectionList
          style={{ flex: 1, width: "100%", top: Platform.OS === "ios" ? -40 : 0 }}
          sections={sections}
          ListHeaderComponent={ListHeaderComponent}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={ListFooterComponent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
