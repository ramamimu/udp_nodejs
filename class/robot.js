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
  ball_next_x = 9999;
  ball_next_y = 9999;
  robot_next_x = 9999;
  robot_next_y = 9999;
  goalkeeper_field_x = 9999;
  goalkeeper_field_y = 9999;
  pass_target_x = 9999;
  pass_target_y = 9999;
  pos_obs_length = 10;
  pos_obs = [
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
    index_point,
    obs_length,
    obs,
    battery_health,
    goalkeeper_field_x,
    goalkeeper_field_y,
    ball_next_x,
    ball_next_y,
    robot_next_x,
    robot_next_y,
    pass_target_x,
    pass_target_y,
    pos_obs_length,
    pos_obs
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
    this.index_point = index_point;
    this.obs_length = obs_length;
    this.obs = [...obs];
    this.battery_health = battery_health;
    this.goalkeeper_field_x = goalkeeper_field_x;
    this.goalkeeper_field_y = goalkeeper_field_y;
    this.ball_next_x = ball_next_x;
    this.ball_next_y = ball_next_y;
    this.robot_next_x = robot_next_x;
    this.robot_next_y = robot_next_y;
    this.pass_target_x = pass_target_x;
    this.pass_target_y = pass_target_y;
    this.pos_obs_length = pos_obs_length;
    this.pos_obs = [...pos_obs];
  }
}

module.exports = Robot;
