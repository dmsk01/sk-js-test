const isRunInBrowser = typeof window != "undefined";

function isElement(obj) {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    return (
      typeof obj === "object" &&
      obj.nodeType === 1 &&
      typeof obj.style === "object" &&
      typeof obj.ownerDocument === "object"
    );
  }
}

const applyFilter = (dataArray) => {
  if (!isRunInBrowser)
    throw new Error("Incompatible environment - can't find window object");
  const resetFilterTags = ["#all", ""];
  if (!dataArray.length) {
    return [];
  }
  const tag = location.hash;
  return dataArray.filter((card) =>
    resetFilterTags.includes(tag) ? card : card.tags.includes(tag)
  );
};

export { applyFilter, isElement };
