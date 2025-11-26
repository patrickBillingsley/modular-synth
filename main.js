import Keyboard from "./components/keyboard.js";
import Knob from "./components/knob.js";
import Waveform from "./models/waveform.js";
import AudioService from "./services/audio_service.js";

window.Waveform = Waveform;

window.addEventListener("mousedown", new AudioService().initialize, { once: true });

new Keyboard({
  controls: [
    Knob.continuous({
      label: "Volume",
      onChange: AudioService.setMasterVolume,
    }),
    Knob.rotary({
      label: "Waveform",
      onChange: AudioService.setWaveform,
      options: Waveform.values,
      initialValue: Waveform.SINE,
    }),
  ],
});
