export function playAudio(sound, panValue = 0, volume = 0.01) {
  console.log(`Playing: ${sound} ${panValue} ${volume}`);

  let audio = new Audio(sound);
  const ambientContext = new AudioContext();
  const source = ambientContext.createMediaElementSource(audio);
  const ambientPan = ambientContext.createStereoPanner();
  source.connect(ambientPan);
  ambientPan.connect(ambientContext.destination);
  ambientPan.pan.value = panValue;
  audio.loop = false;
  audio.volume = volume;
  audio.autoplay = true;
  audio.load();
  audio.play();
}