export const download = (
  filename: string,
  text: string,
  mimeType = "text/plain",
  encoding = "utf-8"
): void => {
  const element = document.createElement("a");
  const data = encodeURIComponent(text);
  element.setAttribute("href", `data:${mimeType};charset=${encoding},${data}`);
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
