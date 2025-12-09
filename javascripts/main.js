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
      ".a-loader",
      ".a-loader-title",
      ".a-loader-spinner",
      ".a-splash-screen",
      ".a-splash",
      "[class*='arjs']",
      "[class*='debug']",
      "[class*='panel']",
      "[class*='loader']",
      "[class*='splash']",
      "[id*='arjs']",
      "[id*='debug']",
      "[id*='video']",
      "[id*='panel']"
    ];

    selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el && el.style) {
            el.style.display = "none";
            el.style.visibility = "hidden";
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
            el.style.position = "absolute";
            el.style.top = "-9999px";
            el.style.left = "-9999px";
            el.style.width = "0";
            el.style.height = "0";
            el.style.overflow = "hidden";
          }
        });
      } catch (e) {
        // Игнорируем ошибки селекторов
      }
    });

    // Скрываем все элементы с определенными классами или ID
    document.querySelectorAll("*").forEach(el => {
      const className = el.className || "";
      const id = el.id || "";
      if (
        (typeof className === "string" && (
          className.includes("arjs") ||
          className.includes("debug") ||
          className.includes("panel") ||
          className.includes("loader") ||
          className.includes("splash")
        )) ||
        (typeof id === "string" && (
          id.includes("arjs") ||
          id.includes("debug") ||
          id.includes("video") ||
          id.includes("panel")
        ))
      ) {
        if (el.tagName !== "A-SCENE" && el.tagName !== "A-MARKER" && el.tagName !== "A-IMAGE" && el.tagName !== "A-ASSETS" && !el.classList.contains("back-button")) {
          el.style.display = "none";
          el.style.visibility = "hidden";
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
        }
      }
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