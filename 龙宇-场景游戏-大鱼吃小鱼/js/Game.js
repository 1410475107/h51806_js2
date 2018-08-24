function Game() {   //大鱼吃小鱼游戏 构造函数
  this.fishes1 = new Set;
  this.fishes2 = new Set;
  this.bullets = new Set;
  this.score = 0;
  this.lost = 0;
  this.start = false;
  this.index = 0;

  setInterval(this.setFish1, 500, this);
  setInterval(() => {
    if (!this.start)
      return;
    const mx = this.playerX;
    const my = this.playerY;
    this.fishes1.forEach(x => {
      if (this.moveFish1(x)) {
        x.fish.remove();
        this.fishes1.delete(x);
        this.lost += 1;
        this.scoreBoard.innerHTML = "得分：" + (this.score - this.lost) + "分";
        return;
      }
      const tx = x.x;
      const ty = x.y;
      if ((mx - tx) ** 2 + (my - ty) ** 2 < 500) {
        x.fish.remove();
        this.fishes1.delete(x);
        this.score += 10;
        this.scoreBoard.innerHTML = "得分：" + (this.score - this.lost) + "分";
      }
    });
    this.fishes2.forEach(x => {
      const tx = x.x;
      const ty = x.y;
      if ((mx - tx) ** 2 + (my - ty) ** 2 < 500) {
        this.start = false;
        this.gameOver();
      }
      if ((mx - tx) ** 2 + (my - ty) ** 2 < 50000) {
        this.change(mx, my, x);
      } else {
        this.moveFish2(x);
      }
    });
    if ((this.score + 110) % 100 == 0) {
      this.score += 10;
      (this.setFish2(this));
      this.index++;
    }

    if (this.index == 3) {
      (this.Bullet(this));
      this.index = 0;
    }
    this.bullets.forEach(x => {
      const bx = this.bulletX;
      const by = this.bulletY;
      if (this.moveBullet()) {
        x.bullet.remove();
        this.bullets.delete(x);
        return
      }
      this.fishes2.forEach(x => {
        this.moveBullet();
        const tx = x.x;
        const ty = x.y;
        if ((bx - tx) ** 2 + (by - ty) ** 2 < 1000) {
          x.fish.remove();
          this.fishes2.delete(x);
        }
      })
    })
  }, 10, this);
}

