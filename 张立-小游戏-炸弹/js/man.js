function Man(outbox,groundobj) {
	this.b1 = can1.getContext('2d');
	this.n = 0;
	this.direction = 1;
	this.speed = 8;//五分之一个动作走的距离
	this.oncetime=50;//整个跳跃动作所需时间
	this.width = 600;
	this.height = 520;
	this.man = new Image();
	this.groundobj=groundobj;
	this.boxmap=this.groundobj.boxmap;//盒子地图
	this.moneymap=this.groundobj.moneymap;
	this.outbox=outbox;
	this.livebox=document.querySelectorAll(".img1");//所有1 2盒子
	this.boxall=document.querySelectorAll(".boxall");//所有0 1 2盒子
	this.switch1=0;
	this.boomer=document.createElement('img');//炸弹
	this.boomlen=1;//炸弹范围
	
	// this.direction1=[37,38,39,40];
}

Man.prototype.move = function() {
	
	console.log(scole);
	
	var This = this;
	// var switch1=0;
	
	//画图
	function drawimage (sx,sy){
		This.b1.drawImage(This.man, sx,sy, This.loca.sw, This.loca.sh, This.loca.dx, This.loca.dy, This.loca.dw, This.loca.dh);
	}
	
	This.man.onload= function () {
		drawimage(0,0);
		window.onkeyup = function() {
			//判断此时是否在运动,若在运动则按键无效
			if(This.switch1 == 0) {
				This.switch1 = 1;
				moving(event);
			}
		};
		//开始运动
		function moving(e) {
			console.log(This.loca);
			//当用户按不同方向键的时候，裁剪不同的行
			e.preventDefault();
			var code = e.keyCode;
			var dirArr = [];
			dirArr[This.direction1[0]] = 1;
			dirArr[This.direction1[1]] = 3;
			dirArr[This.direction1[2]] = 2;
			dirArr[This.direction1[3]] = 0;
			This.direction = (typeof dirArr[code] == 'number') ? dirArr[code] : This.direction;

			//往不同的方向走
			switch(This.direction) {
				case 0: //向下走
					This.b1.clearRect(This.loca.dx, This.loca.dy, This.loca.dw, This.loca.dh);
					//判断是否撞箱子
					var duicuo1;
					for (var n = 0; n < This.livebox.length; n++) {
						if (This.livebox[n].offsetTop == This.loca.dy+This.speed*5 && This.livebox[n].offsetLeft == This.loca.dx||This.loca.dy==This.height+40) {
							duicuo1 = 1;
							break;
						} else {
							duicuo1 = 0;
						}
					}
					if(duicuo1==1){
						This.switch1 = 0;
						drawimage(0,0);
					} else if(duicuo1==0) {
						action();
					}
					break;
				case 1: //向左走
					This.b1.clearRect(This.loca.dx, This.loca.dy, This.loca.dw, This.loca.dh);
					//判断是否撞箱子
					var duicuo2;
					for (var n = 0; n < This.livebox.length; n++) {
						if (This.livebox[n].offsetTop == This.loca.dy  && This.livebox[n].offsetLeft == This.loca.dx-This.speed*5||This.loca.dx==0) {
							duicuo2 = 1;
							break;
						} else {
							duicuo2 = 0;
						}
					}
					if(duicuo2==1){
						This.switch1 = 0;
						drawimage(0,This.loca.sh);

					} else if(duicuo2==0) {
						action();
					}
					break;
				case 2: //向右走
					This.b1.clearRect(This.loca.dx, This.loca.dy, This.loca.dw, This.loca.dh);
					//判断是否撞箱子
					var duicuo3;
					for (var n = 0; n < This.livebox.length; n++) {
						if (This.livebox[n].offsetTop == This.loca.dy  && This.livebox[n].offsetLeft == This.loca.dx+This.speed*5||This.loca.dx==This.width-40) {
							duicuo3 = 1;
							break;
						} else {
							duicuo3 = 0;
						}
					}
					if(duicuo3==1){
						This.switch1 = 0;
						drawimage(0,This.loca.sh*2);

					} else if(duicuo3==0) {
						action();
					}
					break;
				case 3: //向上走
					This.b1.clearRect(This.loca.dx, This.loca.dy, This.loca.dw, This.loca.dh);
					//判断是否撞箱子
					var duicuo4;
					for (var n = 0; n < This.livebox.length; n++) {
						if (This.livebox[n].offsetTop == This.loca.dy-This.speed*5  && This.livebox[n].offsetLeft == This.loca.dx||This.loca.dy==0) {
							duicuo4 = 1;
							break;
						} else {
							duicuo4 = 0;
						}
					}
					if(duicuo4==1){
						This.switch1 = 0;
						drawimage(0,This.loca.sh*3);

					} else if(duicuo4==0) {
						action();
					}
					break;
				default:
					break;
					
			}
			
			//跳跃动作
			function action() {
				var actime = setInterval(function() {
					//完成五分之一X5的动作
					if(This.n < 5) {
						//清除原来位置
						This.b1.clearRect(This.loca.dx, This.loca.dy, This.loca.dw, This.loca.dh);
						//判断健值并加减位置
						switch(This.direction) {
							case 0:
								This.loca.dy += This.speed;
								break;
							case 1:
								This.loca.dx -= This.speed;
								break;
							case 2:
								This.loca.dx += This.speed;
								break;
							case 3:
								This.loca.dy -= This.speed;
								break;
							default:
								break;
						}
						drawimage((This.n++ % 4) * This.loca.sw,This.loca.sh * This.direction);
					} else {
						clearInterval(actime);
						This.n = 0;
						This.switch1=0;
					};
				}, This.oncetime);
			}
			
			//判断是否吃到宝藏,增加炸弹爆炸长度
			if(This.moneymap[This.loca.dy/40][This.loca.dx/40]==2){
				This.moneymap[This.loca.dy/40][This.loca.dx/40]=0
				This.boomlen++;
				scole.innerHTML="炸弹威力："+This.boomlen+"级";
			}else if(This.moneymap[This.loca.dy/40][This.loca.dx/40]==1){
				This.moneymap[This.loca.dy/40][This.loca.dx/40]=0;
				if(confirm("恭喜你发现彩蛋！是否前往训练靶场？")){
					location.href="overwatch.html";
				};
			}
		}
	}
}

