import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "../helpers/color";
import { useBookmark } from "../hooks/useBookmark";

const BookmarkButton = ({ NEWCOLOR, size, isBookmarkedProp, onPress, style }) => {
  const { isBookmarked, toggleIsBookmarked } = useBookmark(isBookmarkedProp);

  return (
    <TouchableOpacity
      onPress={() => {
        toggleIsBookmarked();
        onPress();
      }}
      style={style}
    >
      <Ionicons name="star" size={size} color={isBookmarked ? COLOR.YELLOW : NEWCOLOR.GRAY_1_GRAY_4} />
    </TouchableOpacity>
  );
};

export default BookmarkButton;
