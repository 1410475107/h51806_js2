function Ball() {
    this.mydiv = document.querySelector("#mydiv");

    this.mydiv.width = this.mydiv.getBoundingClientRect().width;
    this.mydiv.height = this.mydiv.getBoundingClientRect().height;

    this.mydiv_left = this.mydiv.getBoundingClientRect().left;
    this.mydiv_top = this.mydiv.getBoundingClientRect().top;


    this.score = document.querySelector('.score');
    this.imgball = document.querySelector('img');

    this.directionX = 1;
    this.directionY = -1;
    this.rp = null;
    this.boardTo = document.querySelector('.boardTo');
    this.boardleft = this.boardTo.offsetLeft;
    this.numLi = document.querySelectorAll('.down li');
    this.imgball = document.querySelector('img');
    this.feiballleft = this.imgball.offsetLeft;
    this.feiballtop = this.imgball.offsetTop;



}
//设置随机数

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//底边障碍物

Ball.prototype.boardBar = function () {
    let boardBarbtw = 10;
    let canvas = document.querySelector('#canvas');
    let context = canvas.getContext('2d');

    context.beginPath();
    context.fillStyle = '#fff';

    context.moveTo(0, 10);
    for (let i = 1; i <= this.mydiv.width / boardBarbtw * 2; i++) {
        if (i % 2) {
            context.lineTo((boardBarbtw / 2) * i, 0);
        } else {
            context.lineTo((boardBarbtw / 2) * i, 10);
        }
        context.stroke();
    }
}





//点击开始游戏
Ball.prototype.startGame = function () {
    let This = this;
    /*
      ** window.location.reload();
      ** window.onmousedown=function(e){
      **  This.clientx=e.clientX||e.pageX;
       **This.clienty=e.clientY||e.pageY;
    }
    */

    This.pause();
    This.end();
    This.count = 0;
    This.qiuJiao = random(30, 150);
    This.start = document.querySelector('.start');

    This.dec1 = document.createElement('span');
    This.dec1.className = 'dec';
    This.mydiv.appendChild(This.dec1);
    This.dec1.innerText = '游戏规则：点开始游戏开始，通过左右箭头控制挡板移动，打中一个块得一分,快点击开始游戏开始吧';
    This.start.onclick = function () {
        This.kbegin = true;
        This.mydiv.removeChild(This.dec1);
        This.first();
        let n = 0;
        if (This.text == "关卡1" || This.text == undefined) {

            This.runBall();
            //更改音乐
            This.audio.src = This.audio.dataset.src;
            This.audio.load();
            // This.audio.play();
            clearInterval(This.mi1);
            This.music();

        } else {
            if (confirm('请从第一关开始')) {
                This.first();
            }
        }
    }
}
//暂停游戏
Ball.prototype.pause = function () {
    let This = this;
    This.pause = document.querySelector('.pause');
    This.pause.onclick = function () {
        clearInterval(This.rp);
    }
}
//结束游戏
Ball.prototype.end = function () {
    let This = this;
    This.end = document.querySelector('.end');
    This.overimg = document.querySelector('.overimg');
    This.end.onclick = function () {

        if (confirm('你确定要退出游戏吗？')) {
            clearInterval(This.rp);
            This.overimg.style.display = 'block';
            This.mydiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
            This.score.style.left = '200px'
            This.score.style.top = '450px';
            This.score.style.color = 'black';

        }
    }
}


