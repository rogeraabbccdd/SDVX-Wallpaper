let modelName = "";
let model = new Live2dModel();
// model.loadModel(modelName);
const bgVideo = document.getElementById("bg-video");
const bg = document.getElementById('bg');
const bgm = document.getElementById('bgm');
let flag = false;

window.wallpaperPropertyListener = {
    applyUserProperties(properties) {

        if (properties.modelName) {
            var oldModelname = "";
            if (!(typeof model.model === "undefined"))
                if (typeof model.model.motion === "function") {
                    if (modelName == 'mion_10thkac') {
                        model.model.motion("Out1", 0, 3);
                    } else if (modelName == 'grace_10thkac') {
                        model.model.motion("EG1_in", 0, 3);
                    } else if (modelName == 'grace_sudden_game') {
                        model.model.motion("EG4_out", 0, 3);
                    } else if (modelName == 'grace_mixxion_game') {
                        model.model.motion("Gun1", 0, 3);
                    } else if (modelName == 'left_right_hexathlon_bpl') {
                        model.model.motion("Change1a", 0, 3);
                    } else if (modelName == 'ortlinde_akasha_game') {
                        model.model.motion("Idle", 0, 3);
                    } else if (modelName == 'ortlinde_akasha_kac') {
                        model.model.motion("Idle", 0, 3);
                    } else if (modelName == 'rasis_hexathlon_bpl') {
                        model.model.motion("Idle7", 0, 3);
                    } else {
                        model.model.motion("Out", 0, 3);
                    }
                    oldModelname = modelName;
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
                case "mion_10thkac":
                    setTimeout(() => { model.loadModel(modelName) }, 2170);
                    break;
                case "rasis_xhrono":
                    setTimeout(() => { model.loadModel(modelName) }, 2183);
                    break;
                case "grace_10thkac":
                    setTimeout(() => { model.loadModel(modelName) }, 9880);
                    break;
                case "ortlinde_normal":
                    setTimeout(() => { model.loadModel(modelName) }, 1883);
                    break;
                case "konosuba_aqua":
                    setTimeout(() => { model.loadModel(modelName) }, 1633);
                    break;
                case "rasis_redbull5g":
                    setTimeout(() => { model.loadModel(modelName) }, 1917);
                    break;
                case "rasis_energy":
                    setTimeout(() => { model.loadModel(modelName) }, 1650);
                    break;
                case "effect_hexathlon_bpl":
                    setTimeout(() => { model.loadModel(modelName) }, 3050);
                    break;
                case "grace_mini":
                    setTimeout(() => { model.loadModel(modelName) }, 1867);
                    break;
                case "grace_mixxion_game":
                    setTimeout(() => { model.loadModel(modelName) }, 9200);
                    break;
                case "grace_suddendeath":
                    setTimeout(() => { model.loadModel(modelName) }, 1783);
                    break;
                case "grace_sudden_game":
                    setTimeout(() => { model.loadModel(modelName) }, 2283);
                    break;
                case "haruka":
                    setTimeout(() => { model.loadModel(modelName) }, 1820);
                    break;
                case "kanade_normal":
                    setTimeout(() => { model.loadModel(modelName) }, 1667);
                    break;
                case "left_hexathlon_bpl":
                    setTimeout(() => { model.loadModel(modelName) }, 2520);
                    break;
                case "right_hexathlon_bpl":
                    setTimeout(() => { model.loadModel(modelName) }, 2067);
                    break;
                case "left_right_hexathlon_bpl":
                    setTimeout(() => { model.loadModel(modelName) }, 1725);
                    break;
                case "maxima_vm":
                    setTimeout(() => { model.loadModel(modelName) }, 1583);
                    break;
                case "mion_xhrono":
                    setTimeout(() => { model.loadModel(modelName) }, 2183);
                    break;
                case "natsuhi_bunny":
                    setTimeout(() => { model.loadModel(modelName) }, 1833);
                    break;
                case "nekomata_okayu":
                    setTimeout(() => { model.loadModel(modelName) }, 1833);
                    break;
                case "ortlinde_akasha":
                    setTimeout(() => { model.loadModel(modelName) }, 1742);
                    break;
                case "ortlinde_akasha_game":
                    setTimeout(() => { model.loadModel(modelName) }, 5783);
                    break;
                case "ortlinde_akasha_kac":
                    setTimeout(() => { model.loadModel(modelName) }, 5783);
                    break;
                case "rasis_hexathlon":
                    setTimeout(() => { model.loadModel(modelName) }, 2467);
                    break;
                case "rasis_hexathlon_bpl":
                    setTimeout(() => { model.loadModel(modelName) }, 4450);
                    break;
                case "rezero_emilia":
                    setTimeout(() => { model.loadModel(modelName) }, 4883);
                    break;
                case "rezero_rem":
                    setTimeout(() => { model.loadModel(modelName) }, 1733);
                    break;
                case "shirakami_fubuki":
                    setTimeout(() => { model.loadModel(modelName) }, 2483);
                    break;
                case "tsumabuki_setu-o":
                    setTimeout(() => { model.loadModel(modelName) }, 1817);
                    break;
                case "tsunomaki_watame":
                    setTimeout(() => { model.loadModel(modelName) }, 3067);
                    break;
                case "cocona_bunny":
                    setTimeout(() => { model.loadModel(modelName) }, 1820);
                    break;
                default:
                    setTimeout(() => { model.loadModel(modelName) }, 7000);
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
            model.bgURL = "./assets/background/"+ properties.backgroundversion.value +".png"
            model.videoURL = "assets/background/"+ properties.backgroundversion.value +".webm";
            model.updateBg(2);
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
        model.videoContext.texture.baseTexture.resource.source.pause();
        model.updateBg(2);
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
    model.model.focus(model.model.x, model.model.y);
    if (model.twomodels) {
        model.model2.focus(model.model2.x, model.model2.y);
    }
})


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