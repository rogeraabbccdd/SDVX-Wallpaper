const live2d = PIXI.live2d;
const width = window.innerWidth;
const height = window.innerHeight;

const good2_aqua = new Howl({
    src: ['assets/sound/good2.mp3'],
	html5: true,
    volume: 0.5,
    onend: function() {
        console.log('Finished!');
    }
});

const good_aqua = new Howl({
    src: ['assets/sound/good.mp3'],
	html5: true,
    volume: 0.5,
    onend: function() {
        good2_aqua.play();
    }
});

const bad2_aqua = new Howl({
    src: ['assets/sound/bad2.mp3'],
	html5: true,
    volume: 0.5,
    onend: function() {
        console.log('Finished!');
    }
});

const bad_aqua = new Howl({
    src: ['assets/sound/bad.mp3'],
	html5: true,
    volume: 0.5,
    onend: function() {
        bad2_aqua.play();
    }
});

const vgood2_aqua = new Howl({
    src: ['assets/sound/vgood2.mp3'],
	html5: true,
    volume: 0.5,
    onend: function() {
        console.log('Finished!');
    }
});

const vgood_aqua = new Howl({
    src: ['assets/sound/vgood.mp3'],
	html5: true,
    volume: 0.5,
    onend: function() {
        vgood2_aqua.play();
    }
});

