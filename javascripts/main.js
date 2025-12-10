// Простая обработка маркера - показываем/скрываем флаг
// Дожидаемся загрузки DOM и сцены
window.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  if (!scene) return;

  const panel = document.getElementById("info-panel");
  const closeBtn = document.getElementById("info-close");
  const marker = document.getElementById("marker-flag");
  const flag = document.getElementById("flag-sprite");

  const hidePanel = () => {
    if (panel) panel.classList.add("hidden");
  };

  const showPanel = () => {
    if (panel) panel.classList.remove("hidden");
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", hidePanel);
  }

  scene.addEventListener("loaded", () => {
    if (!marker || !flag) return;

    marker.addEventListener("markerFound", () => {
      flag.setAttribute("visible", true);
    });

    marker.addEventListener("markerLost", () => {
      flag.setAttribute("visible", false);
      hidePanel();
    });

    flag.addEventListener("click", () => {
      // Показываем панель при клике по флагу
      showPanel();
    });
  });
});
