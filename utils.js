
function time(fn) {
  let startTime = new Date();
  args = [].slice.call(arguments);
  args.shift();
  let output = window[fn](...args);
  console.log(fn+" took "+(Math.round((new Date()-startTime)/1000*100)/100)+"s to execute");
  return output;
}