const ok_aqua = new Howl({
    src: ['assets/sound/ok.mp3'],
	html5: true,
    volume: 0.5,
    onend: function() {
        console.log('Finished!');
    }
});

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
        this.bgURL = "./assets/background/bg.jpg";
        this.bgContext;
        this.zoomEffectIntervalObject;
        this.zoomEffect;
        this.zoomStrengthAdd = 0;
        this.zoomWait = 0;
        this.buttonArray = [];
    }

    destroy() {
        this.buttonArray.forEach((i) => {
            this.app.stage.removeChild(i)
        })


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
    }




    async loadModel(modelName) {
        this.destroy();
        this.app.stage.sortableChildren = true;
        this.mainContainer = new PIXI.Container();
        var videoTexture = PIXI.Texture.from(this.videoURL);
        videoTexture.baseTexture.resource.source.loop = true;
        videoTexture.baseTexture.on('loaded', function() { videoTexture.baseTexture.resource.source.pause(); });
        this.videoContext = new PIXI.Sprite(videoTexture);
        this.videoContext.anchor.set(0.5, 0.5)
        this.videoContext.x = width / 2;
        this.videoContext.y = height / 2;
        this.videoContext.preload = ''
        this.videoContext.zIndex = -1
        this.videoContext.scale.set(width / 1920, height / 1080);

        if (this.useVideo) {
            this.app.stage.addChild(this.videoContext);
            this.videoContext.texture.baseTexture.resource.source.play();
        } else {

            this.videoContext.texture.baseTexture.resource.source.pause();

        }

        var bgTexture = PIXI.Texture.from(this.bgURL);
        this.bgContext = PIXI.Sprite.from(bgTexture);
        this.bgContext.anchor.set(0.5, 0.5)
        this.bgContext.x = width / 2;
        this.bgContext.y = height / 2;
        this.bgContext.zIndex = -2
        this.bgContext.scale.set(width / 1920, height / 1080);

        this.app.stage.addChild(this.bgContext);





        const path = './assets/live2d/';
        const folderPath = path + modelName + '/';
        const mion = 'mion_xhrono';
        const jsonPathMion = path + mion + '/' + mion + '_0101.model3.json'

        if (modelName === 'rasis_xhrono') this.twomodels = true;
        if (modelName === 'grace_yukata_ver5') modelName = 'grace_yukata';
        let jsonPath = folderPath + modelName;
		switch(modelName){
			case 'grace_ver5':
				jsonPath += '_0102.model3.json';
				break;
			case 'rasis_ver5':
				jsonPath += '_0103.model3.json';
				break;
			case 'natsuhi_otona':
            case 'shirakami_fubuki':
				jsonPath += '_0100.model3.json';
				break;
			case 'konosuba_aqua':
				jsonPath += '_01.model3.json';
				break;                
            case 'effect_hexathlon_bpl':
            case 'grace_mini':
            case 'grace_mixxion_game':
            case 'grace_sudden_game':
            case 'haruka':
            case 'left_hexathlon_bpl':
            case 'right_hexathlon_bpl':
            case 'left_right_hexathlon_bpl':
            case 'natsuhi_bunny':
            case 'ortlinde_akasha_game':
            case 'ortlinde_akasha_kac':
            case 'rasis_hexathlon':
            case 'rasis_hexathlon_bpl':
            case 'rezero_emilia':
            case 'rezero_rem':
			case 'rasis_redbull5g':
			case 'rasis_energy':
            case 'tsumabuki_setu-o':
                jsonPath += '.model3.json';
				break;
			default:
				jsonPath += '_0101.model3.json';
		}
		
		
        console.log(jsonPath, jsonPathMion);
        let modelSecondData = await live2d.Live2DModel.from(jsonPathMion, { motionPreload: "ALL", autoInteract: false });
        let modelData = await live2d.Live2DModel.from(jsonPath, { motionPreload: "ALL", autoInteract: false });
        this.model = modelData;
        if (modelName == 'kureha_9thkac') {
            this.model.alpha = 0
            this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 1.5;
            console.log(this.model);

            const texture = PIXI.Texture.from('./assets/png/cutred.webm');
            const videoSprite = new PIXI.Sprite(texture);

            videoSprite.anchor.set(0.5)
            videoSprite.x = width / 2;
            videoSprite.y = height / 2;
            const aspectRatio = 1080 / 1920;
            videoSprite.scale.x = 1 / aspectRatio;
            videoSprite.scale.y = aspectRatio;
            videoSprite.blendMode = PIXI.BLEND_MODES.ADD;
            videoSprite.preload = 'auto';
            videoSprite.zIndex = 50;
            videoSprite.texture.baseTexture.resource.source.currentTime = 0;
            this.app.stage.addChild(videoSprite);
            videoSprite.texture.baseTexture.resource.source.play();

            setTimeout(() => {
                this.model.alpha = 1
                this.model.motion('In', 0, 3);
            }, 2100)

            setTimeout(() => {
                this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015;
                this.app.stage.removeChild(videoSprite);
            }, this.model.internalModel.motionManager.motionGroups.In[0]._loopDurationSeconds * 1000 + 8450 + 3000);
        } else {
            this.model.motion('In', 0, 2);
            this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015
        }
        this.model.anchor.set(0.5, 0.5);
        this.model.zIndex = 1;
        this.app.stage.addChild(this.model);
        this.originalHeight = this.model.height;
        if (this.twomodels) {
            this.model2 = modelSecondData;
            this.model2.motion('In', 0, 2);
            this.model2.anchor.set(0.5, 0.5);
            this.model2.zIndex = 2;
            this.app.stage.addChild(this.model2);

        }
        // this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015
        if (this.twomodels) this.model2.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015

        switch (modelName) {
            case 'mion_10thkac':
                this.generate_button_mion()
                break
            case 'kureha_9thkac':
                this.generate_button_666()
                break
            case 'grace_10thkac':
                this.generate_button_grace()
                break
            case 'rasis_redbull5g':
                this.generate_button_rasis_redbull5g()
                break
            default:
                this.generate_button_normal();
                break
        }

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
        this.updateBg(2);
        document.getElementById('live2d').appendChild(this.app.view);
    }

    generate_button_mion() {
        let vButton = new PIXI.Graphics();
        vButton.beginFill(0xffffff);
        vButton.drawCircle(0, 0, 30);
        vButton.endFill();
        let vText = new PIXI.Text('Ver 5', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        vText.anchor.set(0.5, 0.5);
        vButton.addChild(vText);
        vButton.position.set(35, 35);
        vButton.on('pointerup', () => {
            this.zoomEffectCall()
            this.model.motion("Change5", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle5'
        });
        vButton.zIndex = 5;
        vButton.interactive = true;
        vButton.buttonMode = true;
        this.buttonArray.push(vButton);
        this.app.stage.addChild(vButton);

        let ivButton = new PIXI.Graphics();
        ivButton.beginFill(0xffffff);
        ivButton.drawCircle(0, 0, 30);
        ivButton.endFill();
        let ivText = new PIXI.Text('Ver 4', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        ivText.anchor.set(0.5, 0.5);
        ivButton.addChild(ivText);
        ivButton.position.set(100, 35);
        ivButton.on('pointerup', () => {
            this.zoomEffectCall()
            this.model.motion("Change4", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle4'
        });
        ivButton.zIndex = 5;
        ivButton.interactive = true;
        ivButton.buttonMode = true;
        this.buttonArray.push(ivButton);
        this.app.stage.addChild(ivButton);

        let iiiButton = new PIXI.Graphics();
        iiiButton.beginFill(0xffffff);
        iiiButton.drawCircle(0, 0, 30);
        iiiButton.endFill();
        let iiiText = new PIXI.Text('Ver 3', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        iiiText.anchor.set(0.5, 0.5);
        iiiButton.addChild(iiiText);
        iiiButton.position.set(165, 35);
        iiiButton.on('pointerup', () => {
            this.zoomEffectCall()
            this.model.motion("Change3", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle3'
        });
        iiiButton.zIndex = 5;
        iiiButton.interactive = true;
        iiiButton.buttonMode = true;
        this.buttonArray.push(iiiButton);
        this.app.stage.addChild(iiiButton);

        let iiButton = new PIXI.Graphics();
        iiButton.beginFill(0xffffff);
        iiButton.drawCircle(0, 0, 30);
        iiButton.endFill();
        let iiText = new PIXI.Text('Ver 2', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        iiText.anchor.set(0.5, 0.5);
        iiButton.addChild(iiText);
        iiButton.position.set(230, 35);
        iiButton.on('pointerup', () => {
            this.zoomEffectCall()
            this.model.motion("Change2", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle'
        });
        iiButton.zIndex = 5;
        iiButton.interactive = true;
        iiButton.buttonMode = true;
        this.buttonArray.push(iiButton);
        this.app.stage.addChild(iiButton);

        let iButton = new PIXI.Graphics();
        iButton.beginFill(0xffffff);
        iButton.drawCircle(0, 0, 30);
        iButton.endFill();
        let iText = new PIXI.Text('Ver 1', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        iText.anchor.set(0.5, 0.5);
        iButton.addChild(iText);
        iButton.position.set(295, 35);
        iButton.on('pointerup', () => {
            this.zoomEffectCall()
            this.model.motion("Change1", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle'
        });
        iButton.zIndex = 5;
        iButton.interactive = true;
        iButton.buttonMode = true;
        this.buttonArray.push(iButton);
        this.app.stage.addChild(iButton);
    }

    generate_button_666() {
        let kenButton = new PIXI.Graphics();
        kenButton.beginFill(0xffffff);
        kenButton.drawCircle(0, 0, 30);
        kenButton.endFill();
        let kenText = new PIXI.Text('Ken', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        kenText.anchor.set(0.5, 0.5);
        kenButton.addChild(kenText);
        kenButton.position.set(35, 35);
        kenButton.on('pointerup', () => {
            this.model.motion("Ken", 0, 3);
            const texture = PIXI.Texture.from('./assets/png/output.webm');
            const videoSprite = new PIXI.Sprite(texture);

            videoSprite.anchor.set(0.5)
            videoSprite.x = width / 2;
            videoSprite.y = height / 2;
            const aspectRatio = 1080 / 1920;
            videoSprite.scale.x = 1 / aspectRatio;
            videoSprite.scale.y = aspectRatio;
            videoSprite.blendMode = PIXI.BLEND_MODES.ADD;
            videoSprite.preload = 'auto';
            videoSprite.zIndex = 50;
            setTimeout(() => {
                videoSprite.texture.baseTexture.resource.source.pause();
                videoSprite.texture.baseTexture.resource.source.currentTime = 0;

                this.app.stage.addChild(videoSprite);

                videoSprite.texture.baseTexture.resource.source.play();
            }, this.model.internalModel.motionManager.motionGroups.Ken[0]._loopDurationSeconds * 1000 - 6000);

            setTimeout(() => {
                this.app.stage.removeChild(videoSprite);
            }, this.model.internalModel.motionManager.motionGroups.Ken[0]._loopDurationSeconds * 1000);
            this.model.internalModel.motionManager.groups.idle = 'Idle2'
        });
        kenButton.zIndex = 5;
        kenButton.interactive = true;
        kenButton.buttonMode = true;
        this.buttonArray.push(kenButton);
        this.app.stage.addChild(kenButton);

        let lastButton = new PIXI.Graphics();
        lastButton.beginFill(0xffffff);
        lastButton.drawCircle(0, 0, 30);
        lastButton.endFill();
        let lastText = new PIXI.Text('Last', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        lastText.anchor.set(0.5, 0.5);
        lastButton.addChild(lastText);
        lastButton.position.set(100, 35);
        lastButton.on('pointerup', () => {
            this.model.motion("Last", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle3'

            const texture = PIXI.Texture.from('./assets/png/cutred.webm');
            const videoSprite = new PIXI.Sprite(texture);

            videoSprite.anchor.set(0.5)
            videoSprite.x = width / 2;
            videoSprite.y = height / 2;
            const aspectRatio = 1080 / 1920;
            videoSprite.scale.x = 1 / aspectRatio;
            videoSprite.scale.y = aspectRatio;
            videoSprite.blendMode = PIXI.BLEND_MODES.ADD;
            videoSprite.preload = 'auto';
            videoSprite.zIndex = 50;


            var ee1 = [];
            var ee2 = [];
            setTimeout(() => {
                ee1.forEach((e) => {
                    createjs.Tween.get(e).to({ alpha: 0 }, 500);
                })

                ee2.forEach((e) => {
                    createjs.Tween.get(e).to({ alpha: 0 }, 500);
                })
                this.model.motion("Out", 0, 3);

            }, 5000);



            setTimeout(() => {
                ee1.forEach((e) => {
                    this.app.stage.removeChild(e);
                })

                ee2.forEach((e) => {
                    this.app.stage.removeChild(e);
                })

            }, 7000);

            setTimeout(() => {
                videoSprite.texture.baseTexture.resource.source.currentTime = 0;
                this.app.stage.addChild(videoSprite);
                videoSprite.texture.baseTexture.resource.source.play();
                this.model.alpha = 0
            }, 10000)



            setTimeout(() => {
                this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 1.5;
                this.model.alpha = 1
                this.model.motion("In", 0, 3);
                this.model.internalModel.motionManager.groups.idle = 'Idle'
            }, 12000);

            setTimeout(() => {
                this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015;
                this.app.stage.removeChild(videoSprite);
            }, this.model.internalModel.motionManager.motionGroups.In[0]._loopDurationSeconds * 1000 + 8500 + 12100);

            ee1 = [];
            ee2 = [];

            setTimeout(() => {
                for (var i = 1; i < 12; i++) {
                    var e = new PIXI.Sprite.from('./assets/png/5_ne_eff_06_i_feb.png');
                    e.anchor.set(1, 0.5);
                    e.x = this.model.x;
                    e.y = this.model.y - 200;
                    e.scale.x = i;
                    e.scale.y = i;

                    ee1.push(e);
                    this.app.stage.addChild(e);
                }

                for (var i = 1; i < 12; i++) {
                    var e = new PIXI.Sprite.from('./assets/png/5_ne_eff_06_i_feb.png');
                    e.anchor.set(1, 0.5);
                    e.x = this.model.x;
                    e.y = this.model.y - 200;
                    e.scale.x = -i;
                    e.scale.y = i;

                    ee2.push(e);
                    this.app.stage.addChild(e);
                }
                this.app.ticker.add((d) => {
                    ee1.forEach((y) => {
                        y.scale.x += 0.1;
                        y.scale.y += 0.1;
                        if (y.scale.x > 10) {
                            y.scale.x = 0.2;
                            y.scale.y = 0.2;
                        }
                    })

                    ee2.forEach((y) => {
                        y.scale.x -= 0.1;
                        y.scale.y += 0.1;
                        if (y.scale.x < -10) {
                            y.scale.x = -0.2;
                            y.scale.y = 0.2;
                        }
                    })
                });
            }, 1500)

        });
        lastButton.zIndex = 5;
        lastButton.interactive = true;
        lastButton.buttonMode = true;
        this.buttonArray.push(lastButton);
        this.app.stage.addChild(lastButton);

        let normalButton = new PIXI.Graphics();
        normalButton.beginFill(0xffffff);
        normalButton.drawCircle(0, 0, 30);
        normalButton.endFill();
        let normalText = new PIXI.Text('Normal', { fontFamily: 'Arial', fontSize: 18, fill: 0x1010ff, align: 'center' });
        normalText.anchor.set(0.5, 0.5);
        normalButton.addChild(normalText);
        normalButton.position.set(165, 35);
        normalButton.on('pointerup', () => {
            this.model.internalModel.motionManager.motionGroups.In[0]._fadeInSeconds = 1.5;
            this.model.motion("In", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle'
            this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 1.5;
            setTimeout(() => {
                this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015;
            }, this.model.internalModel.motionManager.motionGroups.In[0]._loopDurationSeconds * 1000 + 8450);
        });
        normalButton.zIndex = 5;
        normalButton.interactive = true;
        normalButton.buttonMode = true;
        this.buttonArray.push(normalButton);
        this.app.stage.addChild(normalButton);
    }

    generate_button_grace() {
        let gunOneButton = new PIXI.Graphics();
        gunOneButton.beginFill(0xffffff);
        gunOneButton.drawCircle(0, 0, 30);
        gunOneButton.endFill();
        let gunOneText = new PIXI.Text('Gun 1', { fontFamily: 'Arial', fontSize: 22, fill: 0x1010ff, align: 'center' });
        gunOneText.anchor.set(0.5, 0.5);
        gunOneButton.addChild(gunOneText);
        gunOneButton.position.set(35, 35);
        gunOneButton.on('pointerup', () => {
            this.model.motion("Gun1", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle2'
        });
        gunOneButton.zIndex = 5;
        gunOneButton.interactive = true;
        gunOneButton.buttonMode = true;
        this.buttonArray.push(gunOneButton);
        this.app.stage.addChild(gunOneButton);

        let flyButton = new PIXI.Graphics();
        flyButton.beginFill(0xffffff);
        flyButton.drawCircle(0, 0, 30);
        flyButton.endFill();
        let flyText = new PIXI.Text('Fly', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        flyText.anchor.set(0.5, 0.5);
        flyButton.addChild(flyText);
        flyButton.position.set(100, 35);
        flyButton.on('pointerup', () => {
            this.model.motion("Fly", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle3'
        });
        flyButton.zIndex = 5;
        flyButton.interactive = true;
        flyButton.buttonMode = true;
        this.buttonArray.push(flyButton);
        this.app.stage.addChild(flyButton);

        let gunTwoButton = new PIXI.Graphics();
        gunTwoButton.beginFill(0xffffff);
        gunTwoButton.drawCircle(0, 0, 30);
        gunTwoButton.endFill();
        let gunTwoText = new PIXI.Text('Gun 2', { fontFamily: 'Arial', fontSize: 22, fill: 0x1010ff, align: 'center' });
        gunTwoText.anchor.set(0.5, 0.5);
        gunTwoButton.addChild(gunTwoText);
        gunTwoButton.position.set(165, 35);
        gunTwoButton.on('pointerup', () => {
            // this.zoomEffectCall()
            this.model.motion("Gun2", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle3'
        });
        gunTwoButton.zIndex = 5;
        gunTwoButton.interactive = true;
        gunTwoButton.buttonMode = true;
        this.buttonArray.push(gunTwoButton);
        this.app.stage.addChild(gunTwoButton);


        let finalButton = new PIXI.Graphics();
        finalButton.beginFill(0xffffff);
        finalButton.drawCircle(0, 0, 30);
        finalButton.endFill();
        let finalText = new PIXI.Text('Final', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        finalText.anchor.set(0.5, 0.5);
        finalButton.addChild(finalText);
        finalButton.position.set(230, 35);
        finalButton.on('pointerup', () => {
            // this.zoomEffectCall()
            this.model.motion("Final", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle'
            this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 1.5;
            setTimeout(() => {
                this.model.motion("In", 0, 3);
            }, this.model.internalModel.motionManager.motionGroups.Final[0]._loopDurationSeconds * 1000);
        });
        finalButton.zIndex = 5;
        finalButton.interactive = true;
        finalButton.buttonMode = true;
        this.buttonArray.push(finalButton);
        this.app.stage.addChild(finalButton);

    }

    generate_button_rasis_redbull5g() {
        let drinkButton = new PIXI.Graphics();
        drinkButton.beginFill(0xffffff);
        drinkButton.drawCircle(0, 0, 30);
        drinkButton.endFill();
        let gunOneText = new PIXI.Text('Drink', { fontFamily: 'Arial', fontSize: 22, fill: 0x1010ff, align: 'center' });
        gunOneText.anchor.set(0.5, 0.5);
        drinkButton.addChild(gunOneText);
        drinkButton.position.set(35, 35);
        drinkButton.on('pointerup', () => {
            this.model.motion("Drink", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle2'
        });
        drinkButton.zIndex = 5;
        drinkButton.interactive = true;
        drinkButton.buttonMode = true;
        this.buttonArray.push(drinkButton);
        this.app.stage.addChild(drinkButton);

        let flyButton = new PIXI.Graphics();
        flyButton.beginFill(0xffffff);
        flyButton.drawCircle(0, 0, 30);
        flyButton.endFill();
        let flyText = new PIXI.Text('Fly', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        flyText.anchor.set(0.5, 0.5);
        flyButton.addChild(flyText);
        flyButton.position.set(100, 35);
        flyButton.on('pointerup', () => {
            this.model.motion("Fly", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle3'
        });
        flyButton.zIndex = 5;
        flyButton.interactive = true;
        flyButton.buttonMode = true;
        this.buttonArray.push(flyButton);
        this.app.stage.addChild(flyButton);

        let outButton = new PIXI.Graphics();
        outButton.beginFill(0xffffff);
        outButton.drawCircle(0, 0, 30);
        outButton.endFill();
        let outText = new PIXI.Text('Out', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        outText.anchor.set(0.5, 0.5);
        outButton.addChild(outText);
        outButton.position.set(165, 35);
        outButton.on('pointerup', () => {
            this.model.motion("Out", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle'
            this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 1.5;
            setTimeout(() => {
                this.model.motion("In", 0, 3);
            }, this.model.internalModel.motionManager.motionGroups.Final[0]._loopDurationSeconds * 1000);
        });
        outButton.zIndex = 5;
        outButton.interactive = true;
        outButton.buttonMode = true;
        this.buttonArray.push(outButton);
        this.app.stage.addChild(outButton);
    }

    zoomEffectCall() {
        var zoomEffect = new PIXI.filters.ZoomBlurFilter()
        zoomEffect.center.x = width / 2
        zoomEffect.center.y = height / 2
        zoomEffect.innerRadius = width / 5
        zoomEffect.strength = 0

        this.zoomEffect = zoomEffect
        this.zoomStrengthAdd = 0
        clearInterval(this.zoomEffectIntervalObject);

        this.zoomEffectIntervalObject = setInterval(() => {
            if (this.zoomStrengthAdd == 0) {
                this.zoomEffect.strength += 0.002
                if (this.zoomEffect.strength >= 0.15) {
                    this.zoomStrengthAdd = 1
                }
            } else if (this.zoomStrengthAdd == 1) {
                this.zoomWait += 1
                if (this.zoomWait >= 2) {
                    this.zoomStrengthAdd = 2
                    this.zoomWait = 0
                }
            } else if (this.zoomStrengthAdd == 2) {
                this.zoomEffect.strength -= 0.001
                if (this.zoomEffect.strength <= 0.0) {
                    this.zoomStrengthAdd = 3
                }
            } else {
                clearInterval(this.zoomEffectIntervalObject);
            }
        }, 10);

        this.app.stage.filters = [this.zoomEffect];
    }


    generate_button_normal() {
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

            if (modelName == "konosuba_aqua") {
                ok_aqua.play();
            }
        });
        okButton.zIndex = 5;
        okButton.interactive = true;
        okButton.buttonMode = true;
        this.buttonArray.push(okButton);
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

            if (modelName == "konosuba_aqua") {
                good_aqua.play();
            }

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
        this.buttonArray.push(goodButton);
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

            if (modelName == "konosuba_aqua") {
                bad_aqua.play();
            }


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
        this.buttonArray.push(badButton);
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

            if (modelName == "konosuba_aqua") {
                vgood_aqua.play();
            }

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
        this.buttonArray.push(vGoodButton);
        this.app.stage.addChild(vGoodButton);
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

            var zoomEffect = new PIXI.filters.ZoomBlurFilter()
            zoomEffect.center.x = width / 2
            zoomEffect.center.y = height / 2
                // zoomEffect.innerRadius = width / 4
            zoomEffect.strength = 0

            this.zoomEffect = zoomEffect

            this.zoomEffectIntervalObject = setInterval(() => {
                if (this.zoomStrengthAdd == 0) {
                    this.zoomEffect.strength += 0.01
                    if (this.zoomEffect.strength >= 0.15) {
                        this.zoomStrengthAdd = 1
                    }
                } else if (this.zoomStrengthAdd == 2) {
                    this.zoomEffect.strength -= 0.005
                    if (this.zoomEffect.strength <= 0.0) {
                        this.zoomStrengthAdd = 3
                    }
                } else if (this.zoomStrengthAdd == 1) {
                    this.zoomWait += 1
                    if (this.zoomWait >= 2) {
                        this.zoomStrengthAdd = 2
                        this.zoomWait = 0
                    }
                } else {
                    this.zoomWait += 1
                    if (this.zoomWait >= Math.floor(Math.random() * (9000 - 100) + 100)) {
                        this.zoomStrengthAdd = 0
                        this.zoomWait = 0
                    }
                }
            }, 50);


            this.app.stage.filters = [crtEffect, adjustEffect, rgbSplitEffect, this.zoomEffect]
        } else {
            this.app.stage.filters = []
            this.zoomStrengthAdd = true
            clearInterval(this.zoomEffectIntervalObject);
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
            this.videoContext.preload = ''
            this.videoContext.zIndex = -1
            this.videoContext.scale.set(width / 1920, height / 1080);
            this.videoContext.texture.baseTexture.resource.source.pause();
            if (this.useVideo) {
                this.app.stage.addChild(this.videoContext)
                this.videoContext.texture.baseTexture.resource.source.play();
            } else {

                this.app.stage.removeChild(this.videoContext)
            }
        }


        if (!(typeof this.bgContext === "undefined")) {
            this.app.stage.removeChild(this.bgContext)
            var bgTexture = PIXI.Texture.from(this.bgURL);
            this.bgContext = PIXI.Sprite.from(bgTexture);
            this.bgContext.anchor.set(0.5, 0.5)
            this.bgContext.x = width / 2;
            this.bgContext.y = height / 2;
            this.bgContext.zIndex = -2
            this.bgContext.scale.set(width / 1920, height / 1080);

            this.app.stage.addChild(this.bgContext);
        }



    }
}
