import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "../helper/color";

const BookmarkButton = ({ isBookmarked, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Ionicons name="star" size={24} color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1} />
    </TouchableOpacity>
  );
};

export default BookmarkButton;