//炸炸炸
Man.prototype.boom = function(){
	var This = this;
	window.onkeydown=function(event){
		//当跳跃动作完成后才可以放炸弹
		if(This.switch1==0){
			var code=event.keyCode;
			if(code==This.direction1[4]){
				console.log(This.loca.dx, This.loca.dy)
				// var boomer=document.createElement('img');
				This.boomer.classList.add('boomer');
				//在这里加放大变小动画
				This.boomer.src='img/boomer.png';
				This.boomer.style.top=This.loca.dy+"px";
				This.boomer.style.left=This.loca.dx+"px";
				This.outbox.appendChild(This.boomer);
				
				//定时爆炸
				setTimeout(function(){
					//连环爆炸
					fire();
					//炸弹再消失
					setTimeout(function(){
						This.boomer.remove();
					},300)
				},2000)
			}
		}

	}
	
	//连环爆炸
	function fire(){
		//炸弹先爆炸
		This.boomer.src='img/boom.png';
		var boxallnew=document.querySelectorAll(".boxall");
		//炸弹位置 大数组 第几排
		var arbig=parseInt(This.boomer.style.top)/40;
		//炸弹位置小数组 第几列
		var arlittle=parseInt(This.boomer.style.left)/40;
		var arlocation=arbig*15+arlittle;
		console.log(This.groundobj.boxmap)
		for (var n = 1; n <=This.boomlen; n++) {
			//炸右边
			if ( arlittle+n<=14&& This.boxmap[arbig][arlittle + n] > 0) {
				This.boxmap[arbig][arlittle + n] = 0;
				This.boxall[arlocation +  n].src='img/boom.png';
				(function(n){
					setTimeout((function(){
						This.outbox.removeChild(This.boxall[arlocation + n]);
					}),300)
				})(n)
			};
			//炸左边
			if (arlittle>=n&& This.boxmap[arbig][arlittle - n] > 0) {
				This.boxmap[arbig][arlittle - n] = 0;
				This.boxall[arlocation - n].src='img/boom.png';

				(function(n){
					setTimeout((function(){
						This.outbox.removeChild(This.boxall[arlocation - n]);
					}),300)
				})(n)
			};
			//炸上边
			if (arbig>=n && This.boxmap[arbig - n][arlittle] > 0) {
				This.boxmap[arbig - n][arlittle] = 0;
				This.boxall[arlocation - (15 * n) ].src='img/boom.png';
				(function(n){
					setTimeout((function(){
						This.outbox.removeChild(This.boxall[arlocation - (15 * n)]);
					}),300)
				})(n)
			};
			//炸下边
			if (arbig+n<=12 && This.boxmap[arbig + n][arlittle]>0) {
				This.boxmap[arbig + n][arlittle] = 0;
				This.boxall[arlocation+ (15 * n) ].src='img/boom.png';
				(function(n){
					setTimeout((function(){
						This.outbox.removeChild(This.boxall[arlocation + (15 * n)]);
					}),300)
				})(n)
			}

		};

		};
	}

