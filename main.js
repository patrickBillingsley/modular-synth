import Key from "./components/key.js";
import Oscillator from "./components/oscillator.js";

let context;
let osc;

const keys = [];
for (let i = 0; i <= 12; i++) {
  keys.push(new Key({ semitones: i }));
}

document.querySelector("#app").innerHTML = `
  <div id="keyboard">
    <div id="keybed">
      ${keys.map(k => k.component).join("")}
    </div>
  </div>
`

const keybed = document.getElementById("keybed");
keybed.addEventListener("mousedown", initialize);

function initialize() {
  keybed.addEventListener("mouseleave", () => osc.stop());

  context ||= new AudioContext();
  osc ||= new Oscillator(context);
  const keyElements = document.getElementsByClassName("key");
  for (let i = 0; i <= keys.length; i++) {
    const key = keys[i];
    const keyElement = keyElements[i];
    keyElement.addEventListener("mouseover", () => osc.play(key));
  }
  keybed.removeEventListener("mousedown", initialize);
}
