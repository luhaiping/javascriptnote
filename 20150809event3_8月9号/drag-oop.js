function Emitter(){};//报警器类，发射器类,EventEmitter
Emitter.prototype.on=function(type,fn){
	if(!this["a"+type]){
		this["a"+type]=[];	
	}
	var a=this["a"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;	
	}
	a.push(fn);
}
Emitter.prototype.run=function(type,e,context){

	var a=this["a"+type];
	if(a){
		context=context||this;
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(context,e);
			}else{
				a.splice(i,1);
				i--;	
			}
		}
	}
}
Emitter.prototype.off=function(type,fn){
	var a=this["a"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				break;	
			}
		}
	}
}

function Drag(){
	this.ele=ele;
	this.x=null;
	this.y=null;
	this.mx=null;
	this.my=null;
	this.DOWN=processThis(this.down,this);
	this.MOVE=processThis(this.move,this);
	this.UP=processThis(this.up,this);
	on(this.ele,"mousedown",this.DOWN);//
	
}
Drag.prototype=new Emitter;
Drag.prototype.down=function(e){//this是当前类的实例
	this.x=this.ele.offsetLeft;
	this.y=this.ele.offsetTop;
	this.mx=e.pageX;
	this.my=e.pageY;
	if(this.ele.setCapture){
		this.ele.setCapture();
		on(this.ele,"mousemove",this.MOVE);
		on(this.ele,"mouseup",this.UP);	
	}else{
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP);
	}
	e.preventDefault();
	this.run("dragStart",e);//去掉了第三个参数，让被绑定的方法在执行的时候，让this还是指向这里的this
}
Drag.prototype.move=function(e){
	this.ele.style.left=e.pageX-this.mx+this.x+"px";
	this.ele.style.top=e.pageY-this.my+this.y+"px";
	this.run("dragging",e);//去掉了第三个参数，让被绑定的方法在执行的时候，让this还是指向这里的this
}
Drag.prototype.up=function(e){
	if(this.ele.releaseCapture){
		this.ele.releaseCapture();
		off(this.ele,"mousemove",this.MOVE);
		off(this.ele,"mouseup",this.UP);
	}else{
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);
	}
	this.run("dragEnd",e);
}

Drag.prototype.addBorder=function(){
	this.ele.style.border="2px dashed lightBlue";
}
Drag.prototype.removeBorder=function(){
	this.ele.style.border="";
}
Drag.prototype.border=function(){
	this.on("dragStart",this.addBorder);
	this.on("dragEnd",this.removeBorder);
}