import { Text, View } from "react-native";
import BookmarkButton from "./BookmarkButton";
import { COLOR } from "../helpers/color";
import AlarmButton from "./AlarmButton";
import NextBusInfo from "./NextBusInfo";

const BusInfo = ({ isBookmarked, onPressBookmark, numColor, num, directionDescription, processedNextBusInfo }) => {
  return (
    <View style={{ flexDirection: "row", height: 75, backgroundColor: "#FFF" }}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <BookmarkButton size={20} isBookmarked={isBookmarked} onPress={onPressBookmark} style={{ paddingHorizontal: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
          <Text style={{ fontSize: 13, color: COLOR.GRAY_3 }}>{directionDescription} 방향</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          {processedNextBusInfo.map((info, index) => (
            <NextBusInfo
              key={`Next-${index}`}
              hasInfo={info.hasInfo}
              remainedTimeText={info.remainedTimeText}
              numOfRemainedStops={info.numOfRemainedStops}
              seatStatusText={info.seatStatusText}
            />
          ))}
        </View>
        <AlarmButton onPress={() => {}} style={{ paddingHorizontal: 15 }} />
      </View>
    </View>
  );
};

export default BusInfo;