//发射小球
Ball.prototype.runBall = function (e) {
    let This = this;


    //求初始位置

    This.qiustartX = This.qiustartX + This.directionX * Math.abs(Math.cos((2 * Math.PI / 360) * This.qiuJiao));
    // console.log(Math.cos((2 * Math.PI / 360) * 30));
    This.qiustartY = This.qiustartY + This.directionY * Math.abs(Math.sin((2 * Math.PI / 360) * This.qiuJiao));
    This.imgball.style.left = This.qiustartX + "px";
    This.imgball.style.top = This.qiustartY + "px";
    if (This.qiustartY >= 560) {
        //判断是否接住
        if (This.qiustartX < This.boradleft - 10 || This.qiustartX > This.boradleft + 100) {

            clearTimeout(This.rp);
            This.overimg.style.display = 'block';
            This.mydiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
            This.score.style.left = '200px'
            This.score.style.top = '450px';
            This.score.style.color = 'black';

            //碰撞四壁
        } else {
            This.directionY = -1;
            This.imgball.style.left = This.qiustartX + 'px';
            This.imgball.style.top = This.qiustartY + 'px';
            This.rp = setTimeout("ball.runBall()", 1);
        }
    } else {
        This.barsclass = document.querySelectorAll('.bar');
        for (var i = 0; i < This.barsclass.length; i++) {
            This.barleft = This.barsclass[i].offsetLeft;
            This.bartop = This.barsclass[i].offsetTop;
            var io = This.BarDispear();


            if (io != 0) {
                if (This.barleft >= 100 && This.bartop >= 80) {

                    This.score.innerText = `得分：${++This.count}分`;
                    This.barsclass[i].style.display = "none";


                }


                setTimeout(function () {
                    //判断关数
                    if (This.count == 6 * 2 * 1) {
                        This.score.innerText = `得分：${This.count}分`;
                        if (confirm('恭喜通过第一关，进入下一关？')) {
                            This.second();
                            // ball.feiball();
                        }
                        else {
                            This.endImg();

                        }

                    }
                    if (This.count == 6 * 2 * (2 + 1)) {
                        This.score.innerText = `得分：${This.count}分`;
                        if (confirm('恭喜通过第二关，进入下一关？')) {
                            This.third();
                            // ball.feiball();
                        }
                        else {
                            This.endImg();
                        }
                    }
                    if (This.count == 6 * 2 * (3 + 2 + 1)) {
                        This.score.innerText = `得分：${This.count}分`;
                        if (confirm('恭喜通过第三关，进入下一关？')) {
                            This.forth();
                            // ball.pause();
                        }
                        else {
                            This.endImg();
                        }

                    }
                    if (This.count == 6 * 2 * (4 + 3 + 2 + 1)) {
                        This.score.innerText = `得分：${This.count}分`;
                        if (confirm('恭喜通过第四关，进入下一关？')) {
                            This.fifth();
                            // ball.pause();
                        }
                        else {
                            This.endImg();
                        }

                    }
                    if (This.count == 6 * 2 * (+4 + 3 + 2 + 1)) {
                        This.score.innerText = `得分：${This.count}分`;
                        if (confirm('恭喜通过第五关，进入下一关？')) {
                            This.sixth();
                            // ball.pause();
                        }
                        else {
                            This.endImg();
                        }
                    }
                    if (This.count == 6 * 2 * (6 + 5 + 4 + 3 + 2 + 1)) {
                        This.score.innerText = `得分：${This.count}分`;
                        if (confirm('恭喜通过第六关，进入下一关？')) {
                            This.seventh();
                            // ball.pause();
                        }
                        else {
                            This.endImg();
                        }
                    }
                    if (This.count == 6 * 2 * (7 + 6 + 5 + 4 + 3 + 2 + 1)) {
                        This.score.innerText = `得分：${This.count}分`;
                        if (confirm('你真厉害，通过了最后一关，在下佩服')) {
                            This.end();
                            // ball.pause();
                        }
                        else {
                            This.endImg();
                        }
                    }

                }, 1000)


                if (io == 1) {
                    This.directionX = 1;
                }
                if (io == 2) {
                    This.directionX = -1;
                }
                if (io == 3) {
                    This.directionY = 1;
                }
                if (io == 4) {
                    This.directionY = -1;
                }
            }
        }
        if (This.qiustartX >= 480) {
            This.directionX = -1;
        }

        if (This.qiustartX <= 0) {
            This.directionX = 1;
        }

        if (This.qiustartY <= 0) {
            This.directionY = 1;
        }

        This.imgball.style.left = This.qiustartX + 'px';
        This.imgball.style.top = This.qiustartY + 'px';
        This.rp = setTimeout("ball.runBall()", 1);
    }

}

