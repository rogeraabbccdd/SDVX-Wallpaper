class SuddenDeathRightHexagon{
    constructor(){
        this.front = new PIXI.Container();
        this.front.zIndex = 50;
        this.front.pivot.set(0.5);
        this.back = new PIXI.Container();
        this.back.zIndex = 19;
        this.back.pivot.set(0.5);
        this.texture = PIXI.Texture.from('assets/png/sudden/hexagon/effect_exg_red.png');
        this.sprites = [];
        for(let i = 0; i < 11; i++){
            let sprite = new PIXI.Sprite(this.texture);
            sprite.anchor.set(0.5);
            sprite.x = width/2;
            sprite.y = height/2;
            sprite.blendMode = PIXI.BLEND_MODES.ADD;
            // this.container.addChild(sprite);
            this.sprites.push(sprite);
        }
        // this.x = width/4 * 3;
        // this.y = height/3;

        this.x = width*2;
        this.y = height/3;

        this.front.x = this.x;
        this.back.x = this.x;

        this.front.y = this.y;
        this.back.y = this.y;

        this.front.scale.x = 2;
        this.front.scale.y = 2;

        this.back.scale.x = 2;
        this.back.scale.y = 2;
    }

    opacity(opacity){
        this.front.alpha = opacity;
        this.back.alpha = opacity;
    }

    rotate(rotation){
        this.front.rotation = rotation;
        this.back.rotation = rotation;
    }


    change(type){
        switch(type){
            case 1:
                t1();
                break;
            case 2:
                t2();
                break;
            case 3:
                t3();
                break;
            case 4:
                t4();
                break;
        }
    }

    t1(){
        this.front.removeChildren();
        this.back.removeChildren();


        // this.sprites[0]
        this.sprites[0].x = 200;
        this.sprites[0].y = -75;
        this.front.addChild(this.sprites[0]);

        // this.sprites[1]
        this.sprites[1].x = -65;
        // this.front.addChild(this.sprites[1]);

        // this.sprites[2]
        this.sprites[2].x = 111
        this.sprites[2].y = 50;
        this.front.addChild(this.sprites[2]);

        // this.sprites[3]
        this.sprites[3].x = -65;
        this.sprites[3].y = 100;
        this.front.addChild(this.sprites[3]);

        // this.sprites[4]
        this.sprites[4].x = -240;
        this.sprites[4].y = 150;
        this.front.addChild(this.sprites[4]);

        // this.sprites[5]
        this.sprites[5].x = 111;
        this.sprites[5].y = 150;
        this.front.addChild(this.sprites[5]);

        // this.sprites[6]
        this.sprites[6].x = -65;
        this.sprites[6].y = 200;
        this.front.addChild(this.sprites[6]);

        // this.sprites[7]
        this.sprites[7].x = -240;
        this.sprites[7].y = 250;
        this.front.addChild(this.sprites[7]);

        // this.sprites[8]
        this.sprites[8].x = -65;
        this.sprites[8].y = 300;
        this.front.addChild(this.sprites[8]);

        let r1 = Math.random()*250 + 800;
        let r2 = Math.random()*250 + 800;
        let r3 = Math.random()*250 + 800;

        createjs.Tween.get(this.sprites[0],{loop: true})
            .to({x: 200}, r1)
            .to({x: 60}, 50)
            .to({x: 60}, r1)
            .to({x: 200}, 50)

        createjs.Tween.get(this.sprites[5],{loop: true})
            .to({x: 111}, r2)
            .to({x: 161}, 50)
            .to({x: 161}, r2)
            .to({x: 111}, 50)

        createjs.Tween.get(this.sprites[8],{loop: true})
            .to({x: -65}, r3)
            .to({x: -10}, 50)
            .to({x: -10}, r3)
            .to({x: -65}, 50)

        createjs.Tween.get(this.sprites[6],{loop: true})
            .to({alpha: 1}, 2000)
            .to({alpha: 0}, 20)
            .to({alpha: 1}, 20)
        
            
    }

    t2(){
        this.front.removeChildren();
        this.back.removeChildren();

        this.sprites[0].x = -75;
        this.sprites[0].y = -50;
        this.front.addChild(this.sprites[0]);

        this.sprites[1].x = 100;
        this.sprites[1].y = 0;
        this.front.addChild(this.sprites[1]);

        this.sprites[2].x = 100;
        this.sprites[2].y = 100;
        this.front.addChild(this.sprites[2]);

        this.sprites[3].x = 100;
        this.sprites[3].y = 200;
        this.front.addChild(this.sprites[3]);

        this.sprites[4].x = -75;
        this.sprites[4].y = 150;
        this.front.addChild(this.sprites[4]);

        this.sprites[5].x = 100;
        this.sprites[5].y = 300;
        this.front.addChild(this.sprites[5]);

        this.sprites[6].x = -75;
        this.sprites[6].y = 350;
        this.front.addChild(this.sprites[6]);

        let r1 = Math.random()*250 + 800;
        let r2 = Math.random()*250 + 800;

        createjs.Tween.get(this.sprites[1],{loop: true})
            .to({x: 100}, r1)
            .to({x: 200}, 50)
            .to({x: 200}, r1)
            .to({x: 100}, 50)
        
        createjs.Tween.get(this.sprites[5],{loop: true})
            .wait(100)
            .to({x: 100}, r2)
            .to({x: 0}, 50)
            .to({x: 0}, r2)
            .to({x: 100}, 50)

        createjs.Tween.get(this.sprites[6],{loop: true})
            .to({x: -75}, r2)
            .to({x: -175}, 50)
            .to({x: -175}, r2)
            .wait(100)
            .to({x: -75}, 50)
    }

    t3(){}

    t4(){}
}