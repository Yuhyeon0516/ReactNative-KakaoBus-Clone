import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "../helpers/color";

const BookmarkButton = ({ size, isBookmarked, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Ionicons name="star" size={size} color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1} />
    </TouchableOpacity>
  );
};

export default BookmarkButton;
