const live2d = PIXI.live2d;
const width = window.innerWidth;
const height = window.innerHeight;
class Live2dModel {
    constructor() {
        this.app = new PIXI.Application({
            width: 1280,
            height: 720,
            resolution: window.devicePixelRatio || 1,
            transparent: true,
            autoStart: true,
            resizeTo: window,
            antialias: true,
        });
        this.mainContainer;
        this.model;
        this.model2;
        this.pos_x = 0.0;
        this.pos_y = 0.0;
        this.emptyAnimation;
        this.param_angle_x = 0;
        this.param_angle_y = 0;
        this.param_body_angle_x = 0;
        this.param_eye_ball_x = 0;
        this.param_eye_ball_y = 0;
        this.moc;
        this.modelSize = 50;
        this.modelX = 0;
        this.modelY = 0;
        this.interval;
        this.times = 12;
        this.originalHeight;
        this.twomodels = false;
        this.needResetMotionFade = false;
        this.playingMotion = false;
        this.crtEffect = false;
        this.glassBreakEffect = false;
        this.useVideo = true;
        this.videoURL = "assets/background/bg.webm";
        this.videoContext;
        this.bgURL = "assets/background/bg.jpg";
        this.bgContext;
    }

    destroy() {

        //this.app.destroy({
        //    removeView: true,
        //    stageOptions: true,
        //});
        if (!(typeof this.model === 'undefined')) {
            this.model.destroy();
        }

        if (!(typeof this.model2 === 'undefined')) {
            this.model2.destroy();
        }


        this.model = undefined;
        this.model2 = undefined;
        this.twomodels = false;
    }

    onResize(event) {
        if (event === void 0) {
            event = null;
        }
        console.log(event);


        let scale = height / this.originalHeight;
        //console.log([height, this.model.height, this.originalHeight]);

        this.model.x = width / 2 + this.modelX * width / 100;
        this.model.y = height / 2 + this.modelY * height / 100;
        console.log([this.model.x, this.model.y]);
        this.model.scale.set(scale * (this.modelSize / 30));
        console.log(scale * this.modelSize);
        if (this.twomodels) {
            this.model2.x = width / 2 + this.modelX * width / 100;
            this.model2.y = height / 2 + this.modelY * height / 100;
            console.log([this.model2.x, this.model2.y]);
            this.model2.scale.set(scale * (this.modelSize / 30));
            console.log(scale * this.modelSize);
        }
        //if (this.model.masks) this.model.masks.resize(this.app.view.width, this.app.view.height);
    }




