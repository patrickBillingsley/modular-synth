import Keyboard from "./components/keyboard.js";
import Waveform from "./models/waveform.js";
import AudioService from "./services/audio_service.js";

window.Waveform = Waveform;


window.addEventListener("mousedown", () => {
  new AudioService().initialize();
}, { once: true });
new Keyboard({
  voices: 3,
  polyphonic: false,
});
