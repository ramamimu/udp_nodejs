var th1 = 90;
var th2 = 0;

var go;

go = Math.abs(th1 - th2);

if (go > 180) {
  go = 360 - go;
}

go = (go - 180) / (0 - 180);

console.log(go);