    async loadModel(modelName) {
        this.destroy();
        this.app.stage.sortableChildren = true;
        this.mainContainer = new PIXI.Container();
        //this.app = new PIXI.Application({
        //    width: 1280,
        //    height: 720,
        //    resolution: window.devicePixelRatio || 1,
        //    transparent: true,
        //    autoStart: true,
        //    resizeTo: window,
        //    antialias: true,
        //});
        var videoTexture = PIXI.Texture.from(this.videoURL);
        videoTexture.baseTexture.resource.source.loop = true;
        this.videoContext = new PIXI.Sprite(videoTexture);
        this.videoContext.anchor.set(0.5, 0.5)
        this.videoContext.x = width / 2;
        this.videoContext.y = height / 2;
        this.videoContext.preload = 'auto'
        this.videoContext.autoplay = true;
        this.videoContext.zIndex = -1
        this.videoContext.scale.set(width / 1920, height / 1080);

        if (this.useVideo) {
            this.app.stage.addChild(this.videoContext);
        }

        var bgTexture = PIXI.Texture.from(this.bgURL);
        this.bgContext = new PIXI.Sprite(bgTexture);
        this.bgContext.anchor.set(0.5, 0.5)
        this.bgContext.x = width / 2;
        this.bgContext.y = height / 2;
        this.bgContext.zIndex = -2


        this.app.stage.addChild(this.bgContext);





        const path = './assets/live2d/';
        const folderPath = path + modelName + '/';
        const mion = 'mion_xhrono';
        const jsonPathMion = path + mion + '/' + mion + '_0101.model3.json'

        if (modelName === 'rasis_xhrono') this.twomodels = true;
        if (modelName === 'grace_yukata_ver5') modelName = 'grace_yukata';
        let jsonPath = folderPath + (modelName === 'grace_ver5' ? modelName + '_0102' : modelName === 'rasis_ver5' ? modelName + '_0103' : modelName === "natsuhi_otona" ? modelName + '_0100' : modelName + '_0101') + '.model3.json';
        //let jsonPath2 = folderPath + mion + '_0101.model3.json'
        console.log(jsonPath, jsonPathMion);
        let modelSecondData = await live2d.Live2DModel.from(jsonPathMion, { motionPreload: "ALL", autoInteract: false });
        let modelData = await live2d.Live2DModel.from(jsonPath, { motionPreload: "ALL", autoInteract: false });



        //modelData.once('load',()=>{
        this.model = modelData;
        this.model.motion('In', 0, 2);
        this.model.anchor.set(0.5, 0.5);
        this.model.zIndex = 1;
        this.app.stage.addChild(this.model);
        this.originalHeight = this.model.height;
        //this.onResize(1);
        //})

        //modelSecondData.once('load',()=>{
        if (this.twomodels) {
            this.model2 = modelSecondData;
            this.model2.motion('In', 0, 2);
            this.model2.anchor.set(0.5, 0.5);
            this.model2.zIndex = 2;
            this.app.stage.addChild(this.model2);

        }
        //})
        this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015
        if (this.twomodels) this.model2.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015





        let okButton = new PIXI.Graphics();
        okButton.beginFill(0xffffff);
        okButton.drawCircle(0, 0, 30);
        okButton.endFill();
        let okText = new PIXI.Text('OK', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        okText.anchor.set(0.5, 0.5);
        okButton.addChild(okText);
        okButton.position.set(35, 35);
        okButton.on('pointerup', () => {
            this.model.motion("Ok", 0, 3);
            if (this.twomodels) this.model2.motion("Ok", 0, 3);
        });
        okButton.zIndex = 5;
        okButton.interactive = true;
        okButton.buttonMode = true;
        this.app.stage.addChild(okButton);

        let goodButton = new PIXI.Graphics();
        goodButton.beginFill(0xffffff);
        goodButton.drawCircle(0, 0, 30);
        goodButton.endFill();
        let goodText = new PIXI.Text('Good', { fontFamily: 'Arial', fontSize: 20, fill: 0x1010ff, align: 'center' });
        goodText.anchor.set(0.5, 0.5);
        goodButton.addChild(goodText);
        goodButton.position.set(100, 35);
        goodButton.on('pointerup', () => {
            this.needResetMotionFade = true;
            this.model.motion("R_Good", 0, 3);
            this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 1.5
            if (this.twomodels) {
                this.model2.motion("R_Good", 0, 3);
                this.model2.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 1.5
            }
            if (!this.playingMotion) {
                this.playingMotion = true;
                setTimeout(() => {
                    this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015
                    if (this.twomodels) this.model2.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015
                    this.playingMotion = false;
                }, this.model.internalModel.motionManager.motionGroups.R_Good[0]._loopDurationSeconds * 1000 + 1500)
            }
        });
        goodButton.zIndex = 5;
        goodButton.interactive = true;
        goodButton.buttonMode = true;
        this.app.stage.addChild(goodButton);

        let badButton = new PIXI.Graphics();
        badButton.beginFill(0xffffff);
        badButton.drawCircle(0, 0, 30);
        badButton.endFill();
        let badText = new PIXI.Text('Bad', { fontFamily: 'Arial', fontSize: 20, fill: 0x1010ff, align: 'center' });
        badText.anchor.set(0.5, 0.5);
        badButton.addChild(badText);
        badButton.position.set(165, 35);
        badButton.on('pointerup', () => {
            this.model.motion("R_Bad", 0, 3);
            this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 1.5
            if (this.twomodels) {
                this.model2.motion("R_Bad", 0, 3);
                this.model2.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 1.5
            }
            if (!this.playingMotion) {
                this.playingMotion = true;
                setTimeout(() => {
                    this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015
                    if (this.twomodels) this.model2.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015
                    this.playingMotion = false;
                }, this.model.internalModel.motionManager.motionGroups.R_Bad[0]._loopDurationSeconds * 1000 + 1500)
            }
        });
        badButton.zIndex = 5;
        badButton.interactive = true;
        badButton.buttonMode = true;
        this.app.stage.addChild(badButton);

        let vGoodButton = new PIXI.Graphics();
        vGoodButton.beginFill(0xffffff);
        vGoodButton.drawCircle(0, 0, 30);
        vGoodButton.endFill();
        let vGoodText = new PIXI.Text('VGood', { fontFamily: 'Arial', fontSize: 18, fill: 0x1010ff, align: 'center' });
        vGoodText.anchor.set(0.5, 0.5);
        vGoodButton.addChild(vGoodText);
        vGoodButton.position.set(230, 35);
        vGoodButton.on('pointerup', () => {

            this.model.motion("R_Verygood", 0, 3);
            this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 1.5
            if (this.twomodels) {
                this.model2.motion("R_Verygood", 0, 3);
                this.model2.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 1.5

            }
            if (!this.playingMotion) {
                this.playingMotion = true;
                setTimeout(() => {
                    this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015
                    if (this.twomodels) this.model2.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015
                    this.playingMotion = false;
                }, this.model.internalModel.motionManager.motionGroups.R_Verygood[0]._loopDurationSeconds * 1000 + 1500)
            }
        });
        vGoodButton.zIndex = 5;
        vGoodButton.interactive = true;
        vGoodButton.buttonMode = true;
        this.app.stage.addChild(vGoodButton);


        if (this.crtEffect) {
            console.log("Applying CRT Effect")
            var crtEffect = new PIXI.filters.CRTFilter()
            crtEffect.padding = width

            var adjustEffect = new PIXI.filters.AdjustmentFilter()
            adjustEffect.saturation = 0.5

            var rgbSplitEffect = new PIXI.filters.RGBSplitFilter()
            rgbSplitEffect.red.x = -5
            rgbSplitEffect.red.y = 0
            rgbSplitEffect.green.x = 0
            rgbSplitEffect.green.y = 0
            rgbSplitEffect.blue.x = 5
            rgbSplitEffect.blue.y = 0
            this.app.stage.filters = [crtEffect, adjustEffect, rgbSplitEffect]
        } else {
            this.app.stage.filters = undefined
        }

        if (this.glassBreakEffect) {

        }


        this.onResize(2);
        document.getElementById('live2d').appendChild(this.app.view);
    }

    updateCRTEffect() {
        if (this.crtEffect) {
            var crtEffect = new PIXI.filters.CRTFilter()
            crtEffect.padding = width

            var adjustEffect = new PIXI.filters.AdjustmentFilter()
            adjustEffect.saturation = 0.5

            var rgbSplitEffect = new PIXI.filters.RGBSplitFilter()
            rgbSplitEffect.red.x = -5
            rgbSplitEffect.red.y = 0
            rgbSplitEffect.green.x = 0
            rgbSplitEffect.green.y = 0
            rgbSplitEffect.blue.x = 5
            rgbSplitEffect.blue.y = 0
            this.app.stage.filters = [crtEffect, adjustEffect, rgbSplitEffect]
        } else {
            this.app.stage.filters = []
        }
    }

    updateBg(key) {

        if (!(typeof this.videoContext === "undefined")) {
            this.app.stage.removeChild(this.videoContext)
            var videoTexture = PIXI.Texture.from(this.videoURL);
            videoTexture.baseTexture.resource.source.loop = true;
            this.videoContext = new PIXI.Sprite(videoTexture);
            this.videoContext.anchor.set(0.5, 0.5)
            this.videoContext.x = width / 2;
            this.videoContext.y = height / 2;
            this.videoContext.preload = 'auto'
            this.videoContext.autoplay = true;
            this.videoContext.zIndex = -1
            this.videoContext.scale.set(width / 1920, height / 1080);
            if (this.useVideo) {
                this.app.stage.addChild(this.videoContext)
            } else {
                this.app.stage.removeChild(this.videoContext)
            }
        }

    }
}