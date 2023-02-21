class Robot {
  epoch = 0;
  pos_x = 9999;
  pos_y = 9999;
  theta = 9999;
  status_bola = 0;
  bola_x = 9999;
  bola_y = 9999;
  robot_condition = 9999;
  target_umpan = 0;
  status_algoritma = 9999;
  status_sub_algoritma = 9999;
  status_sub_sub_algoritma = 9999;
  status_sub_sub_sub_algoritma = 9999;
  obs_x = [9999, 9999, 9999, 9999, 9999];
  obs_y = [9999, 9999, 9999, 9999, 9999];
  obs_length = 10;
  obs = [
    [9999, 9999],
    [9999, 9999],
    [9999, 9999],
    [9999, 9999],
    [9999, 9999],
    [9999, 9999],
    [9999, 9999],
    [9999, 9999],
    [9999, 9999],
    [9999, 9999],
  ];
  index_point = 9999;
  battery_health = 0;
  v = 10;

  constructor(
    epoch,
    pos_x,
    pos_y,
    theta,
    status_bola,
    bola_x,
    bola_y,
    robot_condition,
    target_umpan,
    status_algoritma,
    status_sub_algoritma,
    status_sub_sub_algoritma,
    status_sub_sub_sub_algoritma,
    obs_x,
    obs_y,
    obs_length,
    obs,
    index_point,
    battery_health
  ) {
    this.epoch = epoch;
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.theta = theta;
    this.status_bola = status_bola;
    this.bola_x = bola_x;
    this.bola_y = bola_y;
    this.robot_condition = robot_condition;
    this.target_umpan = target_umpan;
    this.status_algoritma = status_algoritma;
    this.status_sub_algoritma = status_sub_algoritma;
    this.status_sub_sub_algoritma = status_sub_sub_algoritma;
    this.status_sub_sub_sub_algoritma = status_sub_sub_sub_algoritma;
    this.obs_x = [...obs_x];
    this.obs_y = [...obs_y];
    this.obs_length = obs_length;
    this.obs = [...obs];
    this.index_point = index_point;
    this.battery_health = battery_health;
  }

  setV(v) {
    this.v = v;
  }

  setPos(x, y, theta) {
    this.pos_x = x;
    this.pos_y = y;
    this.theta = theta;
  }

  goTo(x, y, theta) {
    let dx = x - this.pos_x;
    let dy = y - this.pos_y;

    let d = Math.sqrt(dx * dx + dy * dy);
    let vx, vy, v_theta;
    if (this.pos_x > x) {
      vx = -this.v;
    } else if (this.pos_x < x) {
      vx = this.v;
    } else {
      vx = 0;
    }

    if (this.pos_y > y) {
      vy = -this.v;
    } else if (this.pos_y < y) {
      vy = this.v;
    } else {
      vy = 0;
    }

    if (this.theta > theta) {
      v_theta = -this.v;
    } else if (this.theta < theta) {
      v_theta = this.v;
    } else {
      v_theta = 0;
    }

    this.pos_x += vx;
    this.pos_y += vy;
    this.theta += v_theta * 0.3;
  }
}

module.exports = Robot;
