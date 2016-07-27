 function down(e){
	this.y=this.offsetTop;
	this.x=this.offsetLeft;
	this.l=e.pageX;
	this.t=e.pageY;
	if(this.setCapture){
		this.setCapture();
		on(this,"mousemove",move);
		on(this,"mouseup",up);
	}else{
		var that=this;
		this.Move=function(e){move.call(that,e)};
		this.Up=function(e){up.call(that,e)};
		on(document,"mousemove",this.Move);
		on(document,"mouseup",this.Up);
	}
	e.preventDefault();
}
function move(e){	
	this.style.left=e.pageX-this.l+this.x+"px";
	this.style.top=e.pageY-this.t+this.y+"px";
	//所谓的通知就是当此事发生的时候，让定阅（约定）了以"selfDragging"这个字符串为标识的那些方法（行为）来执行
	//所有的这些行为，都保存在以selfDragging为区分符的数组里了，我们去遍历执行这个数组就可以了
 	selfRun.call(this,"selfDragging",e);//这个就叫通知
}
function up(e){
	if(this.releaseCapture){
		this.releaseCapture();
		off(this,"mousemove",move);
		off(this,"mouseup",up)
	}else{
		off(document,"mousemove",this.Move);
		off(document,"mouseup",this.Up)
	}
	selfRun.call(this,"selfDragEnd",e);
}
