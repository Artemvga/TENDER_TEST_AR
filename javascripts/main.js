// Простая обработка маркера - показываем/скрываем флаг
// Дожидаемся загрузки DOM, иначе элементы не найдутся (скрипт подключён в <head>).
window.addEventListener("DOMContentLoaded", () => {
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
});