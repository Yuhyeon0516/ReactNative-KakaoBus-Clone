import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AlarmButton = ({ NEWCOLOR, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Ionicons name="alarm-outline" size={24} color={NEWCOLOR.GRAY_3_GRAY_2} />
    </TouchableOpacity>
  );
};

export default AlarmButton;
