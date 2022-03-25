let modelName = "konoha_ver5";
let model = new Live2dModel();
// model.loadModel(modelName);
const bgVideo = document.getElementById("bg-video");
const bg = document.getElementById('bg');
const bgm = document.getElementById('bgm');
let flag = false;

window.wallpaperPropertyListener = {
    applyUserProperties(properties) {

        if (properties.modelName) {
            let oldModelname = "";
            if (!(typeof model.model === "undefined"))
                if (typeof model.model.motion === "function") {
                    model.model.motion("Out", 0, 3);
                    if (model.twomodels) {
                        model.model2.motion("Out", 0, 3);
                    }
                    oldModelname = modelName;
                    console.log("???");
                }

            modelName = properties.modelName.value;
            switch (oldModelname) {
                case "rasis_ver5":
                    setTimeout(() => { model.loadModel(modelName) }, 1583);
                    break;
                case "kureha_666":
                case "natsuhi_otona":
                    setTimeout(() => { model.loadModel(modelName) }, 2050);
                    break;
                case "kureha_9thkac":
                    setTimeout(() => { model.loadModel(modelName) }, 4117);
                    break;
                case "grace_ver5":
                case "grace_yukata":
                    setTimeout(() => { model.loadModel(modelName) }, 1850);
                    break;
                case "cocona_otona":
                    setTimeout(() => { model.loadModel(modelName) }, 1420);
                    break;
                case "tsumabuki_ver6":
                    setTimeout(() => { model.loadModel(modelName) }, 1500);
                    break;
                case "nianoa_ver6":
                    setTimeout(() => { model.loadModel(modelName) }, 1717);
                    break;
                case "suzukihina_ver6":
                    setTimeout(() => { model.loadModel(modelName) }, 1600);
                    break;
                case "tanakahime_ver6":
                    setTimeout(() => { model.loadModel(modelName) }, 1550);
                    break;
                case "rasis_xhrono":
                    setTimeout(() => { model.loadModel(modelName) }, 2183);
                    break;
                default:
                    setTimeout(() => { model.loadModel(modelName) }, 1800);
                    break;
            }
        }
        if (properties.modelX) {
            let modelX = properties.modelX.value;
            model.modelX = modelX;
        }
        if (properties.modelY) {
            let modelY = properties.modelY.value;
            model.modelY = modelY;
        }
        if (properties.modelSize) {
            let modelSize = properties.modelSize.value;
            model.modelSize = modelSize;
        }

        // other
        if (properties.bgBright) {
            // bg.style.filter = `brightness(${properties.bgBright.value / 100})`;
        }
        if (properties.bgType) {
            if (properties.bgType.value === 'video') {
                //bgVideo.style.display = 'inline';
                model.useVideo = true
                model.updateBg(1)
            } else {
                //bgVideo.style.display = 'none';
                model.useVideo = false
                model.updateBg(1)
            }
        }

        if (properties.backgroundversion) {
            if (properties.backgroundversion.value === 'bg') {
                bg.style.backgroundImage = 'url(./assets/background/bg.jpg)';
                //bgVideo.src = './assets/background/bg.webm';
                model.bgURL = "assets/background/bg.jpg"
                model.videoURL = "assets/background/bg.webm";
                model.updateBg(2);
            } else {
                bg.style.backgroundImage = 'url(./assets/background/bg2.png)';
                //bgVideo.src = './assets/background/bg2.webm';
                model.bgURL = "assets/background/bg2.jpg"
                model.videoURL = "assets/background/bg2.webm";
                model.updateBg(2);
            }
        }

        if (properties.bgm) {
            bgm.volume = properties.bgm.value / 100;
        }

        if (properties.crteffect) {
            console.log(properties.crteffect.value)
            model.crtEffect = properties.crteffect.value
            model.updateCRTEffect()
        }

        if (properties.glassbreakeffect) {
            console.log(properties.glassbreakeffect.value)
            model.glassBreakEffect = properties.glassbreakeffect.value
        }
        model.onResize("t");
    }
};

document.getElementById('live2d').addEventListener('pointerdown', (e) => {
    model.model.focus(e.clientX, e.clientY);
    if (model.twomodels) {
        model.model2.focus(e.clientX, e.clientY);
        //model.model2.motion("Ok",0,3);
    }
    //model.model.motion("Ok", 0, 3);
    flag = true;
})


document.getElementById('live2d').addEventListener('pointermove', (e) => {
    if (flag) {
        model.model.focus(e.clientX, e.clientY);
        if (model.twomodels) {
            model.model2.focus(e.clientX, e.clientY);
        }
    }
});

document.getElementById('live2d').addEventListener('pointerup', (e) => {
    flag = false;
    let width = window.innerWidth;
    let height = window.innerHeight;
    model.model.focus(width / 2 + model.modelX * 9, height / 2 + model.modelY * 3);
    if (model.twomodels) {
        model.model2.focus(width / 2 + model.modelX * 9, height / 2 + model.modelY * 3);
    }
})

window.addEventListener('onclick', (e) => {
    model.model.motion("Ok", 0, 2);
});

window.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.isComposing || e.key === 'o') {
        model.model.motion("Ok", 0, 2);
        return;
    }

    if (e.isComposing || e.key === 'g') {
        model.model.motion("R_Good", 0, 2);
        if (model.twomodels) {
            model.model2.motion("R_Good", 0, 2);
        }
        return;
    }

    if (e.isComposing || e.key === 'v') {
        model.model.motion("R_Verygood", 0, 2);
        if (model.twomodels) {
            model.model2.motion("R_Verygood", 0, 2);
        }
        return;
    }

    if (e.isComposing || e.key === 'b') {
        model.model.motion("R_Bad", 0, 2);
        if (model.twomodels) {
            model.model2.motion("R_Bad", 0, 2);
        }
        return;
    }
})

window.addEventListener('resize', (e) => {
    model.onResize("");
})