const live2d = PIXI.live2d;
let width = window.innerWidth;
let height = window.innerHeight;
createjs.Ticker.framerate = 120;
let left_hexa = new SuddenDeathLeftHexagon()
let right_hexa = new SuddenDeathRightHexagon()
// PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL2


const good2_aqua = new Howl({
    src: ['assets/sound/good2.mp3'],
    volume: 0.5,
    onend: function() {
        // console.log('Finished!');
    }
});

const good_aqua = new Howl({
    src: ['assets/sound/good.mp3'],
    volume: 0.5,
    onend: function() {
        good2_aqua.play();
    }
});

const bad2_aqua = new Howl({
    src: ['assets/sound/bad2.mp3'],
    volume: 0.5,
    onend: function() {
        // console.log('Finished!');
    }
});

const bad_aqua = new Howl({
    src: ['assets/sound/bad.mp3'],
    volume: 0.5,
    onend: function() {
        bad2_aqua.play();
    }
});

const vgood2_aqua = new Howl({
    src: ['assets/sound/vgood2.mp3'],
    volume: 0.5,
    onend: function() {
        // console.log('Finished!');
    }
});

const vgood_aqua = new Howl({
    src: ['assets/sound/vgood.mp3'],
    volume: 0.5,
    onend: function() {
        vgood2_aqua.play();
    }
});

const ok_aqua = new Howl({
    src: ['assets/sound/ok.mp3'],
    volume: 0.5,
    onend: function() {
        // console.log('Finished!');
    }
});

const exceed_sfx = new Howl({
    src: ['assets/sound/sfx/7.mp3'],
    volume: 0.05,
});


class Live2dModel {
    constructor() {
        this.app = new PIXI.Application({
            width: 1920,
            height: 1080,
            resolution: window.devicePixelRatio || 1,
            transparent: true,
            autoStart: true,
            resizeTo: window,
            antialias: true,
        });
        this.mainContainer;
        this.model;
        this.model2;
        this.model3;
        this.lrVFXmodel;
        this.rasisVFXmodel;
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
        this.useVideo = false;
        this.videoURL = "assets/background/bg2.webm";
        this.videoContext;
        this.bgURL = "./assets/background/bg2.png";
        this.bgContext;
        this.zoomEffectIntervalObject;
        this.zoomEffect;
        this.zoomStrengthAdd = 0;
        this.zoomWait = 0;
        this.glassesSwitch = false;
        this.buttonArray = [];
        this.subContainers = [];
        this.initialize_asset();
        //this.sudden_death_in()
    }

