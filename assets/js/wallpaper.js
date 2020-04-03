let modelName = "grace_ver5"
let model = new Live2dModel()
model.loadModel(modelName);
window.onresize = model.onResize()
const bgVideo = document.getElementById("bg-video")
const bg = document.getElementById('bg')
const bgm = document.getElementById('bgm')
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
    if (properties.bgBright) {
      bg.style.filter = `brightness(${properties
        .bgBright.value / 100})`;
    }
    if (properties.bgType) {
      if(properties.bgType.value === 'video') {
        bgVideo.style.display = 'inline'
      }
      else {
        bgVideo.style.display = 'none'
      }
    }
    if (properties.volume) {
      bgm.volume = properties.volume.value / 100;
    }
  }
};
