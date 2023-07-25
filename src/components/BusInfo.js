import { Text, View } from "react-native";
import BookmarkButton from "./BookmarkButton";
import AlarmButton from "./AlarmButton";
import NextBusInfo from "./NextBusInfo";

const BusInfo = ({ NEWCOLOR, isBookmarked, onPressBookmark, numColor, num, directionDescription, processedNextBusInfo }) => {
  return (
    <View style={{ flexDirection: "row", height: 75, backgroundColor: NEWCOLOR.WHITE_BLACK }}>
      <View style={{ flex: 0.85, flexDirection: "row", alignItems: "center" }}>
        <BookmarkButton NEWCOLOR={NEWCOLOR} size={20} isBookmarkedProp={isBookmarked} onPress={onPressBookmark} style={{ paddingHorizontal: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
          <Text style={{ fontSize: 13, color: NEWCOLOR.GRAY_3_GRAY_2, marginRight: 5 }}>{directionDescription} 방향</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          {processedNextBusInfo.map((info, index) => (
            <NextBusInfo
              NEWCOLOR={NEWCOLOR}
              key={`Next-${index}`}
              hasInfo={info.hasInfo}
              remainedTimeText={info.remainedTimeText}
              numOfRemainedStops={info.numOfRemainedStops}
              seatStatusText={info.seatStatusText}
            />
          ))}
        </View>
        <AlarmButton NEWCOLOR={NEWCOLOR} onPress={() => {}} style={{ paddingHorizontal: 15 }} />
      </View>
    </View>
  );
};

export default BusInfo;