    initialize_asset(){
        var videoTexture = PIXI.Texture.from(this.videoURL);
        videoTexture.baseTexture.resource.source.loop = true;
        videoTexture.baseTexture.on('loaded', function() { videoTexture.baseTexture.resource.source.pause(); });
        this.videoContext = new PIXI.Sprite(videoTexture);
        this.videoContext.anchor.set(0.5, 0.5)
        this.videoContext.x = width / 2;
        this.videoContext.y = height / 2;
        this.videoContext.preload = ''
            //this.videoContext.autoplay = true;
        this.videoContext.zIndex = -1
        this.videoContext.scale.set(width / 1920, height / 1080);

        var bgTexture = PIXI.Texture.from(this.bgURL);
        this.bgContext = PIXI.Sprite.from(bgTexture);
        this.bgContext.anchor.set(0.5, 0.5)
        this.bgContext.x = width / 2;
        this.bgContext.y = height / 2;
        this.bgContext.zIndex = -2
        this.bgContext.scale.set(width / 1920, height / 1080);

        this.mainContaier = new PIXI.Container();
        this.mainContaier.sortableChildren = true;
        this.app.stage.addChild(this.mainContaier);

        this.loadingTextGraphics = new PIXI.Graphics();
        this.loadingTextGraphics.beginFill(0x000000, 0.5);
        this.loadingTextGraphics.drawRect(0, 0, width, height);
        this.loadingTextGraphics.endFill();
        this.loadingText = new PIXI.Text('Loading...',  { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center' });
        this.loadingText.anchor.set(0.5, 0.5);
        this.loadingText.x = width / 2;
        this.loadingText.y = height / 2;
        this.loadingText.zIndex = 100;
        this.loadingTextGraphics.alpha = 1
        this.loadingTextGraphics.addChild(this.loadingText);
        this.app.stage.addChild(this.loadingTextGraphics);


    }

    sudden_death_in(){
        let texture = [];
        for (let i = 0; i < 60; i++) {
            texture.push(PIXI.Texture.from(`assets/png/sudden/in_anime/ef_bplin_${String(i).padStart(3,'0')}.png`));
        }
        this.sudden_in_anime = new PIXI.AnimatedSprite(texture);
        this.sudden_in_anime.animationSpeed = 1;
        this.sudden_in_anime.loop = false;
        this.sudden_in_anime.anchor.set(0.5,0.5);
        this.sudden_in_anime.x = width / 2;
        this.sudden_in_anime.y = height / 2;
        this.sudden_in_anime.zIndex = 100;//452*552
        this.sudden_in_anime.scale.x = height / 552;
        this.sudden_in_anime.scale.y = height / 552;
        this.sudden_in_anime.alpha = 0;
        this.sudden_in_anime.onComplete = () => {
            this.sudden_in_anime.alpha = 0;
        }
        this.app.stage.addChild(this.sudden_in_anime);

        // load different background
        this.bpl_bg = PIXI.Sprite.from('assets/background/bg_nemsys_arena_sky.png');
        this.bpl_bg.anchor.set(0.5,0.4);
        this.bpl_bg.x = width / 2;
        this.bpl_bg.y = height / 2;
        this.bpl_bg.zIndex = -1;
        this.bpl_bg.scale.x = width / 1080;
        this.bpl_bg.scale.y = width / 1080;
        this.mainContaier.addChild(this.bpl_bg);

        this.bpl_screen = PIXI.Sprite.from('assets/png/sudden/waku_monitor.png');
        this.bpl_screen.anchor.set(0.5,0.5);
        this.bpl_screen.x = width / 2;
        this.bpl_screen.y = -height / 2;
        this.bpl_screen.zIndex = 5;
        this.bpl_screen.scale.x = 1;
        this.bpl_screen.scale.y = 1;
        this.mainContaier.addChild(this.bpl_screen);

        this.bpl_gamen = PIXI.Sprite.from('assets/png/sudden/waku_gamen.png');
        this.bpl_gamen.anchor.set(0.5,0.5);
        this.bpl_gamen.x = width / 2;
        this.bpl_gamen.y = -height / 2;
        this.bpl_gamen.zIndex = 2;
        this.bpl_gamen.scale.x = 1;
        this.bpl_gamen.scale.y = 1;
        this.mainContaier.addChild(this.bpl_gamen);

        let grace_gamen_texture = []
        for (let i = 0; i < 70; i++) {
            grace_gamen_texture.push(PIXI.Texture.from(`assets/png/sudden/grace_gamen/gamen_grace_${String(i).padStart(2,'0')}.png`));
        }
        this.grace_gamen = new PIXI.AnimatedSprite(grace_gamen_texture);
        this.grace_gamen.animationSpeed = 1;
        this.grace_gamen.loop = false;
        this.grace_gamen.anchor.set(0.5,0.5);
        this.grace_gamen.x = width / 2;
        this.grace_gamen.y = -height / 2;
        this.grace_gamen.zIndex = 4;
        this.grace_gamen.scale.x = 1;
        this.grace_gamen.scale.y = 1;
        this.grace_gamen.alpha = 0;
        this.grace_gamen.onComplete = () => {
            createjs.Tween.get(this.grace_gamen).to({ alpha: 0 }, 100);
        }
        this.mainContaier.addChild(this.grace_gamen);


        this.bpl_logo = PIXI.Sprite.from('assets/png/sudden/logo_bpl.png');
        this.bpl_logo.anchor.set(0.5,0.5);
        this.bpl_logo.x = width / 2;
        this.bpl_logo.y = -height / 2;
        this.bpl_logo.zIndex = 3;
        this.bpl_logo.scale.x = 0.75;
        this.bpl_logo.scale.y = 0.75;
        this.mainContaier.addChild(this.bpl_logo);

    }

    destroy() {
        if(this.bpl_bg){
            createjs.Tween.get(this.bpl_bg).to({ alpha: 0 }, 500);
        }
        createjs.Tween.get(this.bgContext).to({ alpha: 1 }, 500);

        if(this.bpl_screen){
            createjs.Tween.get(this.bpl_screen).to({y: -height/2 }, 1000, createjs.Ease.cubicOut);
        }

        if(this.bpl_gamen){
            createjs.Tween.get(this.bpl_gamen).to({ y: -height/2 }, 1000, createjs.Ease.cubicOut);
        }

        if(this.bpl_logo){
            createjs.Tween.get(this.bpl_logo).to({ y: -height/2  }, 1000, createjs.Ease.cubicOut);
        }

        this.buttonArray.forEach((i) => {
            this.app.stage.removeChild(i)
        })

        this.subContainers.forEach((i) => {
            this.app.stage.removeChild(i)
        })


        if (!(typeof this.model === 'undefined')) {
            this.model.destroy();
        }

        if (!(typeof this.model2 === 'undefined')) {
            this.model2.destroy();
        }

        if (!(typeof this.model3 === 'undefined')) {
            this.model3.destroy();
        }

        this.mainContaier.filters = [];

        this.model = undefined;
        this.model2 = undefined;
        this.model3 = undefined;
        this.twomodels = false;
        this.threemodels = false;
        this.twoModelInState = false;
    }

    resetFocus(){
        this.model.internalModel.focusController.focus(0,0,false);
        if (this.twomodels) {
            this.model2.internalModel.focusController.focus(0,0,false);
        }
        if (this.threemodels){
            this.model2.internalModel.focusController.focus(0,0,false);
            this.model3.internalModel.focusController.focus(0,0,false);
        }
    }


    onResize(event) {
        if (event === void 0) {
            event = null;
        }
        width = window.innerWidth;
        height = window.innerHeight;

        let scale = height / this.originalHeight;

        this.model.x = width / 2 + this.modelX * width / 100;
        this.model.y = height / 2 + this.modelY * height / 100;

        if(modelName === 'mion_10thkac' && this.twoModelInState){
            this.model.x += 9 * width / 100 * this.modelSize / 30;
            this.model.y -= 22 * height / 100 * this.modelSize / 30;
            this.model.scale.set(scale * (this.modelSize / 30)*0.8);
        }else{
            this.model.scale.set(scale * (this.modelSize / 30));
        }

        if(modelName === "bpl3" || modelName === "left_hexathlon"){
            this.model.scale.x = - this.model.scale.x;
        }

        if (this.twomodels) {
            this.model2.x = width / 2 + this.modelX * width / 100;
            this.model2.y = height / 2 + this.modelY * height / 100;
            this.model2.scale.set(scale * (this.modelSize / 30));
        }

        if (this.threemodels) {
            this.model2.x = width / 2 + this.modelX * width / 100;
            this.model2.y = height / 2 + this.modelY * height / 100;
            this.model2.scale.set(scale * (this.modelSize / 30));

            this.model3.x = width / 2 + this.modelX * width / 100;
            this.model3.y = height / 2 + this.modelY * height / 100;
            this.model3.scale.set(scale * (this.modelSize / 30));

            this.lrVFXmodel.x = width / 2 + this.modelX * width / 100;
            this.lrVFXmodel.y = height / 2 + this.modelY * height / 100;
            this.lrVFXmodel.scale.set(scale * (this.modelSize / 30));

            this.rasisVFXmodel.x = width / 2 + this.modelX * width / 100;
            this.rasisVFXmodel.y = height / 2 + this.modelY * height / 100;
            this.rasisVFXmodel.scale.set(scale * (this.modelSize / 30));
        }

        

        if(this.sudden_in_anime){
            this.sudden_in_anime.x = width / 2;
            this.sudden_in_anime.y = height / 2;
            this.sudden_in_anime.scale.x = height / 552;
            this.sudden_in_anime.scale.y = height / 552;
        }
        this.updateBg(1);
        this.app.renderer.resize(width, height);

        if(this.bpl_bg){
            this.bpl_bg.x = width / 2;
            this.bpl_bg.y = height / 2;
            this.bpl_bg.scale.x = width / 1080;
            this.bpl_bg.scale.y = width / 1080;
        }

        if(this.bpl_screen){
            this.bpl_screen.x = width / 2;
        }

        if(this.bpl_gamen){
            this.bpl_gamen.x = width / 2;
        }

        if(this.bpl_logo){
            this.bpl_logo.x = width / 2;
        }
    }


    async loadModel(modelName) {
        this.destroy();
        this.app.stage.sortableChildren = true;

        this.loadingTextGraphics.alpha = 1;

        if(modelName==="grace_sudden_game"){
            this.sudden_death_in()
        }

        if (this.useVideo) {
            this.mainContaier.addChild(this.videoContext);
            this.videoContext.texture.baseTexture.resource.source.play();
        } else {

            this.videoContext.texture.baseTexture.resource.source.pause();

        }

        this.mainContaier.addChild(this.bgContext);

        const path = './assets/live2d/';
        let folderPath = path + modelName + '/';
        if (modelName === 'ortlinde_akasha_0101' || modelName === 'ortlinde_akasha_0102') folderPath = path + 'ortlinde_akasha/';
        
        const mion = 'mion_xhrono';
        let jsonPathSecondModel = path + mion + '/' + mion + '_0101.model3.json'
        switch(modelName){
            case 'rasis_xhrono':
                this.twomodels = true;
                break;
            case 'mion_10thkac':
                this.twomodels = true;
                jsonPathSecondModel = path + 'rasis_10thkac/rasis_10thkac_0101.model3.json';
                break;
            case 'bpl3':
                this.threemodels = true;
                break;
            default:
                break;
        }

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
			case 'rasis_redbull5g':
			case 'rasis_energy':
            case 'tsumabuki_setu-o':
            case 'grace_sudden_game':
            case 'rezero_rem':
            case 'rezero_emilia':
            case 'haruka':
            case 'ortlinde_akasha_kac':
            case 'ortlinde_akasha_game':
            case "ortlinde_akasha_0101":
            case "ortlinde_akasha_0102":
            case "grace_mini":
				jsonPath += '.model3.json';
				break;
            case "bpl3":
                jsonPath = path + 'left_right_hexathlon_bpl/left_right_hexathlon_bpl.model3.json';
                break;
            case "right_hexathlon":
            case "left_hexathlon":
                jsonPath = path +  'left_right_hexathlon_bpl/' + modelName + '.model3.json';
                break;
            case "rasis_hexathlon":
                jsonPath = path + modelName + '_bpl/' + modelName + '.model3.json';
                break;
			default:
				jsonPath += '_0101.model3.json';
		}
        let modelSecondData;
        let modelThirdData;
        let lrEffectData, rasisEffectData;
        if(this.twomodels){
            modelSecondData = await live2d.Live2DModel.from(jsonPathSecondModel, { motionPreload: "ALL", autoInteract: false });
        }

        let modelData;

        if(this.threemodels && modelName =="bpl3"){
            lrEffectData = await live2d.Live2DModel.from(path + 'effect_hexathlon_bpl/effect_hexathlon_bpl.model3.json', {autoInteract: false});
            lrEffectData.destroy();

            rasisEffectData = await live2d.Live2DModel.from(path + 'effect_hexathlon_bpl/effect_hexathlon_bpl.model3.json', {autoInteract: false});
            rasisEffectData.destroy();
            
            modelSecondData = await live2d.Live2DModel.from(path + 'left_right_hexathlon_bpl_b/left_right_hexathlon_bpl_b.model3.json', {autoInteract: false});
            modelSecondData.destroy();

            modelData = await live2d.Live2DModel.from(path + 'left_right_hexathlon_bpl/left_right_hexathlon_bpl.model3.json', {autoInteract: false});
            modelData.destroy();

            modelThirdData = await live2d.Live2DModel.from(path + 'rasis_hexathlon_bpl/rasis_hexathlon_bpl.model3.json', {autoInteract: false});

            lrEffectData = await live2d.Live2DModel.from(path + 'effect_hexathlon_bpl/effect_hexathlon_bpl.model3.json', {autoInteract: false});
            rasisEffectData = await live2d.Live2DModel.from(path + 'effect_hexathlon_bpl/effect_hexathlon_bpl.model3.json', {autoInteract: false});
            modelSecondData = await live2d.Live2DModel.from(path + 'left_right_hexathlon_bpl_b/left_right_hexathlon_bpl_b.model3.json', {autoInteract: false});
            modelData = await live2d.Live2DModel.from(path + 'left_right_hexathlon_bpl/left_right_hexathlon_bpl.model3.json', {autoInteract: false});
        }else{
            modelData = await live2d.Live2DModel.from(jsonPath, { motionPreload: "ALL", autoInteract: false });
        }

        
        //modelData.once('load',()=>{
        this.model = modelData;
        // this.model.motion('In', 0, 2);

        // createjs.Tween.get(this.loadingTextGraphics).to({ alpha: 0 }, 100);
        let alphaFilter = new PIXI.filters.AlphaFilter()
        // alphaFilter.alpha = 0.0
        // alphaFilter.padding = 500
        // this.model.filters = [alphaFilter]
        this.loadingTextGraphics.alpha = 0;

        this.model.internalModel.updateFocus = () => {
            this.model.internalModel.coreModel.addParameterValueById("ParamEyeBallX", this.model.internalModel.focusController.x); // -1 ~ 1
            this.model.internalModel.coreModel.addParameterValueById("ParamEyeBallY", this.model.internalModel.focusController.y);
            this.model.internalModel.coreModel.addParameterValueById("ParamAngleX", this.model.internalModel.focusController.x * 30); // -30 ~ 30
            this.model.internalModel.coreModel.addParameterValueById("ParamAngleY", this.model.internalModel.focusController.y * 30);
            this.model.internalModel.coreModel.addParameterValueById("ParamAngleZ", this.model.internalModel.focusController.x * this.model.internalModel.focusController.y * -30);
            this.model.internalModel.coreModel.addParameterValueById("ParamBodyAngleX", this.model.internalModel.focusController.x * 10); // -10 ~ 10

            this.model.internalModel.coreModel.addParameterValueById("ParamEyeBallX2", this.model.internalModel.focusController.x); // -1 ~ 1
            this.model.internalModel.coreModel.addParameterValueById("ParamEyeBallY2", this.model.internalModel.focusController.y);
            this.model.internalModel.coreModel.addParameterValueById("ParamAngleX2", this.model.internalModel.focusController.x * 30); // -30 ~ 30
            this.model.internalModel.coreModel.addParameterValueById("ParamAngleY2", this.model.internalModel.focusController.y * 30);
            this.model.internalModel.coreModel.addParameterValueById("ParamAngleZ2", this.model.internalModel.focusController.x * this.model.internalModel.focusController.y * -30);
            this.model.internalModel.coreModel.addParameterValueById("ParamBodyAngleX2", this.model.internalModel.focusController.x * 10); // -10 ~ 10

            if(modelName === 'nianoa_ver6'){
                this.model.internalModel.coreModel.addParameterValueById("Param2", this.model.internalModel.focusController.x * 30); // -30 ~ 30
                this.model.internalModel.coreModel.addParameterValueById("Param3", this.model.internalModel.focusController.y * 30);
                this.model.internalModel.coreModel.addParameterValueById("Param4", this.model.internalModel.focusController.x * this.model.internalModel.focusController.y * -30);
                this.model.internalModel.coreModel.addParameterValueById("Param5", this.model.internalModel.focusController.x * 10); // -10 ~ 10
            }

        }






        if (modelName == 'kureha_9thkac') {
            this.model.alpha = 0
            // console.log(this.model);

            const texture = PIXI.Texture.from('./assets/png/cutred.webm');
            const videoSprite = new PIXI.Sprite(texture);

            videoSprite.anchor.set(0.5)
            videoSprite.x = width / 2;
            videoSprite.y = height / 2;
            // const aspectRatio = height / width;
            videoSprite.scale.x = width / 1080;
            videoSprite.scale.y = height / 1920;
            videoSprite.blendMode = PIXI.BLEND_MODES.ADD;
            videoSprite.preload = 'auto';
            videoSprite.zIndex = 50;
            videoSprite.texture.baseTexture.resource.source.currentTime = 0;
            this.mainContaier.addChild(videoSprite);
            videoSprite.texture.baseTexture.resource.source.play();

            setTimeout(() => {
                this.model.alpha = 1
                this.model.motion('In', 0, 3);
            }, 2100)

            setTimeout(() => {
                this.mainContaier.removeChild(videoSprite);
            }, this.model.internalModel.motionManager.motionGroups.In[0]._loopDurationSeconds * 1000 + 8450 + 3000);
        }else if(modelName == 'grace_10thkac'){           
            this.model.alpha = 0
            let grace_fly = PIXI.Sprite.from('./assets/png/mixx_grace_fly.png');
            grace_fly.anchor.set(0.5, 0.5);
            grace_fly.x = width / 2;
            grace_fly.y = height + 200;
            grace_fly.scale.x = 1;
            grace_fly.scale.y = 1;

            this.mainContaier.addChild(grace_fly);

            this.app.ticker.add((delta) => {
                grace_fly.y -= 40;
                if(grace_fly.y < -200){
                    // remove the sprite and ticker
                    this.mainContaier.removeChild(grace_fly);
                    this.app.ticker.remove(delta);
                }
            })

            

            let texture_array = [
                PIXI.Texture.from('./assets/png/g_cutin/g_cutin_00.png'),
                PIXI.Texture.from('./assets/png/g_cutin/g_cutin_01.png'),
                PIXI.Texture.from('./assets/png/g_cutin/g_cutin_02.png'),
                PIXI.Texture.from('./assets/png/g_cutin/g_cutin_03.png'),
                PIXI.Texture.from('./assets/png/g_cutin/g_cutin_04.png'),
                PIXI.Texture.from('./assets/png/g_cutin/g_cutin_05.png'),
                PIXI.Texture.from('./assets/png/g_cutin/g_cutin_06.png'),
                PIXI.Texture.from('./assets/png/g_cutin/g_cutin_07.png'),
                PIXI.Texture.from('./assets/png/g_cutin/g_cutin_08.png'),
            ];

            let sprite_idx = 0;

            let grace_cutin = new PIXI.Sprite(texture_array[sprite_idx]);
            grace_cutin.anchor.set(0.5, 0.5);
            grace_cutin.x = width / 2;
            grace_cutin.y = height / 2;
            grace_cutin.scale.x = 1;
            grace_cutin.scale.y = 1;
            grace_cutin.alpha = 0;

            let glow = PIXI.Sprite.from('./assets/png/g_cutin/glow_pink.png');
            glow.anchor.set(0.5, 0.5);
            glow.x = width / 2 - 500;
            glow.y = height / 2 + 101;
            glow.alpha = 0;
            

            this.mainContaier.addChild(glow);
            glow.scale.x = width / 302;
            glow.scale.y = 1;

            let glow2 = PIXI.Sprite.from('./assets/png/g_cutin/glow_pink.png');
            glow2.anchor.set(0.5, 0.5);
            glow2.x = width / 2 + 500;
            glow2.y = height / 2 - 101;
            glow2.alpha = 0;
            

            this.mainContaier.addChild(glow2);
            glow2.scale.x = -width / 302;
            glow2.scale.y = 1;

            setTimeout(() => {
                this.mainContaier.addChild(grace_cutin);
                createjs.Tween.get(grace_cutin).to({ alpha: 1 }, 250);
                createjs.Tween.get(glow).to({ alpha: 1 , x: width / 2}, 250);
                createjs.Tween.get(glow2).to({ alpha: 1 , x: width / 2}, 250);
            }, 1000);

            setTimeout(() => {
                let k = setInterval(() => {
                    grace_cutin.texture = texture_array[sprite_idx];
                    sprite_idx++;
    
                    if (sprite_idx == texture_array.length) {
                        clearInterval(k);
                        setTimeout(() => {
                            createjs.Tween.get(grace_cutin).to({ alpha: 0 }, 500);
                            createjs.Tween.get(glow).to({ alpha: 0 }, 500);
                            createjs.Tween.get(glow2).to({ alpha: 0 }, 500);
                        }, 250)
                        setTimeout(() => {
                            this.mainContaier.removeChild(grace_cutin);
                            this.mainContaier.removeChild(glow);
                            this.mainContaier.removeChild(glow2);
                        }, 800);
                    }
                }, 16);
            }, 1500)

            setTimeout(() => {
                this.model.motion('In', 0, 2);
                this.model.alpha = 1
            }, 2000);

        } else if(modelName == "grace_sudden_game"){
            this.model.alpha = 0
            
            createjs.Tween.get(this.bpl_bg).to({ alpha: 1 }, 500);
            createjs.Tween.get(this.bgContext).to({ alpha: 0 }, 500);
            createjs.Tween.get(this.bpl_screen).to({y: height/5*2 }, 1000, createjs.Ease.cubicOut);
            createjs.Tween.get(this.bpl_gamen).to({ y: height/5*2 }, 1000, createjs.Ease.cubicOut);
            createjs.Tween.get(this.bpl_logo).to({ y: height/5*2  }, 1000, createjs.Ease.cubicOut);
            createjs.Tween.get(this.grace_gamen).to({ y: height/5*2  }, 1000, createjs.Ease.cubicOut);

            setTimeout(() => {
                this.grace_gamen.gotoAndPlay(0);
                this.grace_gamen.alpha = 1;
            }, 1000);

            setTimeout(() => {
                this.model.motion('In', 0, 2);
                this.model.alpha = 1
                this.sudden_in_anime.gotoAndPlay(0)
                this.sudden_in_anime.alpha = 1;
            }, 2500);
            
            this.model.internalModel.motionManager.groups.idle = 'Idle1'
        } else if(modelName == "ortlinde_akasha_kac"){
            this.model.motion('In1', 0, 2);
            createjs.Tween.get(alphaFilter).to({ alpha: 1 }, 1500);
        }else if(modelName == "bpl3"){
            this.model.motion('In1b', 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle1b'
        }else {
            this.model.motion('In', 0, 2);
        }
        this.model.anchor.set(0.5, 0.5);
        this.model.zIndex = 20;
        this.app.stage.addChild(this.model);
        this.originalHeight = this.model.height;
        //this.onResize(1);
        //})

        //modelSecondData.once('load',()=>{
        if (this.twomodels) {
            this.model2 = modelSecondData;
            this.model2.anchor.set(0.5, 0.5);
            this.model2.zIndex = 21;
            if(modelName !== 'mion_10thkac'){
                this.model2.motion('In', 0, 2);
            }else{
                this.model2.alpha = 0
            }
            

            this.app.stage.addChild(this.model2);

        }


        if (this.threemodels) {
            this.model2 = modelSecondData;
            this.model2.anchor.set(0.5, 0.5);
            this.model2.zIndex = 21;
            this.model2.motion('In1a', 0, 3);
            this.model2.internalModel.motionManager.groups.idle = 'Idle1a'
            this.app.stage.addChild(this.model2);

            this.model3 = modelThirdData;
            this.model3.anchor.set(0.5, 0.5);
            this.model3.zIndex = 18;
            this.model3.motion('In1', 0, 3);
            this.model3.internalModel.motionManager.groups.idle = 'Idle1'
            this.app.stage.addChild(this.model3);

            this.lrVFXmodel = lrEffectData;
            this.lrVFXmodel.anchor.set(0.5, 0.5);
            this.lrVFXmodel.zIndex = 22;
            this.lrVFXmodel.motion('In1', 0, 2);
            this.app.stage.addChild(this.lrVFXmodel);

            this.rasisVFXmodel = rasisEffectData;
            this.rasisVFXmodel.anchor.set(0.5, 0.5);
            this.rasisVFXmodel.zIndex = 19;
            this.rasisVFXmodel.motion('In2', 0, 3);
            this.app.stage.addChild(this.rasisVFXmodel);

        }

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
            case 'grace_sudden_game':
                this.generate_button_sudden()
                break
            case 'ortlinde_akasha_kac':
            case 'ortlinde_akasha_game':
                this.generate_button_ortlinde_akasha()
                break
            case 'bpl3':
                this.generate_button_bpl3()
                break;
            case 'maxima_vm':
                this.generate_button_maxima();
            default:
                this.generate_button_normal();
                break
        }

        this.onResize(2);
        this.updateBg(2);


        document.getElementById('live2d').appendChild(this.app.view);
        // gui.show();
    }


    generate_button_bpl3(){
        let note_button = new PIXI.Graphics();
        note_button.beginFill(0xffffff);
        note_button.drawCircle(0, 0, 30);
        note_button.endFill();
        let note_text = new PIXI.Text('NOTES', { fontFamily: 'Arial', fontSize: 15, fill: 0x1010ff, align: 'center' });
        note_text.anchor.set(0.5, 0.5);
        note_button.addChild(note_text);
        note_button.position.set(35, 35);
        note_button.on('pointerup', () => {
            this.model.motion("In1b", 0, 3)
            this.model2.motion("In1a", 0, 3)
            this.model3.motion("In1", 0, 3)
            this.lrVFXmodel.motion('In1', 0, 3);
            this.rasisVFXmodel.motion('In2', 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle1b'
            this.model3.internalModel.motionManager.groups.idle = 'Idle1'

            this.model2.internalModel.motionManager.groups.idle = 'Idle1a'

            this.model3.zIndex = 18;
            this.rasisVFXmodel.zIndex = 19;
        })
        note_button.zIndex = 5;
        note_button.interactive = true;
        note_button.buttonMode = true;
        this.buttonArray.push(note_button)
        this.app.stage.addChild(note_button);


        let onehand_button = new PIXI.Graphics();
        onehand_button.beginFill(0xffffff);
        onehand_button.drawCircle(0, 0, 30);
        onehand_button.endFill();
        let onehand_text = new PIXI.Text('ONEHAND', { fontFamily: 'Arial', fontSize: 12, fill: 0x1010ff, align: 'center' });
        onehand_text.anchor.set(0.5, 0.5);
        onehand_button.addChild(onehand_text);
        onehand_button.position.set(100, 35);
        onehand_button.on('pointerup', () => {
            this.model.motion("Change1b", 0, 3)
            this.model2.motion("Change1a", 0, 3)
            this.model3.motion("Change1", 0, 3)
            this.model.internalModel.motionManager.groups.idle = 'Idle'
            this.model3.internalModel.motionManager.groups.idle = 'Idle'

            this.model2.internalModel.motionManager.groups.idle = 'Idle2'
            this.model3.zIndex = 18;
            this.rasisVFXmodel.zIndex = 19;
        })
        onehand_button.zIndex = 5;
        onehand_button.interactive = true;
        onehand_button.buttonMode = true;
        this.buttonArray.push(onehand_button)
        this.app.stage.addChild(onehand_button);

        let tsumami_button = new PIXI.Graphics();
        tsumami_button.beginFill(0xffffff);
        tsumami_button.drawCircle(0, 0, 30);
        tsumami_button.endFill();
        let tsumami_text = new PIXI.Text('TSUMAMI', { fontFamily: 'Arial', fontSize: 12, fill: 0x1010ff, align: 'center' });
        tsumami_text.anchor.set(0.5, 0.5);
        tsumami_button.addChild(tsumami_text);
        tsumami_button.position.set(165, 35);
        tsumami_button.on('pointerup', () => {
            this.model.motion("Change2b", 0, 3)
            this.model2.motion("Change2a", 0, 3)
            //this.model3.motion("Change1", 0, 3)
            this.model.internalModel.motionManager.groups.idle = 'Idle3b'
            this.model2.internalModel.motionManager.groups.idle = 'Idle3a'
            this.model3.internalModel.motionManager.groups.idle = 'Idle'

            this.model3.zIndex = 18;
            this.rasisVFXmodel.zIndex = 19;
        })
        tsumami_button.zIndex = 5;
        tsumami_button.interactive = true;
        tsumami_button.buttonMode = true;
        this.buttonArray.push(tsumami_button)
        this.app.stage.addChild(tsumami_button);

        let handtrip_button = new PIXI.Graphics();
        handtrip_button.beginFill(0xffffff);
        handtrip_button.drawCircle(0, 0, 30);
        handtrip_button.endFill();
        let handtrip_text = new PIXI.Text('HANDTRIP', { fontFamily: 'Arial', fontSize: 12, fill: 0x1010ff, align: 'center' });
        handtrip_text.anchor.set(0.5, 0.5);
        handtrip_button.addChild(handtrip_text);
        handtrip_button.position.set(230, 35);
        handtrip_button.on('pointerup', () => {
            this.model.motion("Change3b", 0, 3)
            this.model2.motion("Change3a", 0, 3)
            //this.model3.motion("Change1", 0, 3)
            this.model.internalModel.motionManager.groups.idle = 'Idle4'
            this.model2.internalModel.motionManager.groups.idle = 'Idle'
            this.model3.internalModel.motionManager.groups.idle = 'Idle'

            this.model3.zIndex = 18;
            this.rasisVFXmodel.zIndex = 19;
        })
        handtrip_button.zIndex = 5;
        handtrip_button.interactive = true;
        handtrip_button.buttonMode = true;
        this.buttonArray.push(handtrip_button)
        this.app.stage.addChild(handtrip_button);

        let tricky_button = new PIXI.Graphics();
        tricky_button.beginFill(0xffffff);
        tricky_button.drawCircle(0, 0, 30);
        tricky_button.endFill();
        let tricky_text = new PIXI.Text('TRICKY', { fontFamily: 'Arial', fontSize: 15, fill: 0x1010ff, align: 'center' });
        tricky_text.anchor.set(0.5, 0.5);
        tricky_button.addChild(tricky_text);
        tricky_button.position.set(295, 35);
        tricky_button.on('pointerup', () => {
            this.model.motion("Change4", 0, 3)
            //this.model2.motion("Change3a", 0, 3)
            this.model3.motion("Change4", 0, 3)
            this.model.internalModel.motionManager.groups.idle = 'Idle'
            this.model2.internalModel.motionManager.groups.idle = 'Idle'
            this.model3.internalModel.motionManager.groups.idle = 'Idle5'

            this.model3.zIndex = 18;
            this.rasisVFXmodel.zIndex = 19;
        })
        tricky_button.zIndex = 5;
        tricky_button.interactive = true;
        tricky_button.buttonMode = true;
        this.buttonArray.push(tricky_button)
        this.app.stage.addChild(tricky_button);

        let peak_button = new PIXI.Graphics();
        peak_button.beginFill(0xffffff);
        peak_button.drawCircle(0, 0, 30);
        peak_button.endFill();
        let peak_text = new PIXI.Text('PEAK', { fontFamily: 'Arial', fontSize: 18, fill: 0x1010ff, align: 'center' });
        peak_text.anchor.set(0.5, 0.5);
        peak_button.addChild(peak_text);
        peak_button.position.set(360, 35);
        peak_button.on('pointerup', () => {
            this.model.motion("Change5b", 0, 3)
            this.model2.motion("Change5a", 0, 3)
            this.model3.motion("Change5", 0, 3)
            this.model.internalModel.motionManager.groups.idle = 'Idle6b'
            this.model2.internalModel.motionManager.groups.idle = 'Idle6a'
            this.model3.internalModel.motionManager.groups.idle = 'Idle6'

            this.model3.zIndex = 23;
            this.rasisVFXmodel.zIndex = 24;
        })
        peak_button.zIndex = 5;
        peak_button.interactive = true;
        peak_button.buttonMode = true;
        this.buttonArray.push(peak_button)
        this.app.stage.addChild(peak_button);

        let loop_button = new PIXI.Graphics();
        loop_button.beginFill(0xffffff);
        loop_button.drawCircle(0, 0, 30);
        loop_button.endFill();
        let loop_text = new PIXI.Text('LOOP', { fontFamily: 'Arial', fontSize: 18, fill: 0x1010ff, align: 'center' });
        loop_text.anchor.set(0.5, 0.5);
        loop_button.addChild(loop_text);
        loop_button.position.set(425, 35);
        loop_button.on('pointerup', () => {
            this.model.motion("Change6b", 0, 3)
            this.model2.motion("Change6a", 0, 3)
            this.model3.motion("Change6", 0, 3)
            this.model.internalModel.motionManager.groups.idle = 'Idle7b'
            this.model2.internalModel.motionManager.groups.idle = 'Idle7a'
            this.model3.internalModel.motionManager.groups.idle = 'Idle7'

            this.model3.zIndex = 23;
            this.rasisVFXmodel.zIndex = 24;
        })
        loop_button.zIndex = 5;
        loop_button.interactive = true;
        loop_button.buttonMode = true;
        this.buttonArray.push(loop_button)
        this.app.stage.addChild(loop_button);

        let last_button = new PIXI.Graphics();
        last_button.beginFill(0xffffff);
        last_button.drawCircle(0, 0, 30);
        last_button.endFill();
        let last_text = new PIXI.Text('LAST', { fontFamily: 'Arial', fontSize: 18, fill: 0x1010ff, align: 'center' });
        last_text.anchor.set(0.5, 0.5);
        last_button.addChild(last_text);
        last_button.position.set(490, 35);
        last_button.on('pointerup', () => {
            this.model.motion("Last1b", 0, 3)
            this.model2.motion("Last1a", 0, 3)
            this.model3.motion("Last1", 0, 3)
            this.model.internalModel.motionManager.groups.idle = 'Idle'
            this.model2.internalModel.motionManager.groups.idle = 'Idle'
            this.model3.internalModel.motionManager.groups.idle = 'Idle'
            this.lrVFXmodel.motion("Last1", 0, 3)
            this.rasisVFXmodel.motion("Last2", 0, 3)
            this.model3.zIndex = 23;
            this.rasisVFXmodel.zIndex = 24;

            setTimeout(() => {
                this.rasisVFXmodel.zIndex = 19;
            },7675)
        })
        last_button.zIndex = 5;
        last_button.interactive = true;
        last_button.buttonMode = true;
        this.buttonArray.push(last_button)
        this.app.stage.addChild(last_button);
    }

    generate_button_sudden() {
        // generate left hexa
        // let left_hexa = new SuddenDeathLeftHexagon()
        let left_hexa_container_front = left_hexa.front;
        let left_hexa_container_back = left_hexa.back;
        this.app.stage.addChild(left_hexa_container_front);
        this.app.stage.addChild(left_hexa_container_back);

        left_hexa_container_front.alpha = 1
        left_hexa_container_back.alpha = 1

        // left_hexa.update()
        left_hexa.rotate(0.1)
        // left_hexa.t3()


        // generate right hexa
        let right_hexa_container_front = right_hexa.front;
        let right_hexa_container_back = right_hexa.back;
        this.app.stage.addChild(right_hexa_container_front);
        this.app.stage.addChild(right_hexa_container_back);

        right_hexa_container_front.alpha = 1
        right_hexa_container_back.alpha = 1

        // right_hexa.update(width/4)
        right_hexa.rotate(-0.1)
        // right_hexa.t3()


        // generate left screen effect
        let left_screen_effect = PIXI.Sprite.from('assets/png/sudden/left.png')
        left_screen_effect.anchor.set(0, 0.5)
        left_screen_effect.x = 0
        left_screen_effect.y = height/2
        left_screen_effect.scale.x = width / 304
        left_screen_effect.scale.y = height/12
        left_screen_effect.zIndex = 100
        left_screen_effect.blendMode = PIXI.BLEND_MODES.ADD
        left_screen_effect.alpha = 0

        this.app.stage.addChild(left_screen_effect)

        // generate right screen effect
        let right_screen_effect = PIXI.Sprite.from('assets/png/sudden/right.png')
        right_screen_effect.anchor.set(0, 0.5)
        right_screen_effect.x = width
        right_screen_effect.y = height/2
        right_screen_effect.scale.x = -width / 304
        right_screen_effect.scale.y = height/12
        right_screen_effect.zIndex = 100
        right_screen_effect.blendMode = PIXI.BLEND_MODES.ADD
        right_screen_effect.alpha = 0

        this.app.stage.addChild(right_screen_effect)


        // generate effects
        let zoomEffect = new PIXI.filters.ZoomBlurFilter()
        zoomEffect.center.x = width / 2
        zoomEffect.center.y = height / 2
        zoomEffect.innerRadius = 20
        zoomEffect.strength = 0
        zoomEffect.enabled = false

        let rgbSplitEffect = new PIXI.filters.RGBSplitFilter()
        rgbSplitEffect.red.x = 0 // -5
        rgbSplitEffect.red.y = 0
        rgbSplitEffect.green.x = 0
        rgbSplitEffect.green.y = 0
        rgbSplitEffect.blue.x = 0 // 5
        rgbSplitEffect.blue.y = 0
        rgbSplitEffect.enabled = false

        let crtEffect = new PIXI.filters.CRTFilter()
        crtEffect.lineWidth = 0
        crtEffect.vignettingAlpha = 0
        crtEffect.enabled = false

        let colorAdjustEffect = new PIXI.filters.AdjustmentFilter()
        colorAdjustEffect.red = 1
        colorAdjustEffect.brightness = 1
        colorAdjustEffect.enabled = false

        let glitchEffect = new PIXI.filters.GlitchFilter() // start with zero effect
        glitchEffect.offset = 0
        glitchEffect.red.x = 0
        glitchEffect.red.y = 0
        glitchEffect.green.x = 0
        glitchEffect.green.y = 0
        glitchEffect.blue.x = 0
        glitchEffect.blue.y = 0
        glitchEffect.slices = 10
        glitchEffect.fillMode = 2
        glitchEffect.enabled = false



        this.mainContaier.filters = [rgbSplitEffect, crtEffect, colorAdjustEffect, glitchEffect,zoomEffect]


        // button generate
        let EG1 = new PIXI.Graphics();
        EG1.beginFill(0xffffff);
        EG1.drawCircle(0, 0, 30);
        EG1.endFill();
        let EG1Text = new PIXI.Text('暴', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        EG1Text.anchor.set(0.5, 0.5);
        EG1.addChild(EG1Text);
        EG1.position.set(35, 35);
        EG1.on('pointerup', () => {
            let e = PIXI.Sprite.from('./assets/png/sudden/fb_lv1_bou.png');
            e.anchor.set(0.5, 0.375);
            e.x = width / 2;
            e.y = height / 3;
            e.scale.x = 1;
            e.scale.y = 1;
            e.alpha = 0;
            e.zIndex = 50;
            this.app.stage.addChild(e);
            console.log(e)

            let level = PIXI.Sprite.from('./assets/png/sudden/f_lv1_bou.png');
            level.anchor.set(0.5, 0.5);
            level.x = width * 0.65;
            level.y = height * 0.3;
            level.scale.x = 1;
            level.scale.y = 1;
            // level.rotation = -0.13;
            level.alpha = 0;
            level.zIndex = 50;
            this.app.stage.addChild(level);

            let overlay = PIXI.Sprite.from('./assets/png/sudden/overlay/1.png');
            overlay.anchor.set(0.5, 0.5);
            overlay.x = width / 2;
            overlay.y = height / 8 * 7;
            overlay.scale.x = 1;
            overlay.scale.y = 0.25;
            overlay.alpha = 0;
            overlay.blendMode = PIXI.BLEND_MODES.MULTIPLY;
            this.app.stage.addChild(overlay);

            // circle using four sprite using same texture
            let texture = PIXI.Texture.from('./assets/png/sudden/circle/1.png');
            let circle1 = new PIXI.Sprite(texture);
            circle1.anchor.set(1, 1);
            circle1.x = width / 2;
            circle1.y = height / 2;
            circle1.scale.x = 0.75;
            circle1.scale.y = 0.75;
            circle1.alpha = 0;
            circle1.zIndex = 6;
            this.app.stage.addChild(circle1);

            let circle2 = new PIXI.Sprite(texture);
            circle2.anchor.set(1, 1);
            circle2.x = width / 2;
            circle2.y = height / 2;
            circle2.scale.x = -0.75;
            circle2.scale.y = 0.75;
            circle2.alpha = 0;
            circle2.zIndex = 6;
            this.app.stage.addChild(circle2);

            let circle3 = new PIXI.Sprite(texture);
            circle3.anchor.set(1, 1);
            circle3.x = width / 2;
            circle3.y = height / 2;
            circle3.scale.x = 0.75;
            circle3.scale.y = -0.75;
            circle3.alpha = 0;
            circle3.zIndex = 6;
            this.app.stage.addChild(circle3);

            let circle4 = new PIXI.Sprite(texture);
            circle4.anchor.set(1, 1);
            circle4.x = width / 2;
            circle4.y = height / 2;
            circle4.scale.x = -0.75;
            circle4.scale.y = -0.75;
            circle4.alpha = 0;
            circle4.zIndex = 6;
            this.app.stage.addChild(circle4);



            this.model.motion("EG1_in", 0, 3);
            
            
            this.model.internalModel.motionManager.groups.idle = 'EG1'
            
            zoomEffect.enabled = true
            rgbSplitEffect.enabled = true
            colorAdjustEffect.enabled = true

            left_hexa.t1()
            right_hexa.t1()

            setTimeout(() => {
                createjs.Tween.get(e).to({ alpha: 1}, 100).to({ alpha: 0 }, 400);
                createjs.Tween.get(overlay).to({ alpha: 1}, 200);
                createjs.Tween.get(level).to({ alpha: 1}, 200);
                createjs.Tween.get(zoomEffect).to({ strength: 0.07}, 127)
                createjs.Tween.get(rgbSplitEffect.red).to({ x: -5}, 127)
                createjs.Tween.get(rgbSplitEffect.blue).to({ x: 5}, 127)
                createjs.Tween.get(colorAdjustEffect).to({ brightness: 0.75}, 127)
                createjs.Tween.get(left_screen_effect).to({ alpha: 1}, 127)
                createjs.Tween.get(right_screen_effect).to({ alpha: 1}, 127)
                createjs.Tween.get(circle1).to({ alpha: 1}, 127)
                createjs.Tween.get(circle2).to({ alpha: 1}, 127)
                createjs.Tween.get(circle3).to({ alpha: 1}, 127)
                createjs.Tween.get(circle4).to({ alpha: 1}, 127)

                createjs.Tween.get(left_hexa_container_front).to({x: width/4,alpha:1}, 127, createjs.Ease.quintOut);
                createjs.Tween.get(left_hexa_container_front.scale).to({x:1,y:1}, 127, createjs.Ease.linear);
                createjs.Tween.get(right_hexa_container_front).to({x: width/4*3,alpha:1}, 127, createjs.Ease.quintOut);
                createjs.Tween.get(right_hexa_container_front.scale).to({x:1,y:1}, 127, createjs.Ease.linear);
                createjs.Tween.get(e.scale).to({ x: 3, y: 3 }, 500);
                exceed_sfx.play()
            }, 1200);


            setTimeout(() => {
                this.model.motion("EG1_out", 0, 3);
                createjs.Tween.get(overlay).to({ alpha: 0}, 500);
                createjs.Tween.get(level).to({ alpha: 0}, 500);
                createjs.Tween.get(zoomEffect).to({ strength: 0}, 800)
                createjs.Tween.get(rgbSplitEffect.red).to({ x: 0}, 800)
                createjs.Tween.get(rgbSplitEffect.blue).to({ x: 0}, 800)
                createjs.Tween.get(left_screen_effect).to({ alpha: 0}, 800)
                createjs.Tween.get(right_screen_effect).to({ alpha: 0}, 800)
                createjs.Tween.get(colorAdjustEffect).to({ brightness: 1}, 800)
                createjs.Tween.get(circle1).to({ alpha: 0}, 800)
                createjs.Tween.get(circle2).to({ alpha: 0}, 800)
                createjs.Tween.get(circle3).to({ alpha: 0}, 800)
                createjs.Tween.get(circle4).to({ alpha: 0}, 800)

                createjs.Tween.get(left_hexa_container_front).to({x:-width,alpha:0}, 800, createjs.Ease.cubicIn);
                createjs.Tween.get(left_hexa_container_front.scale).to({x:2,y:2}, 500, createjs.Ease.cubicIn);
                createjs.Tween.get(right_hexa_container_front).to({x:width*2,alpha:0}, 800, createjs.Ease.cubicIn);
                createjs.Tween.get(right_hexa_container_front.scale).to({x:2,y:2}, 500, createjs.Ease.cubicIn);
                this.model.internalModel.motionManager.groups.idle = 'Idle2'
                this.app.stage.removeChild(e);
            }, 5000)

            setTimeout(() => {
                this.app.stage.removeChild(overlay);
                this.app.stage.removeChild(level);
                createjs.Tween.removeAllTweens();
                zoomEffect.enabled = false
                rgbSplitEffect.enabled = false
                colorAdjustEffect.enabled = false
            }, 5800)
        })
        EG1.zIndex = 5;
        EG1.interactive = true;
        EG1.buttonMode = true;
        this.buttonArray.push(EG1)
        this.app.stage.addChild(EG1);

        let EG2 = new PIXI.Graphics();
        EG2.beginFill(0xffffff);
        EG2.drawCircle(0, 0, 30);
        EG2.endFill();
        let EG2Text = new PIXI.Text('龍', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        EG2Text.anchor.set(0.5, 0.5);
        EG2.addChild(EG2Text);
        EG2.position.set(100, 35);
        EG2.on('pointerup', () => {
            let e = PIXI.Sprite.from('./assets/png/sudden/fb_lv2_ryu.png');
            e.anchor.set(0.5, 0.375);
            e.x = width / 2;
            e.y = height / 3;
            e.scale.x = 1;
            e.scale.y = 1;
            e.alpha = 0;
            e.zIndex = 50;
            this.app.stage.addChild(e);

            let level = PIXI.Sprite.from('./assets/png/sudden/f_lv2_ryu.png');
            level.anchor.set(0.5, 0.5);
            level.x = width * 0.7;
            level.y = height * 0.4;
            level.scale.x = 1;
            level.scale.y = 1;
            level.rotation = -0.1;
            level.alpha = 0;
            level.zIndex = 50;
            this.app.stage.addChild(level);

            let overlay = PIXI.Sprite.from('./assets/png/sudden/overlay/2.png');
            overlay.anchor.set(0.5, 0.5);
            overlay.x = width / 2;
            overlay.y = height / 8 * 7;
            overlay.scale.x = 1;
            overlay.scale.y = 0.25;
            overlay.alpha = 0;
            overlay.blendMode = PIXI.BLEND_MODES.MULTIPLY;
            this.app.stage.addChild(overlay);

            // circle using four sprite using same texture
            let texture = PIXI.Texture.from('./assets/png/sudden/circle/2.png');
            let circle1 = new PIXI.Sprite(texture);
            circle1.anchor.set(1, 1);
            circle1.x = width / 2;
            circle1.y = height / 2;
            circle1.scale.x = 0.75;
            circle1.scale.y = 0.75;
            circle1.alpha = 0;
            circle1.zIndex = 6;
            this.app.stage.addChild(circle1);

            let circle2 = new PIXI.Sprite(texture);
            circle2.anchor.set(1, 1);
            circle2.x = width / 2;
            circle2.y = height / 2;
            circle2.scale.x = -0.75;
            circle2.scale.y = 0.75;
            circle2.alpha = 0;
            circle2.zIndex = 6;
            this.app.stage.addChild(circle2);

            let circle3 = new PIXI.Sprite(texture);
            circle3.anchor.set(1, 1);
            circle3.x = width / 2;
            circle3.y = height / 2;
            circle3.scale.x = 0.75;
            circle3.scale.y = -0.75;
            circle3.alpha = 0;
            circle3.zIndex = 6;
            this.app.stage.addChild(circle3);

            let circle4 = new PIXI.Sprite(texture);
            circle4.anchor.set(1, 1);
            circle4.x = width / 2;
            circle4.y = height / 2;
            circle4.scale.x = -0.75;
            circle4.scale.y = -0.75;
            circle4.alpha = 0;
            circle4.zIndex = 6;
            this.app.stage.addChild(circle4);


            this.model.motion("EG2_in", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'EG2'

            zoomEffect.enabled = true
            rgbSplitEffect.enabled = true
            colorAdjustEffect.enabled = true

            left_hexa.t2()
            right_hexa.t2()

            setTimeout(() => {
                createjs.Tween.get(e).to({ alpha: 1}, 100).to({ alpha: 0 }, 400);
                createjs.Tween.get(overlay).to({ alpha: 1}, 200);
                createjs.Tween.get(level).to({ alpha: 1}, 200);
                createjs.Tween.get(zoomEffect).to({ strength: 0.07}, 127)
                createjs.Tween.get(rgbSplitEffect.red).to({ x: -5}, 127)
                createjs.Tween.get(rgbSplitEffect.blue).to({ x: 5}, 127)
                createjs.Tween.get(colorAdjustEffect).to({ brightness: 0.75}, 127)
                createjs.Tween.get(left_screen_effect).to({ alpha: 1}, 127)
                createjs.Tween.get(right_screen_effect).to({ alpha: 1}, 127)
                createjs.Tween.get(circle1).to({ alpha: 1}, 127)
                createjs.Tween.get(circle2).to({ alpha: 1}, 127)
                createjs.Tween.get(circle3).to({ alpha: 1}, 127)
                createjs.Tween.get(circle4).to({ alpha: 1}, 127)

                createjs.Tween.get(left_hexa_container_front).to({x: width/4,alpha:1}, 127, createjs.Ease.quintOut);
                createjs.Tween.get(left_hexa_container_front.scale).to({x:1,y:1}, 127, createjs.Ease.linear);
                createjs.Tween.get(right_hexa_container_front).to({x: width/4*3,alpha:1}, 127, createjs.Ease.quintOut);
                createjs.Tween.get(right_hexa_container_front.scale).to({x:1,y:1}, 127, createjs.Ease.linear);

                createjs.Tween.get(e.scale).to({ x: 3, y: 3 }, 500);
                exceed_sfx.play()
            }, 1000);

            setTimeout(() => {
                this.model.motion("EG2_out", 0, 3);
                createjs.Tween.get(overlay).to({ alpha: 0}, 500);
                createjs.Tween.get(level).to({ alpha: 0}, 500);
                createjs.Tween.get(zoomEffect).to({ strength: 0}, 800)
                createjs.Tween.get(rgbSplitEffect.red).to({ x: 0}, 800)
                createjs.Tween.get(rgbSplitEffect.blue).to({ x: 0}, 800)
                createjs.Tween.get(colorAdjustEffect).to({ brightness: 1}, 800)
                createjs.Tween.get(left_screen_effect).to({ alpha: 0}, 800)
                createjs.Tween.get(right_screen_effect).to({ alpha: 0}, 800)

                createjs.Tween.get(left_hexa_container_front).to({x:-width,alpha:0}, 800, createjs.Ease.cubicIn);
                createjs.Tween.get(left_hexa_container_front.scale).to({x:2,y:2}, 500, createjs.Ease.cubicIn);
                createjs.Tween.get(right_hexa_container_front).to({x:width*2,alpha:0}, 800, createjs.Ease.cubicIn);
                createjs.Tween.get(right_hexa_container_front.scale).to({x:2,y:2}, 500, createjs.Ease.cubicIn);

                createjs.Tween.get(circle1).to({ alpha: 0}, 800)
                createjs.Tween.get(circle2).to({ alpha: 0}, 800)
                createjs.Tween.get(circle3).to({ alpha: 0}, 800)
                createjs.Tween.get(circle4).to({ alpha: 0}, 800)
                this.model.internalModel.motionManager.groups.idle = 'Idle3'
            }, 5000)

            setTimeout(() => {
                this.app.stage.removeChild(overlay);
                this.app.stage.removeChild(level);
                createjs.Tween.removeAllTweens();
                zoomEffect.enabled = false
                rgbSplitEffect.enabled = false
            }, 5800)
        })
        EG2.zIndex = 5;
        EG2.interactive = true;
        EG2.buttonMode = true;
        this.buttonArray.push(EG2)
        this.app.stage.addChild(EG2);

        let EG3 = new PIXI.Graphics();
        EG3.beginFill(0xffffff);
        EG3.drawCircle(0, 0, 30);
        EG3.endFill();
        let EG3Text = new PIXI.Text('天 神', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        EG3Text.anchor.set(0.5, 0.5);
        EG3.addChild(EG3Text);
        EG3.position.set(165, 35);
        EG3.on('pointerup', () => {
            let e = PIXI.Sprite.from('./assets/png/sudden/fb_lv3_ten.png');
            e.anchor.set(0.5, 0.375);
            e.x = width / 2;
            e.y = height / 3;
            e.scale.x = 1;
            e.scale.y = 1;
            e.alpha = 0;
            e.zIndex = 50;
            this.app.stage.addChild(e);

            let laser = PIXI.Sprite.from('./assets/png/sudden/laser_ball.png');
            laser.anchor.set(0.5, 0.5);
            laser.x = width / 2;
            laser.y = height / 2;
            laser.scale.x = height / 652 * 2;
            laser.scale.y = height / 652 * 2;
            laser.alpha = 0;
            this.mainContaier.addChild(laser);
            this.app.ticker.speed = 0.25
            this.app.ticker.add((delta) => {
                laser.rotation += Math.random() * 10 + 60;
            })

            this.model.motion("EG3_in", 0, 3);

            let level3 = PIXI.Sprite.from('./assets/png/sudden/f_lv3_ten.png');
            level3.anchor.set(0.5, 0.5);
            level3.x = width * 0.766;
            level3.y = height / 2;
            level3.scale.x = 1;
            level3.scale.y = 1;
            // level3.rotation = -0.13;
            level3.alpha = 0;
            level3.zIndex = 50;
            this.app.stage.addChild(level3);

            

            this.model.internalModel.motionManager.groups.idle = 'EG3'
            var ee1 = [];
            var ee2 = [];
            setTimeout(() => {
                // this.app.ticker.speed = 1
                for (var i = 0; i < 5; i++) {
                    var e = PIXI.Sprite.from('./assets/png/5_ne_eff_06_i_feb.png');
                    e.anchor.set(1, 0.5);
                    e.x = this.model.x;
                    e.y = this.model.y - 200;
                    e.scale.x = 0.2;
                    e.scale.y = 0.2;
                    e.alpha = 0.2
                    ee1.push(e);
                    this.mainContaier.addChild(e);
                }

                for (var i = 0; i < 5; i++) {
                    var e = PIXI.Sprite.from('./assets/png/5_ne_eff_06_i_feb.png');
                    e.anchor.set(1, 0.5);
                    e.x = this.model.x;
                    e.y = this.model.y - 200;
                    e.scale.x = -0.2;
                    e.scale.y = 0.2;
                    e.alpha = 0.2
                    ee2.push(e);
                    this.mainContaier.addChild(e);
                }
                // this.app.ticker.add((d) => {
                let k = 0;
                ee1.forEach((y) => {
                    let temp = createjs.Tween.get(y.scale).to({ x: 5, y: 5 }, 500)
                    temp.loop = -1;
                    temp.onComplete = () => {
                        y.scale.x = 0.2;
                        y.scale.y = 0.2;
                    }
                    temp.advance(k*100)
                    k++;
                    
                })
                k = 0;
                ee2.forEach((y) => {
                    let temp = createjs.Tween.get(y.scale).to({ x: -5, y: 5 }, 500)
                    temp.loop = -1;
                    temp.onComplete = () => {
                        y.scale.x = -0.2;
                        y.scale.y = 0.2;
                    }
                    temp.advance(k*100)
                    k++
                })
                // });
            }, 1000)

            zoomEffect.enabled = true
            rgbSplitEffect.enabled = true


            setTimeout(() => {
                createjs.Tween.get(e).to({ alpha: 1}, 100).to({ alpha: 0 }, 400);
                createjs.Tween.get(laser).to({ alpha: 0.4}, 200);
                createjs.Tween.get(level3).to({ alpha: 1 }, 200);
                createjs.Tween.get(zoomEffect).to({ strength: 0.07}, 127)
                createjs.Tween.get(rgbSplitEffect.red).to({ x: -5}, 127)
                createjs.Tween.get(rgbSplitEffect.blue).to({ x: 5}, 127)
                createjs.Tween.get(left_screen_effect).to({ alpha: 1}, 127)
                createjs.Tween.get(right_screen_effect).to({ alpha: 1}, 127)
                // createjs.Tween.get(crtEffect).to({ lineWidth: 1, vignettingAlpha:1}, 127)

                createjs.Tween.get(left_hexa_container_front).to({x: width/4,alpha:1}, 127, createjs.Ease.quintOut);
                createjs.Tween.get(left_hexa_container_front.scale).to({x:1,y:1}, 127, createjs.Ease.linear);
                createjs.Tween.get(left_hexa_container_back).to({x: width/4,alpha:1}, 127, createjs.Ease.quintOut);
                createjs.Tween.get(left_hexa_container_back.scale).to({x:1,y:1}, 127, createjs.Ease.linear);
                createjs.Tween.get(right_hexa_container_front).to({x: width/4*3,alpha:1}, 127, createjs.Ease.quintOut);
                createjs.Tween.get(right_hexa_container_front.scale).to({x:1,y:1}, 127, createjs.Ease.linear);
                createjs.Tween.get(right_hexa_container_back).to({x: width/4*3,alpha:1}, 127, createjs.Ease.quintOut);
                createjs.Tween.get(right_hexa_container_back.scale).to({x:1,y:1}, 127, createjs.Ease.linear);
                

                createjs.Tween.get(e.scale).to({ x: 3, y: 3 }, 500);
                exceed_sfx.play()
            }, 1000);
            

            let e2 = PIXI.Sprite.from('./assets/png/sudden/fb_lv4_god.png');
            e2.anchor.set(0.5, 0.375);
            e2.x = width / 2;
            e2.y = height / 3;
            e2.scale.x = 1;
            e2.scale.y = 1;
            e2.alpha = 0;
            e2.zIndex = 50;
            this.app.stage.addChild(e2);

            let level4 = PIXI.Sprite.from('./assets/png/sudden/f_lv4_god.png');
            level4.anchor.set(0.5, 0.5);
            level4.x = width * 0.766;
            level4.y = height / 2;
            level4.scale.x = 1;
            level4.scale.y = 1;
            // level4.rotation = -0.13;
            level4.alpha = 0;
            level4.zIndex = 50;
            this.app.stage.addChild(level4);


            let overlay = PIXI.Sprite.from('./assets/png/sudden/overlay/4.png');
            overlay.anchor.set(0.5, 0.5);
            overlay.x = width / 2;
            overlay.y = height / 2;
            overlay.scale.x = 1.5;
            overlay.scale.y = 1.5;
            overlay.alpha = 0;
            overlay.zIndex = 50;
            overlay.blendMode = PIXI.BLEND_MODES.SCREEN;
            this.app.stage.addChild(overlay);

            setTimeout(() => {
                ee1.forEach((e) => {
                    createjs.Tween.get(e).to({ alpha: 0 }, 500);
                })

                ee2.forEach((e) => {
                    createjs.Tween.get(e).to({ alpha: 0 }, 500);
                })


            }, 5000);


            setTimeout(() => {
                createjs.Tween.get(laser).to({ alpha: 0}, 200);
                createjs.Tween.get(level3).to({ alpha: 0 }, 200);
                createjs.Tween.get(zoomEffect).to({ strength: 0}, 800)
                createjs.Tween.get(rgbSplitEffect.red).to({ x: 0}, 800)
                createjs.Tween.get(rgbSplitEffect.blue).to({ x: 0}, 800)
                createjs.Tween.get(left_screen_effect).to({ alpha: 0}, 800)
                createjs.Tween.get(right_screen_effect).to({ alpha: 0}, 800)

                createjs.Tween.get(left_hexa_container_front).to({alpha:0}, 800, createjs.Ease.quintOut);
                createjs.Tween.get(left_hexa_container_back).to({alpha:0}, 800, createjs.Ease.quintOut);
                createjs.Tween.get(right_hexa_container_front).to({alpha:0}, 800, createjs.Ease.quintOut);
                createjs.Tween.get(right_hexa_container_back).to({alpha:0}, 800, createjs.Ease.quintOut);

                // createjs.Tween.get(crtEffect).to({ lineWidth: 0, vignettingAlpha:0}, 800)
                this.model.motion("EG4_in", 0, 3);
            }, 5000)

            setTimeout(() => {
                this.mainContaier.removeChild(laser);
                this.app.stage.removeChild(level3);
            }, 5000 + 200)

            setTimeout(() => {
                createjs.Tween.removeAllTweens();
            }, 5000 + 1000)

            crtEffect.enabled = true
            colorAdjustEffect.enabled = true
            glitchEffect.enabled = true

            setTimeout(() => {
                createjs.Tween.get(e2).to({ alpha: 1}, 100).to({ alpha: 0 }, 400);
                createjs.Tween.get(overlay).to({ alpha: 0.3}, 200);
                createjs.Tween.get(level4).to({ alpha: 1 }, 200);
                createjs.Tween.get(zoomEffect).to({ strength: 0.07}, 127)
                createjs.Tween.get(rgbSplitEffect.red).to({ x: -5}, 127)
                createjs.Tween.get(rgbSplitEffect.blue).to({ x: 5}, 127)
                createjs.Tween.get(crtEffect).to({ lineWidth: 1, vignettingAlpha:1}, 127)
                createjs.Tween.get(colorAdjustEffect).to({ red:0.5 }, 127)
                createjs.Tween.get(left_screen_effect).to({ alpha: 1}, 127)
                createjs.Tween.get(right_screen_effect).to({ alpha: 1}, 127)
                createjs.Tween.get(glitchEffect).to({ offset: 200}, 8033-1500)
                createjs.Tween.get(e2.scale).to({ x: 3, y: 3 }, 500);
                createjs.Tween.get(left_hexa_container_front).to({alpha:1}, 127, createjs.Ease.quintOut);
                createjs.Tween.get(left_hexa_container_back).to({alpha:1}, 127, createjs.Ease.quintOut);
                createjs.Tween.get(right_hexa_container_front).to({alpha:1}, 127, createjs.Ease.quintOut);
                createjs.Tween.get(right_hexa_container_back).to({alpha:1}, 127, createjs.Ease.quintOut);
            }, 5000 + 1500);

            setTimeout(() => {
                createjs.Tween.get(zoomEffect).to({ strength: 0.15}, 2000)
            }, 5000 + 1500 + 127);


            setTimeout(() => {
                let k = 0
                ee1.forEach((e) => {
                    createjs.Tween.get(e).to({ alpha: 0.2 }, 500);
                    let temp = createjs.Tween.get(e.scale).to({ x: 5, y: 5 }, 250)
                    temp.loop = -1;
                    temp.onComplete = () => {
                        e.scale.x = 0.2;
                        e.scale.y = 0.2;
                    }
                    temp.advance(k*50)
                    k++;
                })
                k = 0
                ee2.forEach((e) => {
                    createjs.Tween.get(e).to({ alpha: 0.2 }, 500);
                    let temp = createjs.Tween.get(e.scale).to({ x: -5, y: 5 }, 250)
                    temp.loop = -1;
                    temp.onComplete = () => {
                        e.scale.x = -0.2;
                        e.scale.y = 0.2;
                    }
                    temp.advance(k*50)
                    k++
                })
            }, 5000 + 1500);

            setTimeout(() => {
                this.model.motion("EG4_out", 0, 3);
                createjs.Tween.get(overlay).to({ alpha: 0}, 500);
                createjs.Tween.get(level4).to({ alpha: 0 }, 500);
                createjs.Tween.get(zoomEffect).to({ strength: 0}, 380)
                createjs.Tween.get(rgbSplitEffect.red).to({ x: 0}, 380)
                createjs.Tween.get(rgbSplitEffect.blue).to({ x: 0}, 380)
                createjs.Tween.get(crtEffect).to({ lineWidth: 0, vignettingAlpha:0}, 380)
                createjs.Tween.get(left_screen_effect).to({ alpha: 0}, 380)
                createjs.Tween.get(right_screen_effect).to({ alpha: 0}, 380)
                createjs.Tween.get(colorAdjustEffect).to({ red:1 }, 380)
                createjs.Tween.get(glitchEffect).to({ offset: 0}, 380)
                createjs.Tween.get(left_hexa_container_front).to({alpha:0}, 380, createjs.Ease.quintOut);
                createjs.Tween.get(left_hexa_container_back).to({alpha:0}, 380, createjs.Ease.quintOut);
                createjs.Tween.get(right_hexa_container_front).to({alpha:0}, 380, createjs.Ease.quintOut);
                createjs.Tween.get(right_hexa_container_back).to({alpha:0}, 380, createjs.Ease.quintOut);

                this.model.internalModel.motionManager.groups.idle = 'Idle4'
            }, 5000 + 8033)

            setTimeout(() => {
                this.app.stage.removeChild(overlay);
                this.app.stage.removeChild(level4);
                zoomEffect.enabled = false
                rgbSplitEffect.enabled = false
                crtEffect.enabled = false
                colorAdjustEffect.enabled = false
                glitchEffect.enabled = false
            }, 5000 + 8033 + 500)

            setTimeout(() => {
                ee1.forEach((e) => {
                    createjs.Tween.get(e).to({ alpha: 0 }, 500);
                })

                ee2.forEach((e) => {
                    createjs.Tween.get(e).to({ alpha: 0 }, 500);
                })
            }, 5000 + 8033 + 500);



            setTimeout(() => {
                ee1.forEach((e) => {
                    this.mainContaier.removeChild(e);
                })

                ee2.forEach((e) => {
                    this.mainContaier.removeChild(e);
                })

            }, 5000 + 8033 + 500+500);

            setTimeout(() => {
                this.sudden_in_anime.gotoAndPlay(0)
                this.sudden_in_anime.alpha = 1;
            }, 5000 + 8033 + 1500)

            setTimeout(() => {
                this.model.motion("In", 0, 3);
                this.sudden_in_anime.gotoAndPlay(0)
                this.sudden_in_anime.alpha = 1;
                this.model.internalModel.motionManager.groups.idle = 'Idle1'
            }, 5000 + 8033 + 3000)
        })
        EG3.zIndex = 5;
        EG3.interactive = true;
        EG3.buttonMode = true;
        this.buttonArray.push(EG3)
        this.app.stage.addChild(EG3);

    }

    generate_button_mion() {
        let zoomEffect = new PIXI.filters.ZoomBlurFilter()
        zoomEffect.center.x = width / 2
        zoomEffect.center.y = height / 2
        zoomEffect.innerRadius = height / 2
        zoomEffect.strength = 0
        zoomEffect.enabled = true

        let rgbSplitEffect = new PIXI.filters.RGBSplitFilter()
        rgbSplitEffect.red.x = 0 // -5
        rgbSplitEffect.red.y = 0
        rgbSplitEffect.green.x = 0
        rgbSplitEffect.green.y = 0
        rgbSplitEffect.blue.x = 0 // 5
        rgbSplitEffect.blue.y = 0
        rgbSplitEffect.enabled = false

        let crtEffect = new PIXI.filters.CRTFilter()
        crtEffect.lineWidth = 0
        crtEffect.vignettingAlpha = 0
        crtEffect.vignetting = 0
        crtEffect.enabled = false

        let colorAdjustEffect = new PIXI.filters.AdjustmentFilter()
        colorAdjustEffect.red = 1
        colorAdjustEffect.brightness = 1
        colorAdjustEffect.enabled = false

        let glitchEffect = new PIXI.filters.GlitchFilter() // start with zero effect
        glitchEffect.offset = 0
        glitchEffect.red.x = 0
        glitchEffect.red.y = 0
        glitchEffect.green.x = 0
        glitchEffect.green.y = 0
        glitchEffect.blue.x = 0
        glitchEffect.blue.y = 0
        glitchEffect.slices = 10
        glitchEffect.fillMode = 2
        glitchEffect.enabled = false

        this.app.stage.filters = [rgbSplitEffect, crtEffect, colorAdjustEffect, glitchEffect,zoomEffect]

        let sprite = PIXI.Sprite.from('./assets/png/xhrono_clock.png');
        sprite.anchor.set(0.5, 0.5);
        sprite.x = width / 2;
        sprite.y = height / 2;
        sprite.scale.x = 1;
        sprite.scale.y = 1;
        sprite.alpha = 0;
        sprite.zIndex = 10;
        sprite.blendMode = PIXI.BLEND_MODES.SCREEN;
        this.mainContaier.addChild(sprite);

        // video texture to sprite
        let mionvideoTexture = PIXI.Texture.from('./assets/png/zero_in.mp4');
        let mvideoSprite = new PIXI.Sprite(mionvideoTexture);
        mvideoSprite.anchor.set(0.5, 0.5);
        mvideoSprite.x = width / 2;
        mvideoSprite.y = height / 2+200;
        mvideoSprite.scale.x = 0.7;
        mvideoSprite.scale.y = 0.7;
        mvideoSprite.alpha = 0;
        mvideoSprite.zIndex = 10;
        mvideoSprite.blendMode = PIXI.BLEND_MODES.SCREEN;
        this.mainContaier.addChild(mvideoSprite);
        // mvideoSprite.baseTexture.resource.source.pause()



        let vButton = new PIXI.Graphics();
        vButton.beginFill(0xffffff);
        vButton.drawCircle(0, 0, 30);
        vButton.endFill();
        let vText = new PIXI.Text('V', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        vText.anchor.set(0.5, 0.5);
        vButton.addChild(vText);
        vButton.position.set(35, 35);
        vButton.on('pointerup', () => {
            createjs.Tween.get(zoomEffect).wait(127).to({ strength: 0.07,alpha:1}, 250).to({ strength: 0,alpha:0}, 800)
            createjs.Tween.get(sprite).wait(127).to({ alpha: 0.7 }, 100).to({ alpha: 0 }, 200);
            createjs.Tween.get(sprite.scale).wait(127).to({ x: 1.7, y: 1.7 }, 200).wait(200).call(() => {
                sprite.scale.x = 1;
                sprite.scale.y = 1;
            });
            
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
        let ivText = new PIXI.Text('IV', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        ivText.anchor.set(0.5, 0.5);
        ivButton.addChild(ivText);
        ivButton.position.set(100, 35);
        ivButton.on('pointerup', () => {
            // this.zoomEffectCall()
            createjs.Tween.get(zoomEffect).wait(127).to({ strength: 0.07,alpha:1}, 250).to({ strength: 0,alpha:0}, 800)
            createjs.Tween.get(sprite).wait(127).to({ alpha: 0.7 }, 100).to({ alpha: 0 }, 200);
            createjs.Tween.get(sprite.scale).wait(127).to({ x: 1.7, y: 1.7 }, 200).wait(200).call(() => {
                sprite.scale.x = 1;
                sprite.scale.y = 1;
            });
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
        let iiiText = new PIXI.Text('III', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        iiiText.anchor.set(0.5, 0.5);
        iiiButton.addChild(iiiText);
        iiiButton.position.set(165, 35);
        iiiButton.on('pointerup', () => {
            // this.zoomEffectCall()
            createjs.Tween.get(zoomEffect).wait(127).to({ strength: 0.07,alpha:1}, 250).to({ strength: 0,alpha:0}, 800)
            createjs.Tween.get(sprite).wait(127).to({ alpha: 0.7 }, 100).to({ alpha: 0 }, 200);
            createjs.Tween.get(sprite.scale).wait(127).to({ x: 1.7, y: 1.7 }, 200).wait(200).call(() => {
                sprite.scale.x = 1;
                sprite.scale.y = 1;
            });
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
        let iiText = new PIXI.Text('II', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        iiText.anchor.set(0.5, 0.5);
        iiButton.addChild(iiText);
        iiButton.position.set(230, 35);
        iiButton.on('pointerup', () => {
            // this.zoomEffectCall()
            createjs.Tween.get(zoomEffect).wait(127).to({ strength: 0.07,alpha:1}, 250).to({ strength: 0,alpha:0}, 800)
            createjs.Tween.get(sprite).wait(127).to({ alpha: 0.7 }, 100).to({ alpha: 0 }, 200);
            createjs.Tween.get(sprite.scale).wait(127).to({ x: 1.7, y: 1.7 }, 200).wait(200).call(() => {
                sprite.scale.x = 1;
                sprite.scale.y = 1;
            });
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
        let iText = new PIXI.Text('I', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        iText.anchor.set(0.5, 0.5);
        iButton.addChild(iText);
        iButton.position.set(295, 35);
        iButton.on('pointerup', () => {
            // this.zoomEffectCall()
            createjs.Tween.get(zoomEffect).wait(127).to({ strength: 0.07,alpha:1}, 250).to({ strength: 0,alpha:0}, 800)
            createjs.Tween.get(sprite).wait(127).to({ alpha: 0.7 }, 100).to({ alpha: 0 }, 200);
            createjs.Tween.get(sprite.scale).wait(127).to({ x: 1.7, y: 1.7 }, 200).wait(200).call(() => {
                sprite.scale.x = 1;
                sprite.scale.y = 1;
            });
            this.model.motion("Change1", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle'
        });
        iButton.zIndex = 5;
        iButton.interactive = true;
        iButton.buttonMode = true;
        this.buttonArray.push(iButton);
        this.app.stage.addChild(iButton);

        let zeroButton = new PIXI.Graphics();
        zeroButton.beginFill(0xffffff);
        zeroButton.drawCircle(0, 0, 30);
        zeroButton.endFill();
        let zeroText = new PIXI.Text(' ', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        zeroText.anchor.set(0.5, 0.5);
        zeroButton.addChild(zeroText);
        zeroButton.position.set(360, 35);
        zeroButton.on('pointerup', () => {
            // this.zoomEffectCall()
            this.model.motion("Out1", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle'
            this.model2.zIndex = 19
            this.twoModelInState = true

            
            rgbSplitEffect.enabled = true
            colorAdjustEffect.enabled = true
            crtEffect.enabled = true
            createjs.Tween.get(zoomEffect).wait(127).to({ strength: 0.07,alpha:1}, 3500)
            createjs.Tween.get(rgbSplitEffect.red).wait(127).to({ x: -5}, 3500)
            createjs.Tween.get(rgbSplitEffect.blue).wait(127).to({ x: 5}, 3500)
            createjs.Tween.get(crtEffect).to({alpha:0}, 1).wait(126).to({ lineWidth: 5, vignettingAlpha:1, alpha:1, curvature:5, vignetting:0.3}, 3500)
            createjs.Tween.get(colorAdjustEffect).wait(127).to({ red:0.8 }, 3500)
    
            
            setTimeout(() => {
                this.model2.alpha = 1
                this.model2.motion("In", 0, 3);
                this.onResize()
            }, 3000)

            setTimeout(() => {
                this.model.motion("Meet_in", 0, 3)
                this.model.internalModel.motionManager.groups.idle = 'Meet_idle'
                createjs.Tween.get(zoomEffect).wait(127).to({ strength: 0,alpha:1}, 250)
                createjs.Tween.get(rgbSplitEffect.red).to({ x: 0}, 250)
                createjs.Tween.get(rgbSplitEffect.blue).to({ x: 0}, 250)
                createjs.Tween.get(crtEffect).to({ lineWidth: 0, vignettingAlpha:0}, 250)
                createjs.Tween.get(colorAdjustEffect).to({ red:1 }, 250)

                mvideoSprite.alpha = 1
                mvideoSprite.texture.baseTexture.resource.source.play();
                mvideoSprite.texture.baseTexture.resource.source.loop = true;


                // createjs.Tween.get(colorAdjustEffect).to({ red:0.5, green:0.5, blue:0.5 }, 127)
            }, 3000 + 4000)

            

        });
        zeroButton.zIndex = 5;
        zeroButton.interactive = true;
        zeroButton.buttonMode = true;
        this.buttonArray.push(zeroButton);
        this.app.stage.addChild(zeroButton);


        let outButton = new PIXI.Graphics();
        outButton.beginFill(0xffffff);
        outButton.drawCircle(0, 0, 30);
        outButton.endFill();
        let outText = new PIXI.Text('Out', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        outText.anchor.set(0.5, 0.5);
        outButton.addChild(outText);
        outButton.position.set(425, 35);
        outButton.on('pointerup', () => {
            // this.zoomEffectCall()
            this.model.motion("Out2", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle'
            this.model2.motion("Out", 0, 3);
            this.model2.zIndex = 19
            this.twoModelInState = false
            
            // mvideoSprite.alpha = 1
            createjs.Tween.get(mvideoSprite).to({alpha:0},200);
            mvideoSprite.texture.baseTexture.resource.source.pause();
            mvideoSprite.texture.baseTexture.resource.source.loop = true;
            mvideoSprite.texture.baseTexture.resource.source.currentTime = 0;


            setTimeout(() => {
                this.model2.alpha = 0
                this.model.motion("In", 0, 3);
                this.onResize()
            },3167)

        });
        outButton.zIndex = 5;
        outButton.interactive = true;
        outButton.buttonMode = true;
        this.buttonArray.push(outButton);
        this.app.stage.addChild(outButton);
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
            // this.zoomEffectCall()
            this.model.motion("Ken", 0, 3);
            const texture = PIXI.Texture.from('./assets/png/output.webm');
            const videoSprite = new PIXI.Sprite(texture);

            videoSprite.anchor.set(0.5)
            videoSprite.x = width / 2;
            videoSprite.y = height / 2;
            // const aspectRatio = 1080 / 1920;
            videoSprite.scale.x = width / 1080;
            videoSprite.scale.y = height / 1920;
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
            // this.zoomEffectCall()
            this.model.motion("Last", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle3'

            const texture = PIXI.Texture.from('./assets/png/cutred.webm');
            const videoSprite = new PIXI.Sprite(texture);

            videoSprite.anchor.set(0.5)
            videoSprite.x = width / 2;
            videoSprite.y = height / 2;
            // const aspectRatio = 1080 / 1920;
            videoSprite.scale.x = width / 1080;
            videoSprite.scale.y = height / 1920;
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
                for (var i = 0; i < 5; i++) {
                    var e = PIXI.Sprite.from('./assets/png/5_ne_eff_06_i_feb.png');
                    e.anchor.set(1, 0.5);
                    e.x = this.model.x;
                    e.y = this.model.y - 200;
                    e.scale.x = 0.2;
                    e.scale.y = 0.2;
                    // e.alpha = 0.2
                    ee1.push(e);
                    this.mainContaier.addChild(e);
                }

                for (var i = 0; i < 5; i++) {
                    var e = PIXI.Sprite.from('./assets/png/5_ne_eff_06_i_feb.png');
                    e.anchor.set(1, 0.5);
                    e.x = this.model.x;
                    e.y = this.model.y - 200;
                    e.scale.x = -0.2;
                    e.scale.y = 0.2;
                    // e.alpha = 0.2
                    ee2.push(e);
                    this.mainContaier.addChild(e);
                }
                // this.app.ticker.add((d) => {
                let k = 0;
                ee1.forEach((y) => {
                    let temp = createjs.Tween.get(y.scale).to({ x: 5, y: 5 }, 500)
                    temp.loop = -1;
                    temp.onComplete = () => {
                        y.scale.x = 0.2;
                        y.scale.y = 0.2;
                    }
                    temp.advance(k*100)
                    k++;
                    
                })
                k = 0;
                ee2.forEach((y) => {
                    let temp = createjs.Tween.get(y.scale).to({ x: -5, y: 5 }, 500)
                    temp.loop = -1;
                    temp.onComplete = () => {
                        y.scale.x = -0.2;
                        y.scale.y = 0.2;
                    }
                    temp.advance(k*100)
                    k++
                })
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
            // this.zoomEffectCall()
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
            // this.zoomEffectCall()
            this.model.motion("Gun1", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle2'
            let e = PIXI.Sprite.from('./assets/png/doublegunshot.png');
            e.anchor.set(0.5, 0.5);
            e.x = width / 2;
            e.y = height / 2;
            // let sc = width / e.width;
            // e.scale.x = sc;
            // e.scale.y = 5;
            e.zIndex = 50;
            e.alpha = 0;
            e.blendMode = PIXI.BLEND_MODES.ADD;


            this.app.stage.addChild(e);
            setTimeout(() => {
                createjs.Tween.get(e).to({ alpha: 1 }, 50);
            },5300)


            

            setTimeout(() => {
                createjs.Tween.get(e).to({ alpha: 0 }, 500);
            },1500 + 5300)
            setTimeout(() => {
                this.app.stage.removeChild(e);
            },2000 + 5300)

            
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
            // this.zoomEffectCall()
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
            this.model.motion("Gun2", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle3'
            
            let bullet = [];
            let bulletNum = 4;
            let k;
            setTimeout(() => {
                k = setInterval(() => {
                    let e = PIXI.Sprite.from('./assets/png/hibi_c_i_feb.png');
                    e.anchor.set(0.5, 0.5);
                    e.x = Math.random() * width;
                    e.y = Math.random() * height;
                    // e.scale.x = 0.5;
                    // e.scale.y = 0.5;
                    e.zIndex = 50;
                    bullet.push(e);
                    this.app.stage.addChild(e);
                    bulletNum--;
                    if (bulletNum == 0) {
                        clearInterval(k);
                    }
                }, 100)
            }, 1600)

            setTimeout(() => {
                bulletNum = 4;

                k = setInterval(() => {
                    let e = PIXI.Sprite.from('./assets/png/hibi_c_i_feb.png');
                    e.anchor.set(0.5, 0.5);
                    e.x = Math.random() * width;
                    e.y = Math.random() * height;
                    // e.scale.x = 0.5;
                    // e.scale.y = 0.5;
                    e.zIndex = 50;
                    bullet.push(e);
                    this.app.stage.addChild(e);
                    bulletNum--;
                    if (bulletNum == 0) {
                        clearInterval(k);
                    }
                }, 100)
            }, 2500)

            let shake = {x: this.app.stage.x, y: this.app.stage.y}
            let easing = createjs.Ease.quadInOut;
            setTimeout(() => {
                createjs.Tween.get(shake,{loop: true})
                .to({x: this.app.stage.x}, 50, easing)
                .to({x: this.app.stage.x}, 50, easing)
                .to({x: this.app.stage.x}, 50, easing)
                .to({x: this.app.stage.x}, 50, easing)
                .addEventListener("change", (e) => {
                    this.app.stage.x = shake.x + Math.random()*10 - 5;
                    this.app.stage.y = shake.y + Math.random()*10 - 5;
                })
            }, 5500)

            setTimeout(() => {
                createjs.Tween.removeAllTweens();
                this.app.stage.x = 0;
                this.app.stage.y = 0;

                bullet.forEach((e) => {
                    createjs.Tween.get(e).to({ alpha: 0 }, 500);
                    setTimeout(() => {
                        this.app.stage.removeChild(e);
                    }, 500)
                })
            }, 6500)

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

    generate_button_ortlinde_akasha() {

        let colorMatrixFilter = new PIXI.filters.ColorMatrixFilter();
        colorMatrixFilter.negative(true);
        colorMatrixFilter.alpha = 0;

        
        // copy bgContext 
        var bgTexture = PIXI.Texture.from(this.bgURL);
        let tbgContext = PIXI.Sprite.from(bgTexture);
        tbgContext.anchor.set(0.5, 0.5)
        tbgContext.x = width / 2;
        tbgContext.y = height / 2;
        tbgContext.zIndex = -2
        tbgContext.scale.set(width / 1920, height / 1080);
        


        let mask = new PIXI.Graphics();
        mask.beginFill(0xffffff);
        mask.drawCircle(0, 0, 300);
        mask.endFill();

        let maskSpriteTexture = this.app.renderer.generateTexture(mask);
        let maskSprite = new PIXI.Sprite(maskSpriteTexture);
        maskSprite.anchor.set(0.5, 0.5);
        maskSprite.x = width / 2 + 150;
        maskSprite.y = height / 2 - 100;
        maskSprite.scale.set(0.001, 0.001);
        
        
        // colorMatrixFilter.maskSprite = mask;

        // this.mainContaier.filters = [colorMatrixFilter];

        tbgContext.filters = [colorMatrixFilter];
        tbgContext.mask = maskSprite;
        tbgContext.zIndex = 4
        this.app.stage.addChild(maskSprite)
        this.app.stage.addChild(tbgContext);
        // maskSprite.filters = [colorMatrixFilter];
        // mask.alpha = 0;
        // this.mainContaier.mask = mask;
        // this.mainContaier.addChild(mask);

        let blackEffect = new PIXI.Container();
        for(let i = 0; i < 4; i++){
            let img = PIXI.Sprite.from('./assets/png/akasha/5_ne_eff_05b_i_feb.png')
            img.anchor.set(1, 1);
            // img.x = width / 2;
            // img.y = height / 2;
            img.angle = i * 90;
            blackEffect.addChild(img);
        }
        blackEffect.zIndex = 9999

        blackEffect.x = width / 2 + 150;
        blackEffect.y = height / 2 - 100;
        blackEffect.scale.set(0.001, 0.001);
        blackEffect.alpha = 0;

        this.app.stage.addChild(blackEffect);




        let reverseButton = new PIXI.Graphics();
        reverseButton.beginFill(0xffffff);
        reverseButton.drawCircle(0, 0, 30);
        reverseButton.endFill();
        let gunOneText = new PIXI.Text('反轉', { fontFamily: 'Arial', fontSize: 22, fill: 0x1010ff, align: 'center' });
        gunOneText.anchor.set(0.5, 0.5);
        reverseButton.addChild(gunOneText);
        reverseButton.position.set(35, 35);
        reverseButton.on('pointerup', () => {
            this.model.motion("In2", 0, 3);
            this.model.internalModel.motionManager.groups.idle = 'Idle2'
            createjs.Tween.get(colorMatrixFilter).wait(5500).to({ alpha: 1 }, 500);
            createjs.Tween.get(maskSprite.scale).wait(6000).to({ x: 5, y: 5}, 750, createjs.Ease.cubicOut).call(()=>{
                this.mainContaier.filters = [colorMatrixFilter];
            }).to({ alpha: 0}, 10);
            blackEffect.x = width / 2 + 150;
            blackEffect.y = height / 2 - 100;
            createjs.Tween.get(blackEffect.scale).wait(6000).to({ x: 5, y: 5}, 750);
            createjs.Tween.get(blackEffect).wait(6000).to({ alpha: 1 }, 750);

            // createjs.Tween.get(blackEffect.scale).wait(6750).to({ x: 0.001, y: 0.001}, 10);
            // createjs.Tween.get(blackEffect).wait(6750).to({ alpha: 0 }, 10);
        });
        reverseButton.zIndex = 5;
        reverseButton.interactive = true;
        reverseButton.buttonMode = true;
        this.buttonArray.push(reverseButton);
        this.app.stage.addChild(reverseButton);


        let outButton = new PIXI.Graphics();
        outButton.beginFill(0xffffff);
        outButton.drawCircle(0, 0, 30);
        outButton.endFill();
        let outText = new PIXI.Text('Out', { fontFamily: 'Arial', fontSize: 24, fill: 0x1010ff, align: 'center' });
        outText.anchor.set(0.5, 0.5);
        outButton.addChild(outText);
        outButton.position.set(100, 35);
        outButton.on('pointerup', () => {
            this.model.motion("Last", 0, 3);
            blackEffect.x = width / 2;
            blackEffect.y = 0;
            blackEffect.alpha = 1;
            blackEffect.scale.set(0.001, 0.001);
            // createjs.Tween.get(blackEffect.scale).to({ x: 5, y: 5}, 750);
            // createjs.Tween.get(blackEffect.scale).to({ x: 5, y: 5}, 750);
            

            createjs.Tween.get(colorMatrixFilter).wait(12000).to({ alpha: 0 }, 500);
            createjs.Tween.get(maskSprite.scale).wait(12000).to({ x: 0.001, y: 0.001}, 500).call(()=>{
                this.mainContaier.filters = [];
            });
            createjs.Tween.get(blackEffect.scale)
                .wait(700).to({ x: 6, y: 6}, 750, createjs.Ease.cubicOut)
                .wait(10050).to({ x: 0.001, y: 0.001}, 500);
            createjs.Tween.get(blackEffect).wait(11000).to({ alpha: 0 }, 0);
            this.model.internalModel.motionManager.groups.idle = 'Idle'
            this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 1.5;
            this.model.internalModel.motionManager.motionGroups.In1[0]._fadeInSeconds = 1.5;
            setTimeout(() => {
                this.model.motion("In1", 0, 3);
                //this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015;
                
            }, this.model.internalModel.motionManager.motionGroups.Last[0]._loopDurationSeconds * 1000);
            setTimeout(() => {
                //this.model.motion("In", 0, 3);
                this.model.internalModel.motionManager.motionGroups.Idle[0]._fadeInSeconds = 0.015;
                this.model.internalModel.motionManager.motionGroups.In1[0]._fadeInSeconds = 0;
            }, this.model.internalModel.motionManager.motionGroups.Last[0]._loopDurationSeconds * 1000 + 1500);
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

    generate_button_maxima(){
        let glasses = new PIXI.Graphics();
        glasses.beginFill(0xffffff);
        glasses.drawCircle(0, 0, 30);
        glasses.endFill();
        let glassesText = new PIXI.Text('Glasses Change', { fontFamily: 'Arial', fontSize: 18, fill: 0x1010ff, align: 'center' });
        glassesText.anchor.set(0.5, 0.5);
        glasses.addChild(glassesText);
        glasses.position.set(295, 35);
        glasses.on('pointerup', () => {
            if(this.glassesSwitch){
                glasses.beginFill(0xffff00);
                glasses.drawCircle(0, 0, 30);
                glasses.endFill();
                this.model.expression("megane")
            }else{
                glasses.beginFill(0xffffff);
                glasses.drawCircle(0, 0, 30);
                glasses.endFill();
                this.model.expression("default")
            }
            this.glassesSwitch = !this.glassesSwitch;
            
        });
        glasses.zIndex = 5;
        glasses.interactive = true;
        glasses.buttonMode = true;
        this.buttonArray.push(glasses);
        this.app.stage.addChild(glasses);
    }

    updateCRTEffect() {
        if (this.crtEffect) {
            let crtEffect = new PIXI.filters.CRTFilter()
            crtEffect.padding = width

            let adjustEffect = new PIXI.filters.AdjustmentFilter()
            adjustEffect.saturation = 0.5

            let rgbSplitEffect = new PIXI.filters.RGBSplitFilter()
            rgbSplitEffect.red.x = -5
            rgbSplitEffect.red.y = 0
            rgbSplitEffect.green.x = 0
            rgbSplitEffect.green.y = 0
            rgbSplitEffect.blue.x = 5
            rgbSplitEffect.blue.y = 0

            

            this.mainContaier.filters = [crtEffect, adjustEffect, rgbSplitEffect]
        } else {
            this.mainContaier.filters = []
            this.zoomStrengthAdd = true
            // clearInterval(this.zoomEffectIntervalObject);
        }
    }



    updateBg(key) {

        if (!(typeof this.videoContext === "undefined")) {
            this.mainContaier.removeChild(this.videoContext)
            var videoTexture = PIXI.Texture.from(this.videoURL);
            videoTexture.baseTexture.resource.source.loop = true;

            //videoTexture.baseTexture.on('loaded', function () {videoTexture.baseTexture.resource.source.play();});
            this.videoContext = new PIXI.Sprite(videoTexture);
            this.videoContext.anchor.set(0.5, 0.5)
            this.videoContext.x = width / 2;
            this.videoContext.y = height / 2;
            this.videoContext.preload = ''
                //this.videoContext.autoplay = true;
            this.videoContext.zIndex = -1
            this.videoContext.scale.set(width / 1920, height / 1080);
            this.videoContext.texture.baseTexture.resource.source.pause();
            if (this.useVideo) {
                this.mainContaier.addChild(this.videoContext)
                this.videoContext.texture.baseTexture.resource.source.play();
            } else {

                this.mainContaier.removeChild(this.videoContext)
            }
        }


        if (!(typeof this.bgContext === "undefined")) {
            this.mainContaier.removeChild(this.bgContext)
            var bgTexture = PIXI.Texture.from(this.bgURL);
            this.bgContext = PIXI.Sprite.from(bgTexture);
            this.bgContext.anchor.set(0.5, 0.5)
            this.bgContext.x = width / 2;
            this.bgContext.y = height / 2;
            this.bgContext.zIndex = -2
            this.bgContext.scale.set(width / 1920, height / 1080);

            this.mainContaier.addChild(this.bgContext);
        }



    }

    
}