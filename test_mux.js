const n_robot_aktif = 4;
const n_robot_dekat_bola = 5;
const n_robot_dapat_bola = 1;
const n_robot_sendiri = 3;
const n_robot_teman = 1;
const n_attacker_left = 3;

let mux = 0;
let conversion = 6;

mux += n_robot_aktif;
mux += n_robot_dekat_bola * conversion;
mux += n_robot_dapat_bola * conversion * conversion;
mux += n_robot_sendiri * conversion * conversion * conversion;
mux += n_robot_teman * conversion * conversion * conversion * conversion;
mux +=
  n_attacker_left *
  conversion *
  conversion *
  conversion *
  conversion *
  conversion;

for (let i = 0; i < conversion; i++) {
  console.log(Math.floor((mux / conversion ** i) % conversion));
}

console.log(mux);
