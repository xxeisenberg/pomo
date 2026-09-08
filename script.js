let minutes = 25;
let seconds = 0;
let pomo;
let running = false;
let mode = "pomodoro";
let hideTimer;

// Local Storage
let font = localStorage.getItem("font");
let pomodoroTime = localStorage.getItem("pomodoroTime");
let breakTime = localStorage.getItem("breakTime");

try {
  document.getElementById("back").addEventListener("click", () => {
    console.log("back");
    window.location.href = "index.html";
  });

  if (font) {
    document.getElementById("font-select").value = font;
  } else {
    localStorage.setItem("font", "arial");
    document.getElementById("font-select").value = "arial";
  }

  if (pomodoroTime) {
    document.getElementById("pomodoro-time").value = pomodoroTime;
  } else {
    localStorage.setItem("pomodoroTime", "25");
    document.getElementById("pomodoro-time").value = "25";
  }

  if (breakTime) {
    document.getElementById("break-time").value = breakTime;
  } else {
    localStorage.setItem("breakTime", "5");
    document.getElementById("break-time").value = "5";
  }

  document.getElementById("font-select").addEventListener("change", (e) => {
    const font = e.target.value;
    localStorage.setItem("font", font);
    document.getElementById("timer").style.fontFamily = font;
  });

  document.getElementById("pomodoro-time").addEventListener("change", (e) => {
    const pomodoroTime = e.target.value;
    localStorage.setItem("pomodoroTime", pomodoroTime);
    minutes = pomodoroTime;
  });

  document.getElementById("break-time").addEventListener("change", (e) => {
    const breakTime = e.target.value;
    localStorage.setItem("breakTime", breakTime);
  });
} catch (error) {
  //nothing to worry about
}

try {
  document.getElementById("mode").textContent = mode;

  const elements = document.querySelectorAll(".hide");

  const showElements = () => {
    elements.forEach((el) => {
      el.classList.remove("is-hidden");
    });
  };

  const hideElements = () => {
    if (running === true) {
      elements.forEach((el) => {
        el.classList.add("is-hidden");
      });
    }
  };

  const resetHideTimer = () => {
    showElements();
    clearTimeout(hideTimer);

    if (running === true) {
      hideTimer = setTimeout(hideElements, 10000);
    }
  };

  ["mousemove", "mousedown", "keydown", "touchstart", "scroll"].forEach(
    (event) => {
      document.addEventListener(event, resetHideTimer, { passive: true });
    },
  );

  if (font) {
    document.getElementById("timer").style.fontFamily = font;
  }

  if (pomodoroTime) {
    minutes = pomodoroTime;
  }

  document.getElementById("timer").textContent =
    `${minutes}:${seconds.toString().padStart(2, "0")}`;

  document.getElementById("settings").addEventListener("click", () => {
    window.location.href = "settings.html";
  });

  document.getElementById("reset").addEventListener("click", () => {
    clearInterval(pomo);
    clearTimeout(hideTimer);
    running = false;

    if (mode == "pomodoro") {
      minutes = pomodoroTime;
    } else {
      minutes = breakTime;
    }

    seconds = 0;

    showElements();

    document.getElementById("timer").textContent =
      `${minutes}:${seconds.toString().padStart(2, "0")}`;
  });

  document.getElementById("start").addEventListener("click", () => {
    if (running === true) {
      return;
    } else {
      mode = "pomodoro";

      pomo = setInterval(() => {
        if (seconds > 0) {
          seconds--;
        } else if (seconds == 0 && minutes == 0 && mode == "pomodoro") {
          breakTime = localStorage.getItem("breakTime");
          minutes = breakTime;
          seconds = 0;
          mode = "break";
          document.getElementById("mode").textContent = mode;
        } else if (seconds == 0 && minutes == 0 && mode == "break") {
          pomodoroTime = localStorage.getItem("pomodoroTime");
          minutes = pomodoroTime;
          seconds = 0;
          mode = "pomodoro";
          document.getElementById("mode").textContent = mode;
        } else {
          minutes--;
          seconds = 59;
        }

        document.getElementById("timer").textContent =
          `${minutes}:${seconds.toString().padStart(2, "0")}`;
      }, 1000);

      running = true;
      resetHideTimer();
    }
  });

  document.getElementById("pause").addEventListener("click", () => {
    clearInterval(pomo);
    clearTimeout(hideTimer);
    running = false;
    showElements();
  });
} catch (error) {
  // shhh
}
