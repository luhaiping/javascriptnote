function on(ele,type,fn){//登记
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
		return;	
	}
	if(!ele["aEvent"+type]){
		ele["aEvent"+type]=[];//建一个程序池	
		ele.attachEvent("on"+type,function(){run.call(ele)});		
	}
	var a=ele["aEvent"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;	
	}
	a.push(fn);	
}
function off(ele,type,fn){	
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
		return;	
	}
	var a=ele["aEvent"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				break;	
			}
		}
	}
}
function run(e){
	e=e||window.event;
	var a=this["aEvent"+e.type];
	if(!e.target){
		e.preventDefault=function(){this.returnValue=false;}
		e.stopPropagation=function(){this.cancelBubble=true;}
		e.target=e.srcElement;
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
	}
	
	if(a){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);	
			}else{
				a.splice(i,1);	
				i--;
			}
		}
	}
}
function processThis(fn,obj){
	return function(e){fn.call(obj,e);}
}