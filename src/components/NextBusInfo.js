import { View, Text } from "react-native";
import { COLOR } from "../helpers/color";

const NextBusInfo = ({ NEWCOLOR, remainedTimeText, hasInfo, numOfRemainedStops, seatStatusText }) => {
  if (!hasInfo) return <Text style={{ color: NEWCOLOR.GRAY_2_GRAY_3 }}>도착 정보 없음</Text>;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ color: NEWCOLOR.BLACK_WHITE, marginRight: 10 }}>{remainedTimeText}</Text>
      <View style={{ borderWidth: 0.5, borderColor: NEWCOLOR.GRAY_1_GRAY_4, borderRadius: 3, flexDirection: "row", alignItems: "center", padding: 2 }}>
        <Text style={{ color: NEWCOLOR.GRAY_3_GRAY_2, marginRight: 3 }}>{numOfRemainedStops}번째전</Text>
        <Text style={{ color: COLOR.CORAL }}>{seatStatusText}</Text>
      </View>
    </View>
  );
};

export default NextBusInfo;
