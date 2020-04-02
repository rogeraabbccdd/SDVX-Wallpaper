class Live2dModel {
  constructor() {
    this.app = new PIXI.Application(1280, 720, { transparent: true })
    this.model = new LIVE2DCUBISMPIXI.ModelBuilder()
    this.app.view.addEventListener("pointerup", this.onDragEnd(), false);
    this.app.view.addEventListener("pointerout", this.onDragEnd(), false);
    // this.app.view.addEventListener("pointermove", this.onDragMove(), false);
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
    this.modelX = 50;
    this.modelY = 50;
  }
  onDragEnd (event) {
    this.pos_x = 0.0;
    this.pos_y = 0.0;
  }
  onDragMove (event) {
    let mouse_x = this.model.position.x - event.offsetX;
    let mouse_y = this.model.position.y - event.offsetY;
    let height = this.app.screen.height / 2;
    let width = this.app.screen.width / 2;
    let scale = 1.0 - height / this.model.scale.y;
    this.pos_x = -mouse_x / height;
    this.pos_y = -(mouse_y / width) + scale;
  }
  destroy() {
    this.app.destroy();
    this.model = null;
  }
  updateParameter() {
    this.emptyAnimation.evaluate = (time, weight, blend, target) => {
      if (this.param_angle_x >= 0) {
        target.parameters.values[this.param_angle_x] = blend(
          target.parameters.values[this.param_angle_x],
          this.pos_x * 30,
          0,
          weight
        );
      }
      if (this.param_angle_y >= 0) {
        target.parameters.values[this.param_angle_y] = blend(
          target.parameters.values[this.param_angle_y],
          -this.pos_y * 30,
          0,
          weight
        );
      }
      if (this.param_body_angle_x >= 0) {
        target.parameters.values[this.param_body_angle_x] = blend(
          target.parameters.values[this.param_body_angle_x],
          this.pos_x * 10,
          0,
          weight
        );
      }
      if (this.param_eye_ball_x >= 0) {
        target.parameters.values[this.param_eye_ball_x] = blend(
          target.parameters.values[this.param_eye_ball_x],
          this.pos_x,
          0,
          weight
        );
      }
      if (this.param_eye_ball_y >= 0) {
        target.parameters.values[this.param_eye_ball_y] = blend(
          target.parameters.values[this.param_eye_ball_y],
          -this.pos_y,
          0,
          weight
        );
      }
    };
    this.model.animator.getLayer("Drag").play(this.emptyAnimation);
  }
  onResize (event) {
    if (event === void 0) {
      event = null;
    }
    let width = window.innerWidth;
    let height = (width / 16.0) * 9.0;
    this.app.view.style.width = width + "px";
    this.app.view.style.height = height + "px";
    this.app.renderer.resize(width, height);
    this.model.position = new PIXI.Point(width * this.modelX / 100, height * this.modelY / 100);
    this.model.scale = new PIXI.Point(
      width * this.modelSize / 100,
      width * this.modelSize / 100
    );
    if(this.model.masks) this.model.masks.resize(this.app.view.width, this.app.view.height);
  }
  async loadModel(modelName) {
    const path = './assets/live2d/'
    const folderPath = path + modelName + '/'
    if(modelName === 'grace_yukata_ver5') modelName = 'grace_yukata'
    let jsonPath = folderPath + (modelName === 'grace_ver5' ? modelName + '_0102' : modelName === 'rasis_ver5' ? modelName + '_0103' : modelName === "natsuhi_otona" ? modelName + '_0100' : modelName + '_0101')  + '.model3.json'
    // let modelData = await fetch(jsonPath).then(response => response.json())
    let modelData = await $.ajax({url: jsonPath, dataType:'json'})
    modelData = modelData.FileReferences
    PIXI.loader.reset()
    PIXI.loader.add("moc",  folderPath+modelData.Moc, {
        xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER
      })
      .add("texture00", folderPath + modelData.Textures[0])
      // .add("physics", folderPath + modelData.Physics, {
      //   xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON
      // })
      .add("motion", folderPath + modelData.Motions.Idle[0].File, {
        xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON
      })
      .add("emptymotion", folderPath + modelData.Motions.Idle[0].File, {
        xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON
      })
      .load((loader, resources) => {
        this.app.destroy()
        this.app = new PIXI.Application(1280, 720, { transparent: true });
        document.getElementById('live2d').innerHTML = ''
        document.getElementById('live2d').appendChild(this.app.view);
        this.moc = Live2DCubismCore.Moc.fromArrayBuffer(resources["moc"].data);
        this.model = 0;
        this.model = new LIVE2DCUBISMPIXI.ModelBuilder()
          .setMoc(this.moc)
          .setTimeScale(1)
          .addTexture(0, resources["texture00"].texture)
          // .setPhysics3Json(resources["physics"].data)
          .addAnimatorLayer(
            "Motion",
            LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE,
            1
          )
          .addAnimatorLayer(
            "Drag",
            LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE,
            1
          )
          .build();
        if(this.app.stage.children.length > 0) {
          for (let i = this.app.stage.children.length - 1; i >= 0; i--) {	
            this.app.stage.removeChild(this.app.stage.children[i]);
          };
          this.model.scale = new PIXI.Point(0, 0)
        }
        this.app.stage.addChild(this.model);
        this.app.stage.addChild(this.model.masks);
        let animation = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(
          resources["motion"].data
        );
        this.emptyAnimation = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(
          resources["emptymotion"].data
        );
        this.model.animator.getLayer("Motion").play(animation);
        this.app.ticker.add((deltaTime) => {
          this.model.update(deltaTime);
          this.model.masks.update(this.app.renderer);
          this.updateParameter();
        });
        
        this.param_angle_x = this.model.parameters.ids.indexOf("PARAM_ANGLE_X");
        if (this.param_angle_x < 0) {
          this.param_angle_x = this.model.parameters.ids.indexOf("ParamAngleX");
        }
        this.param_angle_y = this.model.parameters.ids.indexOf("PARAM_ANGLE_Y");
        if (this.param_angle_y < 0) {
          this.param_angle_y = this.model.parameters.ids.indexOf("ParamAngleY");
        }
        this.param_body_angle_x = this.model.parameters.ids.indexOf(
          "PARAM_BODY_ANGLE_X"
        );
        if (this.param_body_angle_x < 0) {
          this.param_body_angle_x = this.model.parameters.ids.indexOf("ParamBodyAngleX");
        }
        this.param_eye_ball_x = this.model.parameters.ids.indexOf("PARAM_EYE_BALL_X");
        if (this.param_eye_ball_x < 0) {
          this.param_eye_ball_x = this.model.parameters.ids.indexOf("ParamEyeBallX");
        }
        this.param_eye_ball_y = this.model.parameters.ids.indexOf("PARAM_EYE_BALL_Y");
        if (this.param_eye_ball_y < 0) {
          this.param_eye_ball_y = this.model.parameters.ids.indexOf("ParamEyeBallY");
        }
        this.onResize();
      })
  }
}