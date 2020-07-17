
function time(fn) {
  let startTime = new Date();
  args = [].slice.call(arguments);
  args.shift();
  let output = window[fn](...args);
  console.log(fn+" took "+(Math.round((new Date()-startTime)/1000*100)/100)+"s to execute");
  return output;
}

let fn_avgs = {};

function timeAVG(fn) {
  args = [].slice.call(arguments);
  args.shift();

  let startTime = new Date();
  let output = window[fn](...args);
  let time = new Date()-startTime;

  if (fn in fn_avgs) {
    fn_avgs[fn].a = fn_avgs[fn].a + (time - fn_avgs[fn].a) / fn_avgs[fn].n++;
  } else fn_avgs[fn] = {a:time, n:1}

  console.log(
    fn+" took "+Math.round(time/1000*100)/100+
    "s and takes "+Math.round(fn_avgs[fn].a/1000*100)/100+"s on average to execute"
  );
  return output;
}
