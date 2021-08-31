# SDVX Live2D Wallpaper
SDVX Live2D Wallpaper for [Wallpaper Engine](https://store.steampowered.com/app/431960/Wallpaper_Engine/), support all Live2D models from SDVX VI 2021062900  
  
![screenshot1](screenshot1.jpg)
![screenshot2](screenshot2.png)
![screenshot3](screenshot3.jpg)
![screenshot4](screenshot4.jpg)


## Install
- Download repo.
- Download `live2dcubismcore.min.js` from [here](https://www.live2d.com/download/cubism-sdk/download-web/), and put it in `assets/js/`.
- Get your SDVX Live2D models from somewhere, and put them in `assets/live2d/`.
- Download BGM from [here](https://www.youtube.com/watch?v=tBd_QlnYwNg), or any mp3 you want, put it in `assets/sound/bgm.mp3`.
- Get your SDVX `testbg2_fhd.wmv` from somewhere, or any background video you want, convert it to webm format and put it in `assets/background/bg.webm`.
- Get your favorite SDVX wallpaper image, and put it in `assets/background/bg.jpg`.
- Import folder to Wallpaper Engine. 

## Features
- Loading model from SDVX.
- Clicking on model gives motion reaction.
- Support X,Y cordinate and size adjustment in Wallpaper Engine.(Some model would be too big or small)

## Future Features
- [ ] Auto random motions.
- [ ] Allow edit click motion reaction.(Currently only support "Confirm" motion)
- [ ] Precise X,Y,and size adjustment.
- [x] Fix changing models bug.


## Credits
- Default `bg.webm` is taken from [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=1940540424)
- Live2D framework from [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display), if you like this work, don't forget to star this project too!
