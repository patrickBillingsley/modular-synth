import Key from "./components/key.js";
import Oscillator from "./components/oscillator.js";

document.querySelector("#app").innerHTML = `
  <div id="keyboard">
    <div id="keybed"></div>
  </div>
`;

let context;
let osc;

const keys = [];
for (let i = 0; i <= 24; i++) {
  const key = new Key({ semitones: i });
  keys.push(key);
}
const flatKeys = keys.filter((k) => k.isFlat);
for (const key of flatKeys) {
  key.positionSelf();
}

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
