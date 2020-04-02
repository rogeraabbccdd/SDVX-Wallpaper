let modelName = "grace_ver5"
let model = new Live2dModel()
model.loadModel(modelName);
window.onresize = model.onResize()
window.wallpaperPropertyListener = {
  applyUserProperties(properties) {
    if (properties.modelName) {
      let modelName = properties.modelName.value;
      model.loadModel(modelName);
    }
    if (properties.modelX) {
      let modelX = properties.modelX.value;
      model.modelX = modelX
    }
    if (properties.modelY) {
      let  modelY = properties.modelY.value;
      model.modelY = modelY
    }
    if (properties.modelSize) {
      let modelSize = properties.modelSize.value;
      model.modelSize = modelSize
    }
    
    model.onResize();

    // other
    if (properties.videoBright) {
      document.getElementById("bg").style.filter = `brightness(${properties
        .videoBright.value / 100})`;
    }
    if (properties.video) {
      document.getElementById("bg-video").src =
        "./assets/video/" + properties.video.value + ".webm";
    }
    if (properties.volume) {
      document.getElementById("bgm").volume = properties.volume.value / 100;
    }
  }
};