Ball.prototype.endImg = function () {
    let This = this;
    This.mydiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
    This.restart = document.createElement('div');
    This.restart.className = 'restart';
    This.mydiv.appendChild(This.restart);
    This.restart.innerText = '重新开始游戏';
    This.restart.onclick = function () {
        This.startGame();
    }
}

//碰撞检测
Ball.prototype.BarDispear = function () {
    let This = this;
    var f = {
        x: This.qiustartX,
        y: This.qiustartY,
        x1: This.qiustartX + 20,
        y1: This.qiustartY + 20
    }
    var z = {
        x: This.barleft,
        y: This.bartop,
        x1: This.barleft + 40,
        y1: This.bartop + 20
    }

    var sx; var sy;
    sx = f.x >= z.x ? f.x : z.x;
    sy = f.y >= z.y ? f.y : z.y;
    if (sx >= f.x && sx <= f.x1 && sy >= f.y && sy <= f.y1 && sx >= z.x && sx <= z.x1 && sy >= z.y && sy <= z.y1) {
        //       飞球左边和砖块右边  右   飞球右边和砖块左边  左    飞球上边和砖块下边   下 飞球下边和砖块上边  上
        return seSmall(Math.abs(f.x - z.x1), Math.abs(f.x1 - z.x), Math.abs(f.y - z.y1), Math.abs(f.y1 - z.y));

    } else {
        return 0;
    }
}

function seSmall(a, b, c, d) {
    if (a < b && a < c && a < d) {
        return 1;
    }
    if (b < a && b < c && b < d) {
        return 2;
    }
    if (c < a && c < b && c < d) {
        return 3;
    }
    if (d < b && d < c && d < a) {
        return 4;
    }
}


//移动板子
Ball.prototype.moveBoard = function (e) {
    let This = this;

    This.QIUStartLeft = This.imgball.offsetLeft + 10;
    This.QIUStartTop = This.imgball.offsetTop + 10;

    This.boardTo_width = This.boardTo.getBoundingClientRect().width;
    //飞球的位置
    This.qiustartX = This.imgball.offsetLeft;
    This.qiustartY = This.imgball.offsetTop;
    //标记游戏是否开始
    This.kbegin = false;
    This.leftadd = 10;
    This.boradleft = This.boardTo.offsetLeft;
    window.onkeydown = function (e) {
        if (e.keyCode == 37 || e.keyCode == 39) {
            let left = This.boardTo.offsetLeft + (e.keyCode - 38) * This.leftadd;
            if (left < 0) {
                left = 0
            } else if (left > This.mydiv.width - This.boardTo_width) {
                left = This.mydiv.width - This.boardTo_width;
            }
            This.boardTo.style.left = left + 'px';
            This.boradleft = left;
            if (!This.kbegin) {
                This.ballleft = This.boardTo.offsetLeft + 45;
                This.qiu = This.ballleft + (e.keyCode - 38) * This.leftadd;
                This.imgball.style.left = This.qiu + 'px';
            }
        }
    }
}

//创建小球障碍物
Ball.prototype.createBar = function () {

    let This = this;
    This.top = 50;
    This.bar1 = new Array();
    for (let i = 0; i < This.BarY; i++) {
        This.top += 30;
        This.left = 50;
        for (let j = 0; j < This.BarX; j++) {
            This.Bar = document.querySelector('.Bars');
            This.bar1 = document.createElement('div');
            This.Bar.appendChild(This.bar1);
            This.bar1.className = 'bar';
            This.bar1.style.backgroundColor = 'rgb(' + random(100, 200) + ',' + random(100, 200) + ',' + random(100, 200) + ')';
            This.left += 50;
            This.bar1.style.left = This.left + 'px';
            This.bar1.style.top = This.top + 'px';
        }
        This.bar1.style.top = This.top + 'px';
    }


}
//删除节点
Ball.prototype.remove = function () {
    let This = this;
    This.barsclass = document.querySelectorAll('.bar');
    for (let i = 0; i < This.barsclass.length; i++) {
        This.Bar.removeChild(This.barsclass[i]);
    }

}

