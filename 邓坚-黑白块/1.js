(function () {

    //构造函数
    let Model = function (canvas) {
        let This = this;
        //通关所需黑块的个数和已经点击过的黑块个数
        This.End = 10;
        This.sum = 0;
        //每个块 的高、宽
        This.width = 100;

        //记录暂停/继续状态
        This.state = 0;
        //获取计时
        This.t = document.querySelector('.time');
        //获取canvas的宽高
        This.canvas = canvas;
        This.h = This.canvas.getBoundingClientRect().height - 2;
        This.w = This.canvas.getBoundingClientRect().width - 2;
        // console.log(This.w);
        This.context = This.canvas.getContext('2d');
        //初始化
        This.Arr = [];

        This.start = document.querySelector('.start');
        This.pas = document.querySelector('.pause');
        //阻止默认事件
        This.box = document.querySelector('.box');
        This.box.addEventListener('click',function(e){
            e.preventDefault();
        });
        //点击开始游戏
        This.clickStart();
        //暂停/继续
        This.pause();
        canvas.addEventListener('click', function (e) {
            e.preventDefault();
            let r = This.checkBlock(e.offsetX, e.offsetY);
            switch (r) {
                case 0:
                    if (This.state == 0) {
                        alert('GAME OVER!');
                        This.context.clearRect(0, 0, This.w, This.h);
                        for (let i = 1; i < This.interval + 1; i++) {
                            clearInterval(i);
                        }
                    }
                    break;
                case 2:
                    if (This.state == 0) {
                        This.clearLast();
                    }

                    break;
                case 1:
                    break;
                default:
                    break;
            }
        });
    }


    //绘制网格
    Model.prototype.drawGrid = function () {
        let This = this;
        let ctx = This.context;
        ctx.strokeStyle = '#ccc';
        //绘制横线
        for (let i = 0; i < (This.h / 100) - 1; i++) {
            let y = (i + 1) * This.width;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(This.w, y);
            ctx.closePath();
            ctx.stroke();
        }

        //绘制竖线
        for (let i = 0; i < (This.w / 100) - 1; i++) {
            let x = (i + 1) * This.width;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, This.h);
            ctx.closePath();
            ctx.stroke();
        }
    }


    //绘制黑块
    Model.prototype.drawBlock = function () {
        let This = this;
        let ctx = This.context;
        ctx.fillStyle = '#000000';
        for (let i = 0; i < (This.h / 100); i++) {
            // console.log(This.Arr[i]);
            if (This.Arr[i] === -1) {
                continue;
            }
            let y = i * This.width;
            let x = This.Arr[i] * This.width;
            ctx.fillRect(x, y, This.width, This.width);

        }
    }


    //判断点击的是否为黑块
    Model.prototype.checkBlock = function (x, y) {
        let This = this;
        //定位点击的行和列
        let col = Math.floor(x / This.width);
        let row = Math.floor(y / This.width);

        //点击到白块
        if (This.Arr[row] !== col) {
            return 0;
        }

        //点击到第一块黑块（用户角度）对应于Arr[]数组中最后一个元素
        else if (row == This.Arr.length - 1) {
            return 2;
        }
        //点到其他黑块
        else {
            return 1;
        }

    }


    //消除最后一行
    Model.prototype.clearLast = function () {
        let This = this;
        This.Arr.pop();
        if (This.sum < This.End - This.h / 100) {
            This.Arr.unshift(Math.random() * This.w / 100 | 0);
        }
        else {
            This.Arr.unshift(-1);
        }
        This.context.clearRect(0, 0, This.w, This.h);
        This.drawGrid();
        This.drawBlock();

        //通关后提示以及暂停计时
        if (++This.sum === This.End) {
            alert('厉害的小哥哥or小姐姐。');
            clearInterval(This.interval);
        }
    }


    //计时

    Model.prototype.startGame = function () {
        let This = this;
        This.startTime = new Date();
        This.interval = setInterval(() => {
            let d = new Date();
            let d1 = d - This.startTime;
            This.t.innerText = (d1 / 1000).toFixed(1);
        }, 100);
    }

    //开始游戏
    Model.prototype.clickStart = function () {
        let This = this;
        This.start.addEventListener('click', function () {
            for (let i = 1; i < This.interval + 1; i++) {
                clearInterval(i);
            }
            This.state = 0;
            This.sum = 0;
            This.context.clearRect(0, 0, This.w, This.h);
            This.drawGrid();
            // clearInterval(This.interval);
            for (let i = 0; i < (This.h / 100); i++) {
                This.Arr[i] = Math.round(Math.random() * (This.w / 100 - 1));
                // console.log(Arr[i]);
            }
            This.drawBlock();
            This.startGame();
        });
    }

    //暂停
    Model.prototype.pause = function () {
        let This = this;
        This.pas.addEventListener('click', function () {
            if (This.state == 0) {
                for (let i = 1; i < This.interval + 1; i++) {
                    clearInterval(i);
                }
                This.state = 1;
            }
            else {
                This.state = 0;
                This.startTime = new Date() - parseFloat(This.t.textContent) * 1000;
                This.interval = setInterval(() => {
                    let d = new Date();
                    let d1 = d - This.startTime;
                    This.t.innerText = (d1 / 1000).toFixed(1);
                }, 100);
            }
        });
    }
    window.whiteBlock = Model;
}());