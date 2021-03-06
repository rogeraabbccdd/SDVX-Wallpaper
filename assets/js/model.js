const live2d = PIXI.live2d;
class Live2dModel {
    constructor() {
        this.app = new PIXI.Application({
            width: 1280,
            height: 720,
            // resolution: window.devicePixelRatio || 1,
            transparent: true,
            autoStart: true,
            resizeTo: window,
            antialias: true,
        });
        this.model;
        this.pos_x = 0.0;
        this.pos_y = 0.0;
        this.emptyAnimation;
        this.param_angle_x = 0;
        this.param_angle_y = 0;
        this.param_body_angle_x = 0;
        this.param_eye_ball_x = 0;
        this.param_eye_ball_y = 0;
        this.moc;
        this.modelSize = 1;
        this.modelX = 50;
        this.modelY = 50;
        this.interval;
        this.times = 12;
    }

    destroy() {
            this.app.destroy();
            this.model = null;
        }
        // updateParameter() {
        //     this.emptyAnimation.evaluate = (time, weight, blend, target) => {
        //         if (this.param_angle_x >= 0) {
        //             target.parameters.values[this.param_angle_x] = blend(
        //                 target.parameters.values[this.param_angle_x],
        //                 this.pos_x * 30,
        //                 0,
        //                 weight
        //             );
        //         }
        //         if (this.param_angle_y >= 0) {
        //             target.parameters.values[this.param_angle_y] = blend(
        //                 target.parameters.values[this.param_angle_y], -this.pos_y * 30,
        //                 0,
        //                 weight
        //             );
        //         }
        //         if (this.param_body_angle_x >= 0) {
        //             target.parameters.values[this.param_body_angle_x] = blend(
        //                 target.parameters.values[this.param_body_angle_x],
        //                 this.pos_x * 10,
        //                 0,
        //                 weight
        //             );
        //         }
        //         if (this.param_eye_ball_x >= 0) {
        //             target.parameters.values[this.param_eye_ball_x] = blend(
        //                 target.parameters.values[this.param_eye_ball_x],
        //                 this.pos_x,
        //                 0,
        //                 weight
        //             );
        //         }
        //         if (this.param_eye_ball_y >= 0) {
        //             target.parameters.values[this.param_eye_ball_y] = blend(
        //                 target.parameters.values[this.param_eye_ball_y], -this.pos_y,
        //                 0,
        //                 weight
        //             );
        //         }
        //     };
        //     this.model.animator.getLayer("Drag").play(this.emptyAnimation);
        // }
    onResize(event) {
        if (event === void 0) {
            event = null;
        }
        let width = window.innerWidth;
        let height = (width / 16.0) * 9.0;
        // this.app.view.style.width = width + "px";
        // this.app.view.style.height = height + "px";
        // this.app.renderer.resize(width, height);
        // this.model.position = new PIXI.Point(width * this.modelX / 100, height * this.modelY / 100);
        console.log([this.model.x, this.model.y]);
        this.model.scale.set(width * this.modelSize * 1.2 / 10000);
        console.log(width * this.modelSize * 1.2 / 10000);
        if (this.model.masks) this.model.masks.resize(this.app.view.width, this.app.view.height);
    }


    async loadModel(modelName) {
        this.destroy();
        this.app = new PIXI.Application({
            width: 1280,
            height: 720,
            // resolution: window.devicePixelRatio || 1,
            transparent: true,
            autoStart: true,
            resizeTo: window,
            antialias: true,
        });
        const path = './assets/live2d/';
        const folderPath = path + modelName + '/';
        if (modelName === 'grace_yukata_ver5') modelName = 'grace_yukata';
        let jsonPath = folderPath + (modelName === 'grace_ver5' ? modelName + '_0102' : modelName === 'rasis_ver5' ? modelName + '_0103' : modelName === "natsuhi_otona" ? modelName + '_0100' : modelName + '_0101') + '.model3.json';
        console.log(jsonPath);
        let modelData = await live2d.Live2DModel.from(jsonPath, { idleMotionGroup: 'Idle', motionPreload: "ALL" });
        this.model = modelData;
        console.log(modelData);
        document.getElementById('live2d').appendChild(this.app.view);
        this.app.stage.addChild(modelData);
        // this.app.stage.addChild(modelData.mask);
        //modelData.scale.set(0.25);
        await modelData.motion('In', 0, 1);
        modelData.buttonMode = true;
        modelData.on("click", (e) => {
            this.model.motion("Ok", 0, 2);
        });
        this.model.anchor.set(0.5, 0.5);


        this.model.x = window.innerWidth / 2;
        this.model.y = (this.model.x / 16.0) * 9.0;
        live2d.config.motionFadingDuration = 0;
        live2d.config.idleMotionFadingDuration = 0;
        live2d.config.expressionFadingDuration = 0;
        live2d.config.logLevel = 0;
        this.model = modelData;
        this.onResize("");
        //         this.model.animator.getLayer("Motion").play(animation);
        //         this.app.ticker.add((deltaTime) => {
        //             this.model.update(deltaTime);
        //             this.model.masks.update(this.app.renderer);
        //             this.updateParameter();
        //         });

        //         this.param_angle_x = this.model.parameters.ids.indexOf("PARAM_ANGLE_X");
        //         if (this.param_angle_x < 0) {
        //             this.param_angle_x = this.model.parameters.ids.indexOf("ParamAngleX");
        //         }
        //         this.param_angle_y = this.model.parameters.ids.indexOf("PARAM_ANGLE_Y");
        //         if (this.param_angle_y < 0) {
        //             this.param_angle_y = this.model.parameters.ids.indexOf("ParamAngleY");
        //         }
        //         this.param_body_angle_x = this.model.parameters.ids.indexOf(
        //             "PARAM_BODY_ANGLE_X"
        //         );
        //         if (this.param_body_angle_x < 0) {
        //             this.param_body_angle_x = this.model.parameters.ids.indexOf("ParamBodyAngleX");
        //         }
        //         this.param_eye_ball_x = this.model.parameters.ids.indexOf("PARAM_EYE_BALL_X");
        //         if (this.param_eye_ball_x < 0) {
        //             this.param_eye_ball_x = this.model.parameters.ids.indexOf("ParamEyeBallX");
        //         }
        //         this.param_eye_ball_y = this.model.parameters.ids.indexOf("PARAM_EYE_BALL_Y");
        //         if (this.param_eye_ball_y < 0) {
        //             this.param_eye_ball_y = this.model.parameters.ids.indexOf("ParamEyeBallY");
        //         }
        //         this.onResize();
        //     });
    }
}