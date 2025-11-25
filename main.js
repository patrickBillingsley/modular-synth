import Keyboard from "./components/keyboard.js";
import Knob, { KnobType } from "./components/knob.js";
import AudioService from "./services/audio_service.js";

window.addEventListener("mousedown", new AudioService().initialize, { once: true });

new Keyboard({
  controls: [
    Knob.continuous({
      label: "Volume",
      onChange: new AudioService().setVolume,
    }),
    Knob.rotary({
      label: "Waveform",
      onChange: new AudioService().setWaveform,
      options: Waveform.values,
    }),
  ],
});
