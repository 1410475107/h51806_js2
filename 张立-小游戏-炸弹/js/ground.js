function Ground(outbox){
	this.b2=can1.getContext('2d');
	this.ow=new Image();
	this.ow.src="img/owlogo.png";
	this.money = new Image();
	this.money.src="img/money.png";
	this.box1=new Image();
	this.outbox=outbox;
	this.width=600;
	this.height=520;
	this.boxwidth=40;
	this.boxheight=45;
	this.loca={dx:0,dy:0,dw:40,dh:45};
	//箱子地图
	this.boxmap=[
		[0,0,1,1,0,0,0,1,0,0,0,1,1,1,1],//1
		[0,1,1,0,2,2,2,0,2,2,2,0,1,1,1],//2
		[1,1,0,2,0,1,0,2,0,1,0,2,0,1,1],//3
		[1,0,2,0,1,1,1,1,1,1,1,0,2,0,1],//4
		[1,0,2,1,1,1,1,1,1,1,1,1,2,0,1],//5
		[1,0,2,0,1,1,1,1,1,1,1,0,2,0,1],//6
		[1,0,2,1,1,1,1,1,1,1,1,1,2,0,1],//7
		[1,1,0,2,0,1,1,1,1,1,0,2,0,1,1],//8
		[1,1,1,0,2,1,1,1,1,1,2,0,1,1,1],//9
		[1,1,1,1,0,2,0,1,0,2,0,1,1,1,1],//10
		[1,1,0,1,1,0,2,2,2,0,1,1,0,1,1],//11
		[1,0,0,1,1,1,0,0,0,1,1,1,0,0,1],//12
		[1,0,0,1,1,1,1,1,1,1,1,1,0,0,1] //13
	];
	//宝藏地图
	this.moneymap=[
		[0,0,0,0,0,0,0,2,0,0,0,0,0,2,0],//1
		[0,0,0,0,2,0,2,0,0,0,2,0,0,0,0],//2
		[0,0,0,0,0,0,0,2,0,0,0,2,0,0,0],//3
		[0,0,2,0,0,0,0,0,0,2,0,0,0,0,0],//4
		[0,0,0,0,0,2,0,0,0,0,0,0,2,0,0],//5
		[0,0,2,0,0,0,0,1,0,0,0,0,0,0,2],//6
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//7
		[0,0,0,2,0,0,2,0,0,0,0,0,0,0,0],//8
		[0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],//9
		[2,0,0,0,0,2,0,2,0,0,0,0,0,0,0],//10
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],//11
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//12
		[0,0,0,0,0,0,0,0,2,0,0,0,0,0,0] //13		
	]
}

Ground.prototype.box= function (){
	var This = this;
	This.money.onload = function (){
		for(var n=0;n<13;n++){
			for(var i=0;i<15;i++){
				if(This.boxmap[n][i]==1){
					//创建box1
					var box1=document.createElement('img');
					box1.classList.add('img1','boxall');
					box1.src='img/box1.jpg';
					box1.style.top=n*40+"px";
					box1.style.left=i*40+"px";
					This.outbox.appendChild(box1);
				}else if(This.boxmap[n][i]==2) {
					var box2=document.createElement('img');
					box2.classList.add('img1','boxall');
					box2.src='img/box2.jpg';
					box2.style.top=n*40+"px";
					box2.style.left=i*40+"px";
					This.outbox.appendChild(box2);
				}else if(This.boxmap[n][i]==0){
					var box3=document.createElement('img');
					box3.classList.add('img2','boxall');
					box3.style.top=n*40+"px";
					box3.style.left=i*40+"px";
					This.outbox.appendChild(box3);
				}
				if(This.moneymap[n][i]==2){
					// console.log(This.b2)
					This.b2.drawImage(This.money,250,250,200,200,i*40,n*40,40,40);
				} else if(This.moneymap[n][i]==1){
					This.b2.drawImage(This.ow,0,0,320,313,i*40+5,n*40+8,30,30);
				}
			}
		}
	}
	
	
};
