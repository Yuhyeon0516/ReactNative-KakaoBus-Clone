import { useState } from "react";

export const useBookmark = (initailBookmarked) => {
  const [isBookmarked, setIsBookmarked] = useState(initailBookmarked);
  const toggleIsBookmarked = () => setIsBookmarked(!isBookmarked);

  return {
    isBookmarked,
    toggleIsBookmarked,
  };
};
