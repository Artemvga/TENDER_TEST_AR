// Обработка маркера и интерактивность флага
window.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  const infoPanel = document.getElementById("info-panel");
  
  if (!scene || !infoPanel) return;

  scene.addEventListener("loaded", () => {
    const marker = document.getElementById("marker-flag");
    const flag = document.getElementById("flag-sprite");

    if (!marker || !flag) return;

    // Показываем/скрываем флаг при обнаружении маркера
    marker.addEventListener("markerFound", () => {
      flag.setAttribute("visible", true);
    });

    marker.addEventListener("markerLost", () => {
      flag.setAttribute("visible", false);
      // Закрываем панель, если маркер потерян
      infoPanel.classList.remove("visible");
    });

    // Обработка клика/тапа на флаг
    // Используем события для мобильных устройств
    let touchStartTime = 0;
    let touchStartPos = { x: 0, y: 0 };

    const handleTouch = (event) => {
      // Проверяем, что флаг видим
      if (!flag.getAttribute("visible")) return;

      const touch = event.touches?.[0] || event.changedTouches?.[0];
      if (!touch) return;

      const currentTime = Date.now();
      const currentPos = { x: touch.clientX, y: touch.clientY };

      if (event.type === "touchstart") {
        touchStartTime = currentTime;
        touchStartPos = currentPos;
      } else if (event.type === "touchend") {
        // Проверяем, что это быстрый тап (не долгое нажатие)
        const timeDiff = currentTime - touchStartTime;
        const posDiff = Math.sqrt(
          Math.pow(currentPos.x - touchStartPos.x, 2) +
          Math.pow(currentPos.y - touchStartPos.y, 2)
        );

        // Тап: короткое время (<300ms) и малое перемещение (<10px)
        if (timeDiff < 300 && posDiff < 10) {
          infoPanel.classList.add("visible");
        }
      }
    };

    // Добавляем обработчики на всю сцену для мобильных
    scene.addEventListener("touchstart", handleTouch, { passive: true });
    scene.addEventListener("touchend", handleTouch, { passive: true });

    // Для десктопа - обработка клика мышью
    scene.addEventListener("click", () => {
      if (flag.getAttribute("visible")) {
        infoPanel.classList.add("visible");
      }
    });
  });
});