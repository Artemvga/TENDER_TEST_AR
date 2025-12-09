// Простая обработка маркера - показываем/скрываем флаг
// Дожидаемся загрузки DOM и A-Frame
window.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  
  if (scene) {
    scene.addEventListener("loaded", () => {
      setTimeout(() => {
        const marker = document.getElementById("marker-flag");
        const flag = document.getElementById("flag-sprite");

        if (marker && flag) {
          console.log("Маркер найден, ожидаем распознавание...");
          console.log("URL маркера:", marker.getAttribute("url"));
          
          // Проверяем загрузку маркера
          marker.addEventListener("loaded", () => {
            console.log("Маркер загружен успешно");
          });
          
          marker.addEventListener("markerFound", () => {
            console.log("Маркер распознан!");
            flag.setAttribute("visible", true);
          });
          
          marker.addEventListener("markerLost", () => {
            console.log("Маркер потерян");
            flag.setAttribute("visible", false);
          });
        } else {
          console.error("Маркер или флаг не найдены:", { marker, flag });
        }
      }, 500);
    });
  }
});
