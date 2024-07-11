import { useState } from "react";

type MemberItem = {
  value: string;
  color: string;
};

type PreviewItem = MemberItem;

const usePreviewSelect = () => {
  const [inputValue, setInputValue] = useState("");
  const [previewList, setPreviewList] = useState<PreviewItem[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [isComposing, setIsComposing] = useState(false);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setShowPreview(false);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      if (value.trim() !== "") {
        setPreviewList([
          { value: value, color: "red" },
          { value: value, color: "green" },
          { value: value, color: "blue" },
          { value: value, color: "yellow" },
        ]);
        setShowPreview(true);
      }
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
    if (e.type === "compositionstart") {
      setIsComposing(true);
    } else if (e.type === "compositionend") {
      setIsComposing(false);
    }
  };

  const handlePreviewSelection = (
    item: PreviewItem,
    callback: (item: PreviewItem) => void
  ) => {
    callback(item);
    setInputValue("");
    setShowPreview(false);
  };

  return {
    inputValue,
    setInputValue,
    previewList,
    showPreview,
    isComposing,
    handleInputChange,
    handleComposition,
    handlePreviewSelection,
  };
};

export default usePreviewSelect;
