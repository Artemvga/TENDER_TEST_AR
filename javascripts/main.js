// Простая обработка маркера - показываем/скрываем флаг
const marker = document.getElementById("marker-flag");
const flag = document.getElementById("flag-sprite");

if (marker && flag) {
  marker.addEventListener("markerFound", () => {
    flag.setAttribute("visible", true);
  });
  marker.addEventListener("markerLost", () => {
    flag.setAttribute("visible", false);
  });
}
