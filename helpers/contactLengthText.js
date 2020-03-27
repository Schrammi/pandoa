export default function contactLengthText(time, kind) {
  const minutes = Math.round(time / 1000 / 60);
  
  let text;
  if (kind === "short") {
    text = time === 0 ? `short contact` : `${minutes} min`;
  } else {
    text = time === 0 ? `Contact for a short time` : `Contact for ${minutes} min`;
  }
  
  return text;
};
