// @ts-check
module.exports = function(rawReport) {
  /** @type{typeof import('./demo.report.json')} */
  const report = JSON.parse(rawReport);
  // Compress filmstrip
  const screenshotImages = [];
  let currentImageIndex = -1;
  const screenshotTimings = report.audits["screenshot-thumbnails"].details.items.map((screenshot) => {
    if(screenshot.data !== screenshotImages[currentImageIndex]) {
      currentImageIndex++;
      screenshotImages[currentImageIndex] = screenshot.data;
    }
    return {
      imageIndex: currentImageIndex,
      timing: screenshot.timing,
    }
  });
  // Convert into javascript
  return `
    var images = ${JSON.stringify(screenshotImages)};
    module.exports = [
      ${screenshotTimings.map((screenshotTimings) => `
      {
        image: images[${screenshotTimings.imageIndex}],
        timing: ${screenshotTimings.timing}
      }
      `).join(', ')} 
    ];
  `;
}