class Robot {
  epoch = 0;
  pos_x = 9999;
  pos_y = 9999;
  theta = 9999;
  status_bola = 0;
  bola_x = 9999;
  bola_y = 9999;

  constructor(epoch, pos_x, pos_y, theta, status_bola, bola_x, bola_y) {
    this.epoch = epoch;
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.theta = theta;
    this.status_bola = status_bola;
    this.bola_x = bola_x;
    this.bola_y = bola_y;
  }
}

module.exports = Robot;
