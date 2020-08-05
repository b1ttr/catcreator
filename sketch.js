// Cat Creator
// qbttr & sweatersjpg


let folders = {
  "Accessories/Body/back": { count:4, content:"line base" },
  "Accessories/Body/collar": { count:5, content:"line base colour" },
  "Accessories/Hair":{ count:3, content:"line base" },
  "Accessories/Head":{ count:1, content:"base"},
  "Body": { count:1, content:"line base", patterns:13 , overlays:10 },
  "Ears": { count:5, content:"line base", patterns:3 , overlays:4, accents:1 },
  "Face/Eyes": { count:4, content:"line base" },
  "Face/Mouth": { count:4, content:"line" },
  "Face/Nose": { count:3, content:"line" },
  "Hair": { count:2, content:"line base" },
  "Head":{ count:1, content:"line base", patterns:4 , overlays:7, accents: 1, topaccents: 2},
  "Legs/LeftBack": { count:1, content:"line base", patterns:3 , overlays:4, overlaysMissing:[1,2,3] },
  "Legs/LeftFront": { count:1, content:"line base", patterns:3 , overlays:4 },
  "Legs/RightBack": { count:1, content:"line base", patterns:3 , overlays:4, patternsMissing:[2] },
  "Legs/RightFront": { count:1, content:"line base", patterns:3 , overlays:4 },
  "Tail":{ count:6, content:"line base", patterns:3, overlays:4 },
};

let uiFolders = {
  "UI/Accessories": {},
  "UI/Accessories/Body": { count:4 },
  "UI/Accessories/Collars": { count:5 },
  "UI/Accessories/Face": { count: 1 },
  "UI/Accessories/Head": { count: 3 },
  "UI/Body": { Base:1, Patterns:13, Overlays:10 },
  "UI/Ears": { Base:5, Patterns:3 , Overlays:4, Accents:1 },
  "UI/Face": {},
  "UI/Face/Eyes": { count:4 },
  "UI/Face/Mouth": { count:2 },
  "UI/Face/Nose": { count:3 },
  "UI/Hair": { Base:2 },
  "UI/Head": { Base:1, Patterns:4 , Overlays:7, "Accents 1":1, "Accents 2":2 },
  "UI/Front Legs": { Base:1, Patterns:3 , Overlays:4 },
  "UI/Back Legs": { Base:1, Patterns:3 , Overlays:4 },
  "UI/Tail": { Base:6, Patterns:3, Overlays:4 }
  // ,
  // "UI": [
  //   "background",
  //   "border",
  //   "box base",
  //   "box"
  // ]
}

let images = {};
images.width = 1024;
images.height = 1024;

let loading = true;
let stoppedLoading = false;
totalImages = 0;
let progress = 0;

function imageLoaded(img) {
  // if(img.width != images.width) img.resize(images.width, images.height);
  progress++;
  if(progress >= totalImages) {
    console.log("Loading took " + round(millis() / 1000 * 100)/100 + "s to load " + progress + " images");
    stoppedLoading = true;
  }
}

function imageFailed(img) {
  totalImages--;
}

function loadImages() {
  for (var k of Object.keys(folders)) {
    let folder = folders[k];
    n = k.toLowerCase();
    images[n] = new Array(folder.count);
    for (var i = 0; i < images[n].length; i++) {
      images[n][i] = getImages(i, k, folder);
    }
  }

  function getImages(index, path, info) {
    let prefix = "https://qbttr.github.io/catcreator/Assets/";
    let suffix = ".png";

    let item = {};

    for (var c of ["line", "base", "colour"])
    if(info.content.includes(c)) item[c] = loadImage(prefix+path+"/"+index+"/" +c+suffix, imageLoaded, imageFailed);

    for (var c of ["patterns", "overlays", "accents", "topaccents"])
    if(info.hasOwnProperty(c)) {
      item[c] = new Array(info[c]);
      for (var i = 0; i < item[c].length; i++)
      if(info.hasOwnProperty(c+"Missing") && info[c+"Missing"].includes(i)) item[c][i] = false;
      else item[c][i] = loadImage(prefix+path+"/"+index+"/"+c+"/"+i+suffix, imageLoaded, imageFailed);
    }

    return item;
  }

  images.ui = {};

  for (let k of Object.keys(uiFolders)) {
    let prefix = "https://qbttr.github.io/catcreator/Assets/";
    let suffix = ".png";
    let folder = uiFolders[k];
    let lk = k.toLowerCase();

    images.ui[lk] = {};
    images.ui[lk].base = loadImage(prefix+k+"/base"+suffix, imageLoaded, imageFailed);
    images.ui[lk].hover = loadImage(prefix+k+"/hover"+suffix, imageLoaded, imageFailed);
    images.ui[lk].plain = loadImage(prefix+k+"/plain"+suffix, imageLoaded, imageFailed);

    if(folder.hasOwnProperty("count")) {
      for (var i = 0; i < folder.count; i++) {
        images.ui[lk][i] = loadImage(prefix+k+"/"+i+suffix, imageLoaded, imageFailed);
      }
    }

    for (var c of ["Base", "Patterns", "Overlays", "Accents", "Accents 1", "Accents 2"])
    if(folder.hasOwnProperty(c)) {
      let lc = c.toLowerCase();
      images.ui[lk][lc] = {};
      images.ui[lk][lc].base = loadImage(prefix+k+"/"+c+"/base"+suffix, imageLoaded, imageFailed);
      images.ui[lk][lc].hover = loadImage(prefix+k+"/"+c+"/hover"+suffix, imageLoaded, imageFailed);
      images.ui[lk][lc].plain = loadImage(prefix+k+"/"+c+"/plain"+suffix, imageLoaded, imageFailed);
      for (var i = 0; i < folder[c]; i++) {
        images.ui[lk][lc][i] = loadImage(prefix+k+"/"+c+"/"+i+suffix, imageLoaded, imageFailed);
      }
    }
  }
}

