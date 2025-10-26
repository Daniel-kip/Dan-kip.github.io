const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => handleInput(button.textContent));
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ((key >= "0" && key <= "9") || ["+", "-", "*", "/", "%", "."].includes(key)) {
    handleInput(key);
  } 
  else if (key === "Enter" || key === "=") {
    calculateResult();
  } 
  else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } 
  else if (key === "Escape") {
    display.value = "";
  }
});

function handleInput(value) {
  if (value === "C") {
    display.value = "";
    return;
  }

  if (value === "=") {
    calculateResult();
    return;
  }

  if (value === "sqrt") {
    try {
      display.value = Math.sqrt(parseFloat(display.value));
    } catch {
      display.value = "Error";
    }
    return;
  }

  if (value === "E") {
    display.value += "**";
    return;
  }

  const current = display.value;
  const lastChar = current[current.length - 1];

  if (
    (current === "0" && value >= "0" && value <= "9") ||
    (/[\+\-\*\/%]0$/.test(current) && value >= "0" && value <= "9")
  ) {
    if (value !== ".") {
      display.value = current.slice(0, -1) + value;
      return;
    }
  }

  if (value === "." && lastChar === ".") return;

  if (["+", "-", "*", "/", "%"].includes(value) && ["+", "-", "*", "/", "%", "."].includes(lastChar)) {
    display.value = current.slice(0, -1) + value;
    return;
  }

  display.value += value;
}

function calculateResult() {
  try {
    if (display.value.includes("//")) {
      const parts = display.value.split("//");
      if (parts.length === 2) {
        const result = Math.floor(eval(parts[0]) / eval(parts[1]));
        display.value = result;
        return;
      }
    }
    display.value = Function('"use strict";return (' + display.value + ')')();
  } catch {
    display.value = "Error";
  }
}