Game.prototype = {
  //初始化函数
  init: function () {
    this.initGame();
    this.gameStart();
    this.initMap();
    //this.initPlayer();
  },
  //初始化游戏
  initGame: function () {
    game = document.createElement('div');
    game.setAttribute("id", "box");
    const overlay = document.createElement('div');
    overlay.setAttribute("id", "overlay");
    game.appendChild(overlay);
    document.body.appendChild(game);
    this.scoreBoard = document.createElement('span');
    this.scoreBoard.setAttribute("id", "score");
    this.scoreBoard.innerHTML = "得分：" + this.score + "分";
    game.appendChild(this.scoreBoard);
  },
//初始化游戏地图
  initMap: function () {
    const imgs = ['img/bg.jpg', 'img/bg1.jpg'];

    const box = document.getElementById('box');
    let imgBox = imgs.map((s, i) => {
      const img = document.createElement('img');
      img.style.width = '1180px';
      img.style.height = '640px';
      img.src = s;
      img.style.position = "absolute";
      const imgX = 1180 * i;
      img.style.left = imgX + 'px';
      box.appendChild(img);
      return {img, imgX};
    });
    requestAnimationFrame(run);

    function run() {
      imgBox.forEach(function (box) {
        box.imgX += 1;

        if (box.imgX >= 1180) {
          box.imgX -= 1180 * imgBox.length;
        }
        box.img.style.left = box.imgX + 'px';
      });
      requestAnimationFrame(run)
    }
  },
//初始化玩家
  initPlayer: function () {
    let player = document.createElement('img');
    player.setAttribute('id', 'player');
    player.src = 'img/player_right.png';
    player.style.left = this.playerX + "px";
    player.style.top = this.playerY + "px";
    document.querySelector("#overlay").appendChild(player);
    document.querySelector("#overlay").onmousemove = mouseMove;
    let mousePos = {x: 0, y: 0};
    let direction = 0;

    this.playerX = 0;
    this.playerY = 0;

    this.getDirection = function () {
      return direction;
    };

    function mousePosition(ev) {
      const [{x, y}] = document.querySelector("#overlay").getClientRects();
      return {x: ev.pageX - x, y: ev.pageY - y};
    }

    const move = () => {
      if (this.playerX < mousePos.x && this.playerX < 1130) {
        this.playerX += 10;
        player.style.left = this.playerX + "px";
        player.src = 'img/player_right.png';
        direction = 1;
        if (this.playerX > mousePos.x) {
          this.playerX = mousePos.x;
          player.style.left = this.playerX + "px";
        }
      } else if (this.playerX > mousePos.x && this.playerX > 0) {
        this.playerX -= 10;
        player.style.left = this.playerX + "px";
        player.src = 'img/player_left.png';
        direction = 2;
        if (this.playerX < mousePos.x) {
          this.playerX = mousePos.x;
          player.style.left = this.playerX + "px";
        }
      }

      if (this.playerY < mousePos.y && this.playerY < 600) {
        this.playerY += 10;
        player.style.top = this.playerY + "px";
        if (this.playerY > mousePos.y) {
          this.playerY = mousePos.y;
          player.style.top = this.playerY + "px";
        }
      } else if (this.playerY > mousePos.y && this.playerY > 0) {
        this.playerY -= 10;
        player.style.top = this.playerY + "px";
        if (this.playerY < mousePos.y) {
          this.playerY = mousePos.y;
          player.style.top = this.playerY + "px";
        }
      }
    };
    setInterval(move, 3);

    function mouseMove(ev) {
      ev = ev || window.event;
      mousePos = mousePosition(ev);
    }
  },
//游戏结束
  gameOver: function () {
    gameover = document.createElement('div');
    gameover.setAttribute('id', 'over');
    gameover.innerHTML = "GAME　OVER" + "<br>" + "得分：" + (this.score - this.lost) + "分";
    game.appendChild(gameover);
    resetButton = document.createElement('button');
    resetButton.setAttribute('id', 'reset');
    resetButton.innerHTML = "吃不下了";
    resetButton.onclick = function () {
      location.reload();
    };
    resetButton.onmouseover = function () {
      resetButton.innerHTML = "再吃一口！";
    };
    resetButton.onmouseleave = function () {
      resetButton.innerHTML = "吃不下了";
    };
    game.appendChild(resetButton);
  },
//游戏开始
  gameStart: function () {
    let This = this;
    startButton = document.createElement('button');
    startButton.setAttribute("id", "start1");
    startButton.onclick = function () {
      startButton.style.display = "none";
      This.initPlayer();
      This.start = true;
      game.style.cursor = "none";
    };
    game.appendChild(startButton);
    let span = document.createElement('span');
    span.innerHTML = "开始游戏";
    startButton.appendChild(span);
  },
//添加吃的鱼
  setFish1: function (This) {
    if (!This.start)
      return;
    This.fish1X = 0;
    This.fish1Y = 0;
    let index = 201;
    let random;
    let speed = 0.5;
    let speedX;
    let fish1 = document.createElement('img');
    fish1.setAttribute('id', 'fishl');
    game.appendChild(fish1);
    random = Math.floor(Math.random() * 2);
    speedX = Math.floor(Math.random() * 5) + 0.5;
    if (random == 1) {
      fish1.src = "img/fish1_left.png";
      var ranr = Math.floor(Math.random() * 500 + 50);
      This.fish1X = 1230;
      This.fish1Y = ranr;
      fish1.style.left = This.fish1X + "px";
      fish1.style.top = This.fish1Y + "px";
    } else {
      fish1.src = "img/fish1_right.png";
      var ranr = Math.floor(Math.random() * 500 + 50);
      This.fish1X = -50;
      This.fish1Y = ranr;
      fish1.style.left = This.fish1X + "px";
      fish1.style.top = This.fish1Y + "px";
    }
    This.fishes1.add({fish: fish1, x: This.fish1X, y: This.fish1Y, r: random, sx: speedX, sy: speed});
    This.moveFish1 = function (objfish1) {
      if (objfish1.r == 1) {
        if (index > 150) {
          var rany = Math.floor(Math.random() * 2);
          if (rany == 0) {
            objfish1.sy = -objfish1.sy;
          }
          index = 0;
        }
        objfish1.x -= objfish1.sx;
      } else {
        if (index > 150) {
          var rany = Math.floor(Math.random() * 2);
          if (rany == 0) {
            objfish1.sy = -objfish1.sy;
          }
          index = 0;
        }
        objfish1.x += objfish1.sx;
      }
      index++;
      objfish1.y += objfish1.sy;
      objfish1.fish.style.left = objfish1.x + "px";
      objfish1.fish.style.top = objfish1.y + "px";
      if (objfish1.x < -50 || objfish1.x > 1280) {
        return true;
      }
      if (objfish1.y < 0 || objfish1.y > 600) {
        objfish1.sy = -objfish1.sy;
      }
    };
  },
//添加吃玩家的鱼
  setFish2: function (This) {
    This.fish2X = 0;
    This.fish2Y = 0;
    let index = 201;
    let ranx;
    let random;
    let speed = 1;
    let fish2 = document.createElement('img');
    fish2.setAttribute('id', 'fish2');
    game.appendChild(fish2);
    random = Math.floor(Math.random() * 2);
    if (random == 1) {
      ranx = 1;
    } else {
      ranx = -1;
    }
    if (ranx == 1) {
      fish2.src = "img/fish2_left.png";
      var ranr = Math.floor(Math.random() * 500 + 50);
      This.fish2X = 1180;
      This.fish2Y = ranr;
      fish2.style.left = This.fish2X + "px";
      fish2.style.top = This.fish2Y + "px";
    } else {
      fish2.src = "img/fish2_right.png";
      var ranr = Math.floor(Math.random() * 500 + 50);
      This.fish2X = 0;
      This.fish2Y = ranr;
      fish2.style.left = This.fish2X + "px";
      fish2.style.top = This.fish2Y + "px";
    }
    This.fishes2.add({fish: fish2, x: This.fish2X, y: This.fish2Y, r: ranx, s: speed});

    This.moveFish2 = function (objfish2) {
      if (objfish2.r == 1) {
        if (index > 150) {
          var rany = Math.floor(Math.random() * 2);
          if (rany == 0) {
            objfish2.s = -objfish2.s;
          }
          index = 0;
        }
        objfish2.x -= 1;
        objfish2.fish.src = "img/fish2_left.png"
      } else {
        if (index > 150) {
          var rany = Math.floor(Math.random() * 2);
          if (rany == 0) {
            objfish2.s = -objfish2.s;
          }
          index = 0;
        }
        objfish2.x += 1;
        objfish2.fish.src = "img/fish2_right.png"
      }
      index++;
      objfish2.y += objfish2.s;
      objfish2.fish.style.left = objfish2.x + "px";
      objfish2.fish.style.top = objfish2.y + "px";
      if (objfish2.x < 0) {
        objfish2.r = -objfish2.r;
        objfish2.fish.src = "img/fish2_right.png"
      }
      if (objfish2.x > 1180) {
        objfish2.r = -objfish2.r;
        objfish2.fish.src = "img/fish2_left.png"
      }
      if (objfish2.y < 0 || This.fish2Y > 566) {
        objfish2.s = -objfish2.s;
      }
    };

    This.change = function (mx, my, objfish2) {
      if (objfish2.x < mx) {
        objfish2.x += 2;
        objfish2.fish.style.left = objfish2.x + "px";
        objfish2.fish.src = 'img/fish2_right.png';
      } else if (objfish2.x > mx) {
        objfish2.x -= 2;
        objfish2.fish.style.left = objfish2.x + "px";
        objfish2.fish.src = 'img/fish2_left.png';
      }
      if (objfish2.y < my) {
        objfish2.y += 2;
        objfish2.fish.style.top = objfish2.y + "px";
      } else if (This.fish2Y > my) {
        objfish2.y -= 2;
        objfish2.fish.style.top = objfish2.y + "px";
      }
    };
  },
//添加子弹
  Bullet: function (This) {
    This.bulletX;
    This.bulletY;
    let dir;
    let time = 0;
    let bulletsrc = ['img/bullet.png', 'img/bullet1.png', 'img/bullet2.png', 'img/bullet3.png'];
    let bullet = document.createElement('img');
    bullet.setAttribute('id', 'bullet');
    bullet.src = 'img/bullet.png';
    This.bulletX = This.playerX;
    This.bulletY = This.playerY - 16;
    bullet.style.left = This.bulletX + "px";
    bullet.style.top = This.bulletY + "px";
    game.appendChild(bullet);
    This.bullets.add({bullet: bullet, x: This.bulletX, y: This.bulletX});

    This.moveBullet = function () {
      if (time > 200) {
        if (dir == 1) {
          This.bulletX += 4;
          bullet.style.left = This.bulletX + "px";
        } else {
          This.bulletX -= 4;
          bullet.style.left = This.bulletX + "px";
        }

        if (This.bulletX < -50 || This.bulletX > 1280) {
          return true;
        }
      } else {
        bullet.src = bulletsrc[Math.floor(Math.random() * 4)];
        time++;
        This.bulletX = This.playerX;
        This.bulletY = This.playerY - 16;
        bullet.style.left = This.bulletX + "px";
        bullet.style.top = This.bulletY + "px";
        dir = This.getDirection();
      }
    };
  }
};
