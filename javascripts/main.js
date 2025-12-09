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

  // Скрытие всех панелей AR.js и A-Frame
  const hidePanels = () => {
    const selectors = [
      ".a-enter-vr-button",
      ".a-orientation-modal",
      ".arjs-debug",
      ".arjs-debugUI",
      ".arjs-video-container",
      ".a-enter-ar-button",
      "[class*='arjs']",
      "[class*='debug']",
      "[class*='panel']"
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el && el.style) {
          el.style.display = "none";
          el.style.visibility = "hidden";
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
        }
      });
    });
  };

  // Скрываем панели сразу и после загрузки сцены
  hidePanels();
  
  const scene = document.getElementById("ar-scene");
  if (scene) {
    scene.addEventListener("loaded", () => {
      setTimeout(hidePanels, 100);
    });
  }

  // Периодически проверяем и скрываем панели (на случай, если они появляются позже)
  setInterval(hidePanels, 500);
});