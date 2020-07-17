
function drawCat(catImg) {
  for (var p in catImg) if (catImg.hasOwnProperty(p) && catImg[p])
  for (var i of catImg[p]) {
    image(i, 45, 40, width, height);
  }
}

function changePart(p) {
  time("genPart", p);
  loop();
}

function genPart(p) {
  let cat = catConfig;
  let imgs = masterCat;
  if(cat[p].index < 0) {
    imgs[p] = false;
    return;
  }
  let part = images[p][cat[p].index];

  imgs[p] = [];

  if(part.hasOwnProperty("base")) add(part.base, cat[p].base);

  for (var c of ["pattern", "overlay", "accent", "topaccent"])
  if(part.hasOwnProperty(c+"s") && part[c+"s"][cat[p][c]] && cat[p][c] != -1)
  add(part[c+"s"][cat[p][c]], cat[p][c+"Clr"]);

  for (var c of ["colour", "line"])
  if(part.hasOwnProperty(c)) add(part[c], 'plain');

  function add(img, clr) {
    if(clr == 'plain') {
      // imgs.copy(img, 0,0,img.width,img.height,0,0,img.width,img.height);
      imgs[p].push(img);
    } else {
      // let temp = createImage(img.width, img.height);
      // temp.copy(colours[clr], 0,0,img.width,img.height,0,0,img.width,img.height);
      let temp = colours[clr].get();
      temp.mask(img);
      // imgs.copy(temp, 0,0,img.width,img.height,0,0,img.width,img.height);
      imgs[p].push(temp);
    }
  }
}

function changeCat() {
  timeAVG("genCat");
  loop();
}

function genCat() {
  masterCat = {};
  genPart("legs/leftback");
  genPart("legs/leftfront");
  genPart("tail");
  genPart("body");
  genPart("accessories/body/collar");
  genPart("accessories/body/back");
  genPart("legs/rightback");
  genPart("legs/rightfront");
  genPart("head");
  genPart("face/mouth");
  genPart("face/nose");
  genPart("accessories/head");
  genPart("ears");
  genPart("face/eyes");
  genPart("hair");
  genPart("accessories/hair");
}

function randomizeCat(cat) {
  let pals = [
    [9,10,11,12,33],
    [40,41,28,4],
    [23,27,19,2],
    [32,33,28],
    [22,18,23],
    [34,39,40,41,42,43]
  ];
  let pal = random(pals);

  for (var k in folders) {
    let lk = k.toLowerCase();
    if(lk.includes("accessories") || lk.includes("hair"))
    cat[lk].index = floor(random(-1,folders[k].count));
    else cat[lk].index = floor(random(folders[k].count));
    if(cat[lk].hasOwnProperty("base")) cat[lk].base = floor(random(pal));
    for (var c of ["pattern", "overlay", "accent", "topaccent"])
    if(cat[lk].hasOwnProperty(c)) {
      cat[lk][c] = floor(random(folders[k][c+"s"]));
      cat[lk][c+"Clr"] = floor(random(pal));
    }
  }
  cat["legs/leftback"] = Object.assign({}, cat["legs/rightback"]);
  cat["legs/leftfront"] = Object.assign({}, cat["legs/rightfront"]);
}