let PALETTE = [
  "#2c2c2c", "#4c4c4c", "#6f6f6f", "#cdcdcd", "#f4f2ef",
  "#505865", "#969fb0", "#aeb8ca", "#cbd4e6", "#e4ecfd",
  "#726564", "#d7cabd", "#bfbece", "#a6bffa", "#b4bebf",
  "#413027", "#71564a", "#957160", "#b89a8b", "#b8a8a0",
  "#5e423d", "#9e655b", "#cb8679", "#f0a79a", "#ecbf8a",
  "#d5846f", "#e6ac8e", "#f9dabc", "#fef5da", "#ecd79c",
  "#ec575d", "#e47a80", "#f19cb6", "#f7cbca", "#caf6b7",
  "#ea9ee8", "#9a97f0", "#71a2f8", "#77c3af", "#dff79f",
  "#dbb9ed", "#cbc9f9", "#c5fcee", "#8ba38e", "#bac49a"
]
let colours = new Array(PALETTE.length);

function loadColours() {
  for (var i = 0; i < colours.length; i++) {
    colours[i] = createImage(1,1);
    colours[i].loadPixels();
    colours[i].set(0,0,color(PALETTE[i]));
    colours[i].updatePixels();
    colours[i].resize(images.width, images.height);
  }
}

let loadingImg;
let loadingImgLogo;
preImgLoaded = false;

function setup() {

  cvs = createCanvas(800,800);
  canvasElement = cvs.elt;
  ctx = canvasElement.getContext('2d');
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  p5.disableFriendlyErrors = true;

  loadingImgLogo = loadImage("https://qbttr.github.io/catcreator/Assets/UI/logoLoading.png");
  totalImages--;
  loadingImg = loadImage(
    "https://qbttr.github.io/catcreator/Assets/UI/loading.png",
    () => { preImgLoaded = true }
  );

  loadImage = (function() {
    var cached_function = loadImage;
    return function() {
      totalImages++;
      return cached_function.apply(this, arguments); // use .apply() to call it
    };
  })();

  loadColours();
  loadImages();

}

let defaultCatConfig = {
  "accessories/body/back": { index:-1 , base: 0 },
  "accessories/body/collar": { index:4, base: 14 },
  "accessories/hair":{ index:0, base:44 },
  "accessories/head":{ index:-1, base:0 },
  "body": { index:0, base:19, pattern:2, overlay:1, patternClr:2, overlayClr:4 },
  "ears": {
    index:0, base:19, pattern:0, overlay:0, accent:0,
    patternClr:2, overlayClr:4, accentClr:4
  },
  "face/eyes": { index:0, base:34 },
  "face/mouth": { index:0 },
  "face/nose": { index:0 },
  "hair": { index:0, base:4 },
  "head": {
    index:0, base:19, pattern:3, overlay:0, accent:-1, topaccent:0,
    patternClr:3, overlayClr:4, accentClr:0, topaccentClr:2
  },
  "legs/leftfront": { index:0, base:19, pattern:1, overlay:0, patternClr:3, overlayClr:4 },
  "legs/rightfront": { index:0, base:19, pattern:1, overlay:0, patternClr:3, overlayClr:4 },
  "legs/leftback": { index:0, base:19, pattern:-1, overlay:-1, patternClr:0, overlayClr:0 },
  "legs/rightback": { index:0, base:19, pattern:-1, overlay:-1, patternClr:0, overlayClr:0 },
  "tail": { index:0, base:19, pattern:2, overlay:0, patternClr:2, overlayClr:4 },
}

let catConfig = Object.assign({}, defaultCatConfig);

let masterCat;

function draw() {
  background(color("#ffc2b8"));

  if(stoppedLoading) {
    loading = false;
    stoppedLoading = false;
    changeCat();
  }
  if(loading && preImgLoaded) {
    let w = 300;
    noStroke();
    fill("#f4f2ef");
    rect(width/2-w/2, height/2-w/2, w, w);
    fill(color("#ff9f8f"));
    let length = map(progress, 0, totalImages, 0, w);
    rect(width/2-w/2, height/2-w/2, length, w);

    image(loadingImg, width/2-w/2, height/2-w/2, w, w);
    image(loadingImgLogo, width/2-w/2, height/2-w/2, w, w);
    return;
  } else if(loading) return;

  drawCat(masterCat);
  noLoop();
}
