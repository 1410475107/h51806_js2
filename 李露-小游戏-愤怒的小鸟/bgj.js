function Createpillar(sector, canvasObj) {
    this.bgc = document.querySelector(sector).children[0];
    // this.endImg=document.querySelector( sector.nextSibling);
    this.bird = document.querySelector(sector).children[1];
    this.start = document.querySelector(sector).children[2];
    this.score = document.querySelector(sector).children[3];
    this.fly = document.querySelector(sector).children[5].children[0];
    this.pang = document.querySelector(sector).children[5].children[1];
    this.pass = document.querySelector(sector).children[5].children[2];
    this.canvasfather = document.querySelector(sector).children[6];

    this.success = document.querySelector(sector).children[7];

    //柱子的定时器
    this.rsid;
    //小鸟的定时器
    this.startid;
    this.endImg;
    this.height1;
    this.height2;
    this.pillarTop = [];
    this.pillarBottom = [];
    // this.pillarTopHeight = [];
    this.pillarBottom;
    this.newNodeTop;
    this.newNodeBottom;
    //点击小鸟上升的速度
    this.speed;
    //柱子移动的速度
    this.pillarspeed;
    this.score1 = 0;
    this.score.innerHTML = '分数：' + 0;
}

Createpillar.prototype.pillar = function () {
    let This = this;
    //把柱子的left装进数组里面，添加柱子到页面
    let base = [400, 550, 700, 850, 1000];
    let baseBottom = [400, 550, 700, 850, 1000];

    for (let ind = 0; ind < base.length; ind++) {
        This.height1 = Math.ceil(Math.random() * 100 + 150);
        node = document.createElement('div');
        node.className = 'pillarTop';
        console.log(This.height1);
        node.style.height = This.height1 + 'px';
        node.style.left = base[ind] + 'px';

        This.pillarTop.push(node);
        This.bgc.appendChild(node);
        This.height2 = 400 - This.height1;
        node1 = document.createElement('div');
        node1.className = 'pillarBottom';
        node1.style.height = This.height2 + 'px';
        node1.style.left = baseBottom[ind] + 'px';
        This.pillarBottom.push(node1);
        This.bgc.appendChild(node1);
    }


}

//柱子动
Createpillar.prototype.run = function () {
    let This = this;
    This.rsid = setInterval(() => {
        //每次left向左移动1px
        for (var i = 0; i < This.pillarTop.length; i++) {
            This.pillarTop[i].style.left = This.pillarTop[i].offsetLeft - 1 + 'px';
            This.pillarBottom[i].style.left = This.pillarBottom[i].offsetLeft - 1 + 'px';
        }
        if (This.pillarTop[This.pillarTop.length - 1].offsetLeft <= 820) {
            //创造一个新的柱子
            This.newNodeTop = document.createElement('div');
            This.newNodeTop.className = 'pillarTop';
            This.newNodeTop.style.left = '970px';
            This.height1 = Math.ceil(Math.random() * 100 + 150);
            This.newNodeTop.style.height = This.height1 + 'px';
            //上下两根柱子总长度为400，中间间隔100
            This.height2 = 400 - This.height1;
            This.newNodeBottom = document.createElement('div');
            This.newNodeBottom.className = 'pillarBottom';
            This.newNodeBottom.style.left = '970px';
            This.newNodeBottom.style.height = This.height2 + 'px';
            //把柱子添加到页面
            This.pillarTop.push(This.newNodeTop);
            This.bgc.appendChild(This.newNodeTop);
            This.pillarBottom.push(This.newNodeBottom);
            This.bgc.appendChild(This.newNodeBottom);

        }
        //当柱子的left小于-60时，删除节点
        if(This.pillarTop[0].offsetLeft<-60){
            This.pillarTop[0].remove();
            This.pillarBottom[0].remove();

        }
        //小鸟飞过柱子时加分并播放音频
        for (let i = 0; i < This.pillarBottom.length; i++) {
            console.log(This.bird.style.width);
            if (This.pillarBottom[i].offsetLeft + 50 == This.bird.offsetLeft) {
                This.pass.play();
                This.score1++;
                This.score.innerHTML = '分数：' + This.score1;
                //当分数为10时，胜利
                if (this.score1 == 10) {
                    This.fly.pause();
                    This.success.style.display = 'block';
                    clearInterval(This.rsid);
                    clearInterval(This.startid);
                }
            }

        }
    }, 25)
}
//鸟
Createpillar.prototype.bird1 = function () {
    let This = this;
    This.startid = setInterval(() => {
        //启动定时器，播放音频
        This.fly.play();
        //点击小鸟上升的速度是40
        This.speed = 40;
        //将小鸟的left固定
        if (This.bird.offsetLeft < 145) {
            This.bird.style.left = This.bird.offsetLeft + 3 + 'px';
        }
        This.bird.style.top = This.bird.offsetTop + 10 + 'px';
        //鸟的位置
        window.onkeydown = function (e) {
            let code = e.keyCode;
            if (code == 38) {
                console.log('haha')
                This.bird.style.top = This.bird.offsetTop - This.speed + 'px';
            }
        }
        //当小鸟飞出游戏界面是结束游戏
        if (This.bird.offsetTop > 450 || This.bird.offsetTop < 0) {
            console.log('down');
            This.pang.play();
            This.fly.pause();
            This.canvasObj.canvas.style.display = 'block';
            This.canvasfather.style.display = 'block';

            clearInterval(This.rsid);
            clearInterval(This.startid);

        }
        //当小鸟和上面的柱子相碰撞时结束游戏
        for (let i = 0; i < This.pillarTop.length; i++) {
            if (This.pillarTop[i].offsetLeft < This.bird.offsetLeft + 40 && This.bird.offsetLeft < This.pillarTop[i].offsetLeft + 40) {
                if (This.bird.offsetTop + 20 + 'px' < This.pillarTop[i].style.height) {
                    This.pang.play();
                    This.fly.pause();
                    This.canvasObj.canvas.style.display = 'block';
                    This.canvasfather.style.display = 'block';
                    clearInterval(This.rsid);
                    clearInterval(This.startid);
                }
            }
        }
        //当小鸟和下面的柱子相碰撞时结束游戏
        for (let i = 0; i < This.pillarBottom.length; i++) {
            if (This.pillarBottom[i].offsetLeft < This.bird.offsetLeft + 40 && This.bird.offsetLeft < This.pillarBottom[i].offsetLeft + 40) {
                if (This.bird.offsetTop + 50 > This.pillarBottom[i].offsetTop + 10) {
                    This.pang.play();
                    This.fly.pause();
                    This.canvasObj.canvas.style.display = 'block';
                    This.canvasfather.style.display = 'block';
                    clearInterval(This.rsid);
                    clearInterval(This.startid);
                }
            }
        }

    }, 100)

}