//  TIMER and GENERAL anamation   //
document.addEventListener("DOMContentLoaded", function () {
  // Получаем все элементы с классом "slots__timer"
  var timerElements = document.querySelectorAll(".slots__timer");

  // Преобразуем NodeList в массив для удобства работы
  var timersArray = Array.from(timerElements);

  // Проходим по каждому элементу
  timersArray.forEach(function (timerElement) {
    // Получаем значение таймера из текстового контента элемента
    var timerValue = timerElement.textContent;

    // Преобразуем строку таймера в формате "чч:мм:сс" в массив, разделяя по ":"
    var timerArray = timerValue.split(":");

    // Извлекаем часы, минуты и секунды из массива
    var hours = parseInt(timerArray[0]);
    var minutes = parseInt(timerArray[1]);
    var seconds = parseInt(timerArray[2]);

    // Запускаем обратный таймер
    var countdown = setInterval(function () {
      // Уменьшаем секунды на 1
      seconds--;

      // Если секунды достигли 0 и минуты также 0, но часы больше 0, то уменьшаем часы на 1 и сбрасываем секунды и минуты
      if (seconds < 0 && minutes === 0 && hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      }

      // Если секунды достигли 0, но минуты больше 0, то уменьшаем минуты на 1 и сбрасываем секунды
      if (seconds < 0 && minutes > 0) {
        minutes--;
        seconds = 59;
      }

      // Форматируем значения, чтобы добавить ведущий 0, если они меньше 10
      var formattedHours = hours < 10 ? "0" + hours : hours;
      var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

      // Обновляем текстовый контент элемента с обратным таймером
      timerElement.textContent =
        formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;

      // Если время закончилось, останавливаем обратный таймер
      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(countdown);
        var closestSlotsItem = timerElement.closest(".slots__item");
        if (closestSlotsItem) {
          closestSlotsItem.classList.add("slots__item--winner");

          // Добавляем класс "винер" к родителю элемента .slots__item--winner
          var winnerParent = closestSlotsItem.parentElement;
          if (winnerParent) {
            winnerParent.classList.add("slots__list--winner");
          }

          var slotsBg = closestSlotsItem.querySelector(".slots__bg img");
          if (slotsBg) {
            slotsBg.src = "assets/images/slot-down.png";
          }
        }
        var overlayWinner = document.getElementById("overlayWinner");
        setTimeout(function () {
          overlayWinner.showModal();
          startRainfall();
        }, 2000); // 3000 миллисекунд = 3 секунды

        setTimeout(function () {
          overlayWinner.classList.add("transparent");
        }, 5000); // 3000 миллисекунд = 3 секунды

        setTimeout(function () {
          overlayWinner.close();
          var podium = document.getElementById("podium");
          podium.style.top = "0";
        }, 8000);

        setTimeout(function () {
          podium.style.setProperty("--before-left", "-100%");
          podium.style.setProperty("--after-right", "-100%");
        }, 10000);
      }
    }, 1000); // Обновляем каждую секунду
  });
});
//

//Lottie COIN animation//
// Запускаем анимацию в каждом элементе slots__coin-item
document.addEventListener("DOMContentLoaded", function () {
  var coinItems = document.querySelectorAll(".slots__coin-item");
  coinItems.forEach(function (coinItem) {
    var animation = bodymovin.loadAnimation({
      container: coinItem,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "assets/json/coin-animation.json",
    });
  });
});
//

//  RAINDROP  //
// Функция для создания копии изображения дождя
function createRaindrop() {
  // Выбираем случайное изображение дождя
  var raindropImages = document.querySelectorAll(".raindrop");
  var randomIndex = Math.floor(Math.random() * raindropImages.length);
  var randomRaindrop = raindropImages[randomIndex].cloneNode();

  // Рандомно выбираем начальную позицию капли
  var randomPosition = Math.random() * 100;
  randomRaindrop.style.left = randomPosition + "vw"; // Используем vw для позиционирования по горизонтали

  // Добавляем копию изображения в контейнер
  document.getElementById("rain-container").appendChild(randomRaindrop);

  // Анимация падения
  randomRaindrop.animate(
    [
      { top: "-100px" }, // Начальная позиция (за пределами контейнера)
      { top: "100%" }, // Конечная позиция (ниже контейнера)
    ],
    {
      duration: 1500, // Продолжительность анимации
      iterations: 1, // Один раз
    }
  ).onfinish = function () {
    randomRaindrop.remove();
  };
}

// Функция, которая будет вызываться при событии (например, клике)
function startRainfall() {
  // Запускаем функцию создания капель с интервалом
  var intervalId = setInterval(createRaindrop, 50); // Измените интервал, если нужно

  // Прерываем создание капель и останавливаем анимацию после 3 секунд
  setTimeout(function () {
    clearInterval(intervalId); // Останавливаем интервал
  }, 3000); // 3000 миллисекунд = 3 секунды
}
//
