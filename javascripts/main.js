// Простая обработка маркера: показываем/скрываем флаг
// Дожидаемся загрузки DOM и A-Frame сцены
window.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  if (!scene) return;

  scene.addEventListener("loaded", () => {
    const marker = document.getElementById("marker-flag");
    const flag = document.getElementById("flag-sprite");
    if (!marker || !flag) return;

    marker.addEventListener("markerFound", () => {
      flag.setAttribute("visible", true);
    });

    marker.addEventListener("markerLost", () => {
      flag.setAttribute("visible", false);
    });
  });
});

