// Cat Creator
// qbttr


let folders = {
  "Accessories/Body/back": { count:4, content:"line base" },
  "Accessories/Body/collar": { count:5, content:"line base colour" },
  "Accessories/Hair":{ count:3, content:"line base" },
  "Accessories/Head":{ count:1, content:"base"},
  "Body": { count:1, content:"line base", patterns:13 , overlays:10 },
  "Ears": { count:5, content:"line base", patterns:3 , overlays:4 },
  "Face/Eyes": { count:4, content:"line base" },
  "Face/Mouth": { count:4, content:"line" },
  "Face/Nose": { count:3, content:"line" },
  "Hair": { count:2, content:"line base" },
  "Head":{ count:1, content:"line base", patterns:5 , overlays:7, accents: 3},
  "Legs/LeftBack": { count:1, content:"line base", patterns:3 , overlays:4 },
  "Legs/LeftFront": { count:1, content:"line base", patterns:3 , overlays:4 },
  "Legs/RightBack": { count:1, content:"line base", patterns:3 , overlays:4 },
  "Legs/RightFront": { count:1, content:"line base", patterns:3 , overlays:4 },
  "Tail":{ count:6, content:"line base", patterns:3, overlays:4 },
};

let images = {};

function preload() {

  for (var k of Object.keys(folders)) {
    let folder = folders[k];
    n = k.toLowerCase();
    images[n] = new Array(folder.count);
    for (var i = 0; i < images[n].length; i++) {
      images[n][i] = getImages(i, k, folder);
    }
  }

  function getImages(count, path, info) {
    let prefix = "https://qbttr.github.io/catcreator/Assets/";
    let suffix = ".png";

    let item = {};

    for (var c of ["line", "base", "colour"])
    if(info.content.includes(c)) item[c] = loadImage(prefix+path+"/"+count+"/" +c+suffix);

    for (var c of ["patterns", "overlays", "accents"])
    if(info.hasOwnProperty(c)) {
      item[c] = new Array(info[c]);
      for (var i = 0; i < item[c].length; i++)
      item[c][i] = loadImage(prefix+path+"/"+count+"/"+c+"/"+i+suffix);
    }

    return item;
  }

}

function init() {
  // createCanvas(100,100);


}

function draw() {
  // background(0);


}
