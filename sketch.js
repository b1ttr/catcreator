// Cat Creator
// qbttr


let folders = {
  "Accessories/Body/back": { count:4, content:"line base" },
  "Accessories/Body/collar": { count:5, content:"line base colour" },
  "Accessories/Hair":{ count:3, content:"line base" },
  "Accessories/Head":{ count:1, content:"colour"},
  "Body": { count:1, content:"line base", patterns:13 , overlays:10 },
  "Ears": { count:5, content:"line base", patterns:3 , overlays:4, accents:1, accentsMissing: [0] },
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

let images = {};
images.width = 1024;
images.height = 1024;

let loading = true;
let totalImages = 221;
let progress = 0;

function imageLoaded(img) {
  if(img.width != images.width) img.resize(images.width, images.height);
  progress++;
  if(progress >= totalImages) loading = false;
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
    if(info.content.includes(c)) item[c] = loadImage(prefix+path+"/"+index+"/" +c+suffix, imageLoaded);

    for (var c of ["patterns", "overlays", "accents", "topaccents"])
    if(info.hasOwnProperty(c)) {
      item[c] = new Array(info[c]);
      for (var i = 0; i < item[c].length; i++)
      if(info.hasOwnProperty(c+"Missing") && info[c+"Missing"].includes(i)) item[c][i] = false;
      else item[c][i] = loadImage(prefix+path+"/"+index+"/"+c+"/"+i+suffix, imageLoaded);
    }

    return item;
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

let firstCat;

function setup() {

  cvs = createCanvas(800,800);
  // canvasElement = cvs.elt;
  // ctx = canvasElement.getContext('2d');
  // ctx.mozImageSmoothingEnabled = false;
  // ctx.webkitImageSmoothingEnabled = false;
  // ctx.msImageSmoothingEnabled = false;
  // ctx.imageSmoothingEnabled = false;
  //
  // p5.disableFriendlyErrors = true;

  loadColours();
  loadImages();

}

let timer = 0;

function draw() {
  background(100);

  if(loading) {
    fill(100);
    let w = map(progress, 0, totalImages, 0, width)
    rect(0, 0, w, height);
    return;
  }

  firstCat = {
    "accessories/body/back": { index:-1 , base: 0 },
    "accessories/body/collar": { index:1, base: 0 },
    "accessories/hair":{ index:-1, base:0 },
    "accessories/head":{ index:-1, base:0 },
    "body": { index:0, base:0, pattern:0, overlay:0, patternClr:0, overlayClr:0 },
    "ears": {
      index:0, base:0, pattern:0, overlay:0, acctent:0,
      patternClr:0, overlayClr:0, acctentClr:0
    },
    "face/eyes": { index:0, base:0 },
    "face/mouth": { index:0 },
    "face/nose": { index:0 },
    "hair": { index:0, base:0 },
    "head": {
      index:0, base:0, pattern:0, overlay:0, acctent:0, topacctent:0,
      patternClr:0, overlayClr:0, acctentClr:0, topacctentClr:0
    },
    "legs/leftback": { index:0, base:0, pattern:0, overlay:0, patternClr:0, overlayClr:0 },
    "legs/leftfront": { index:0, base:0, pattern:0, overlay:0, patternClr:0, overlayClr:0 },
    "legs/rightback": { index:0, base:0, pattern:0, overlay:0, patternClr:0, overlayClr:0 },
    "legs/rightfront": { index:0, base:0, pattern:0, overlay:0, patternClr:0, overlayClr:0 },
    "tail": { index:0, base:0, pattern:0, overlay:0, patternClr:0, overlayClr:0 },
  }

  for (var k of Object.keys(folders)) {
    let lk = k.toLowerCase();
    if(lk.includes("accessories")) firstCat[lk].index = floor(random(-1,folders[k].count));
    else firstCat[lk].index = floor(random(folders[k].count));
    console.log(lk + " " + firstCat[lk]);
    for (var c of ["pattern", "overlay", "accent", "topaccent"])
    if(firstCat[lk].hasOwnProperty(c)) firstCat[lk][c] = floor(random(folders[k][c+"s"]));
  }

  timer = millis();
  console.log("start genCat");

  let cat = genCat(firstCat);

  console.log("genCat took: " + (millis() - timer)/1000 + "s");

  for (var i of cat) {
    image(i, 0, 0, width, height);
  }
  // image(cat, 0, 0, width, height);

  noLoop();

}

function genCat(cat) {
  let I = images;

  // create master image
  // let master = createImage(images.width, images.height);
  let master = [];

  part("legs/leftback");
  part("legs/leftfront");

  part("tail");

  part("body");

  part("accessories/body/collar");
  part("accessories/body/back");

  part("legs/rightback");
  part("legs/rightfront");

  part("head");
  part("face/mouth");
  part("face/nose");
  part("face/eyes");
  part("accessories/head");

  part("ears");
  part("hair");
  part("accessories/hair");


  function part(p) {
    if(cat[p].index < 0) return;
    let part = I[p][cat[p].index];
    console.log(p + " " + cat[p].index);
    // for (var c of ["base", "line", "colour"])
    // if(part.hasOwnProperty(c)) add(part[c], c == "base" ? cat[p].base:'plain');
    if(part.hasOwnProperty("base")) add(part.base, cat[p].base);

    for (var c of ["pattern", "overlay", "accent", "topaccent"])
    if(part.hasOwnProperty(c+"s") && part[c+"s"][cat[p][c]]) add(part[c+"s"][cat[p][c]], cat[p][c+"Clr"]);

    for (var c of ["colour", "line"])
    if(part.hasOwnProperty(c)) add(part[c], 'plain');

    function add(img, clr) {
      let temp = createImage(img.width, img.height);

      if(clr == 'plain') {
        // master.blend(img, 0,0,img.width,img.height,0,0,img.width,img.height, NORMAL);
        // master.copy(img, 0,0,img.width,img.height,0,0,img.width,img.height);
        master.push(img);
      } else {
        //  .blend() it with color on normal
        temp.copy(colours[floor(random(45))], 0,0,img.width,img.height,0,0,img.width,img.height);

        //  .mask() that color clone with layer/pattern
        // let temp = createImage(1,1);
        // temp.loadPixels();
        // temp.set(0,0,color(PALETTE[clr]));
        // temp.updatePixels();
        // temp.resize(images.width, images.height);

        temp.mask(img);
        //  .blend() master with it on normal
        // master.blend(temp, 0,0,img.width,img.height,0,0,img.width,img.height, NORMAL);
        // master.copy(temp, 0,0,img.width,img.height,0,0,img.width,img.height);
        master.push(temp);
      }
    }
  }

  return master; //master image
}
