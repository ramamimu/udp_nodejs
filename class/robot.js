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
}

module.exports = Robot;
