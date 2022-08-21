export const confettiAnimate = () => {
  const { party } = window
  if (typeof party !== "undefined") {
    const { confetti, variation } = party;
    confetti(document.body, {
      count: variation.range(140, 200),
      size: variation.range(0.8, 1.2),
      spread: variation.range(5, 10),
    });
  }
}
