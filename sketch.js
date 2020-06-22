// Cat Creator
// qbttr


let folders = {
  "Accessories/Body/back": { count:4, content:"line base" },
  "Accessories/Body/collar": { count:5, content:"line base colour" },
  "Accessories/Hair":{ count:3, content:"line base" },
  "Accessories/Head":{ count:1, content:"base"},
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
images.width = 2048;
images.height = 2048;

let loading = true;
let totalImages = 221;
let progress = 0;

function imageLoaded() {
  progress++;
  if(progress >= totalImages) loading = false;
}

function loadCat() {
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

function loadColours() {

}

function setup() {
  createCanvas(500,500);

  loadCat();

  let cat = {
    "Accessories/Body/back": { index:-1 , base: 0 },
    "Accessories/Body/collar": { index:0, base: 0 },
    "Accessories/Hair":{ index:-1, base:0 },
    "Accessories/Head":{ index:-1, base:0 },
    "Body": { index:0, base:0, pattern:0, overlay:0, patternClr:0, overlayClr:0 },
    "Ears": {
      index:0, base:0, pattern:0, overlay:0, acctent:0,
      patternClr:0, overlayClr:0, acctentClr:0
    },
    "Face/Eyes": { index:0, base:0 },
    "Face/Mouth": { index:0 },
    "Face/Nose": { index:0 },
    "Hair": { index:0, base:0 },
    "Head": {
      index:0, base:0, pattern:0, overlay:0, acctent:0, topacctent:0,
      patternClr:0, overlayClr:0, acctentClr:0, topacctentClr:0
    },
    "Legs/LeftBack": { index:0, base:0, pattern:0, overlay:0, patternClr:0, overlayClr:0 },
    "Legs/LeftFront": { index:0, base:0, pattern:0, overlay:0, patternClr:0, overlayClr:0 },
    "Legs/RightBack": { index:0, base:0, pattern:0, overlay:0, patternClr:0, overlayClr:0 },
    "Legs/RightFront": { index:0, base:0, pattern:0, overlay:0, patternClr:0, overlayClr:0 },
    "Tail":{ index:0, base:0, pattern:0, overlay:0, patternClr:0, overlayClr:0 },
  }

}

function draw() {
  background(0);

  if(loading) {
    fill(100);
    let w = map(progress, 0, totalImages, 0, width)
    rect(0, 0, w, height);
    return;
  }

  noLoop();

}

function genCat(cat) {
  let I = images;

  // create master image
  let master = createImage(I.width, I.height);

  function part(p) {
    let part = I[p][cat[p].index];
    for (var c of ["base", "colour", "line"])
    if(part.hasOwnProperty(c)) add(part[c], c == "base" ? cat[p].base:'plain');

    for (var c of ["pattern", "overlay", "accent", "topaccent"])
    if(part.hasOwnProperty(c+"s") && part[c+"s"][cat[p][c]]) add(part[c+"s"][cat[p][c]], cat[p][c+"Clr"]);

    function add(img, clr) {
      let temp = createImage(img.width, img.height);

      if(clr == 'plain') {
        master.blend(img, 0,0,img.width,img.height,0,0,img.width,img.height, NORMAL);
      } else {
        //  .blend() it with color on normal
        temp.blend(colours[clr], 0,0,img.width,img.height,0,0,img.width,img.height, NORMAL);
        //  .mask() that color clone with layer/pattern
        temp.mask(img);
        //  .blend() master with it on normal
        master.blend(temp, 0,0,img.width,img.height,0,0,img.width,img.height, NORMAL);
      }
    }
  }

  return cat; //master image
}

function drawCat(cat) {
  // just refference!!!!!!!!

  // img(cat["legs/leftback"][0].base);
  // img(cat["legs/leftback"][0].line);
  // img(cat["legs/leftfront"][0].base);
  // img(cat["legs/leftfront"][0].line);
  //
  // img(cat["tail"][0].base);
  // img(cat["tail"][0].line);
  //
  // img(cat["body"][0].base);
  // img(cat["body"][0].line);
  //
  // img(cat["legs/rightback"][0].base);
  // img(cat["legs/rightback"][0].line);
  // img(cat["legs/rightfront"][0].base);
  // img(cat["legs/rightfront"][0].line);
  //
  // img(cat["head"][0].base);
  // img(cat["head"][0].line);
  //
  // img(cat["face/mouth"][0].line);
  // img(cat["face/nose"][0].line);
  // img(cat["face/eyes"][0].base);
  // img(cat["face/eyes"][0].line);

  // img(cat["ears"][0].base);
  // img(cat["ears"][0].line);
  //
  // img(cat["hair"][0].base);
  // img(cat["hair"][0].line);

  function img(path) {
    image(path, 0, 0, width, height);
  }
}
