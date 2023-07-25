import { Text, View } from "react-native";
import BookmarkButton from "./BookmarkButton";
import { COLOR } from "../helper/color";
import AlarmButton from "./AlarmButton";
import NextBusInfo from "./NextBusInfo";

const BusInfo = ({ isBookmarked, onPressBookmark, numColor, num, directionDescription }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <BookmarkButton isBookmarked={isBookmarked} onPress={onPressBookmark} style={{ paddingHorizontal: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
          <Text style={{ fontSize: 13, color: COLOR.GRAY_3 }}>{directionDescription} 방향</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <NextBusInfo hasInfo={true} remainedTimeText={"8분 0초"} numOfRemainedStops={5} seatStatusText={"여유"} />
          <NextBusInfo hasInfo={false} />
        </View>
        <AlarmButton onPress={() => {}} style={{ paddingHorizontal: 15 }} />
      </View>
    </View>
  );
};

export default BusInfo;