//查看关卡
Ball.prototype.numLis = function () {
    let This = this;

    for (let li = 0; li < This.numLi.length; li++) {


        This.numLi[li].onclick = function () {

            if (li == 0) {
                This.remove();
                This.text = This.numLi[li].innerText;
                This.first();
            }
            if (li == 1) {
                This.remove();
                This.text = This.numLi[li].innerText;

                This.second();
            }
            if (li == 2) {
                This.remove();
                This.text = This.numLi[li].innerText;
                This.third();
            }
            if (li == 3) {
                This.remove();
                This.text = This.numLi[li].innerText;
                This.forth();
            }
            if (li == 4) {
                This.remove();
                This.text = This.numLi[li].innerText;
                This.fifth();
            }
            if (li == 5) {
                This.remove();
                This.text = This.numLi[li].innerText;
                This.sixth();
            }
            if (li == 6) {
                This.remove();
                This.text = This.numLi[li].innerText;
                This.seventh();
            }
        }
    }
}

//球和板子的初始位置
Ball.prototype.feiposition = function () {}
// 第一关
Ball.prototype.first = function () {
    this.BarX = 6;
    this.BarY = 2;
    console.log(this.qiustartX);
    this.createBar();
    this.qiustartX = 240;
    this.qiustartY = 550;
    this.boardleft = 150;
}

//第二关
Ball.prototype.second = function () {
    this.BarX = 6; this.BarY = 4;

    this.createBar();
    this.qiustartX = 240;
    this.qiustartY = 550;
    this.boardleft = 200;
}

//第三关
Ball.prototype.third = function () {
    this.BarX = 6; this.BarY = 6;
    this.createBar();
    this.qiustartX = 240;
    this.qiustartY = 550;
    this.boardleft = 200;
}


//第四关
Ball.prototype.forth = function () {
    this.BarX = 6; this.BarY = 8;
    this.createBar();
    this.qiustartX = 240;
    this.qiustartY = 550;
    this.boardleft = 200;
}

//第五关
Ball.prototype.fifth = function () {
    this.BarX = 6; this.BarY = 10;
    this.createBar();
    this.qiustartX = 240;
    this.qiustartY = 550;
    this.boardleft = 200;
}


//第六关
Ball.prototype.sixth = function () {
    this.BarX = 6; this.BarY = 12;
    this.createBar();
    this.qiustartX = 240;
    this.qiustartY = 550;
    this.boardleft = 200;
}


//第七关
Ball.prototype.seventh = function () {
    this.BarX = 6; this.BarY = 14;
    this.createBar();
    this.qiustartX = 240;
    this.qiustartY = 550;
    this.boardleft = 200;
}

//音乐转动
Ball.prototype.music = function () {
    let This = this;
    This.audio = document.querySelector('#audio');
    This.music1 = document.querySelector('.audio');
    This.play = 1;
    This.audio.play();
    let n = 0;
    if (This.play != 0) {
        This.mi1 = setInterval(function () {
            n++;
            This.music1.style.transform = 'rotate(' + 10 * n + 'deg)';
        }, 100);
    }
    //http://music.163.com/song/media/outer/url?id=570132913.mp3
    This.music1.onclick = function () {
        clearInterval(This.mi1);
        if (This.play == 1) {
            This.audio.pause();
            clearInterval(This.mi);
            This.audio.load();
            This.play = 0;

        } else {
            This.audio.play();
            This.play = 1;
            This.mi = setInterval(function () {
                n++;
                console.log(999);
                This.music1.style.transform = 'rotate(' + 10 * n + 'deg)';
            }, 100);
        }
    }
}
