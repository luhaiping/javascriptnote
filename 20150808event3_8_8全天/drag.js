
function down(e){
	this.x=this.offsetLeft;
	this.y=this.offsetTop;
	this.mx=e.pageX;
	this.my=e.pageY;
	if(this.setCapture){
		this.setCapture();
		on(this,"mousemove",move);
		on(this,"mouseup",up);
		}else{
			
			this.MOVE=processThis(move,this);
			this.UP=processThis(up,this);
			on(document,"mousemove",this.MOVE);
			on(document,"mouseup",this.UP);
			}
			e.preventDefault();
			//selfDragStart拖拽开始
			selfRun.call(this,"selfDragStart",e);//通知
			
}
function move(e){
	this.style.left=e.pageX-this.mx+this.x+"px";
	this.style.top=e.pageY-this.my+this.y+"px";
	//selfDragging拖拽进行中，HTML5
	selfRun.call(this,"selfDragging",e);//通知
}
function up(e){
	if(this.releaseCapture){
		this.releaseCapture()
		off(this,"mousemove",move)
		off(this,"mouseup",up)
	}else{
		off(document,"mousemove",this.MOVE)
		off(document,"mouseup",this.UP)
	}
	//selfDragEnd拖拽结束。给DOM元素添加的自定义事件
	selfRun.call(this,"selfDragEnd",e);
}
//事件和事件绑定
//浏览器事件是硬件行为。事件，无硬件还是软件的，就是指“一件事”
//A-中介-B --约定模式就是事件绑定
