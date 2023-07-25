import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Platform, RefreshControl, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

import BusInfo from "./src/components/BusInfo";
import { busStop, getBusNumColorByType, getRemainedTimeText, getSeatStatusText, getSections } from "./src/helpers/data";
import { COLOR } from "./src/helpers/color";
import Margin from "./src/components/Margin";
import BookmarkButton from "./src/components/BookmarkButton";

export default function App() {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false);

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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newNow = dayjs();
  //     setNow(newNow);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const ListHeaderButton = ({ iconName }) => (
    <TouchableOpacity style={{ padding: 10 }}>
      <SimpleLineIcons name={iconName} size={20} color={COLOR.WHITE} />
    </TouchableOpacity>
  );

  const ListHeaderComponent = () => (
    <View style={{ backgroundColor: COLOR.GRAY_3, height: 170, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: COLOR.WHITE, fontSize: 13 }}>{busStop.id}</Text>
      <Margin height={4} />
      <Text style={{ color: COLOR.WHITE, fontSize: 20 }}>{busStop.name}</Text>
      <Margin height={4} />
      <Text style={{ color: COLOR.GRAY_1, fontSize: 14 }}>{busStop.directionDescription}</Text>
      <Margin height={20} />
      <BookmarkButton
        size={25}
        isBookmarked={busStop.isBookmarked}
        onPress={onPressBusStopBookmark}
        style={{ borderWidth: 0.3, borderColor: COLOR.GRAY_1, borderRadius: 35 / 2, padding: 5 }}
      />
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View
      style={{
        paddingLeft: 13,
        paddingVertical: 3,
        backgroundColor: COLOR.GRAY_1,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: COLOR.GRAY_2,
        borderBottomColor: COLOR.GRAY_2,
      }}
    >
      <Text style={{ color: COLOR.GRAY_4, fontSize: 12 }}>{title}</Text>
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
        isBookmarked={bus.isBookmarked}
        onPressBookmark={() => {}}
        numColor={numColor}
        num={bus.num}
        directionDescription={bus.directionDescription}
        processedNextBusInfo={processedNextBusInfos}
      />
    );
  };

  const ItemSeparatorComponent = () => <View style={{ width: "100%", height: 1, backgroundColor: COLOR.GRAY_1 }} />;
  const ListFooterComponent = () => <Margin height={15} />;

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={{ backgroundColor: COLOR.GRAY_3, width: "100%" }}>
          <SafeAreaView style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <ListHeaderButton iconName={"arrow-left"} />
            <ListHeaderButton iconName={"home"} />
          </SafeAreaView>
          <View style={{ position: "absolute", width: "100%", height: 500, backgroundColor: COLOR.GRAY_3, zIndex: -1 }} />
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
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
