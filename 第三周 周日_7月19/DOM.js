var DOM={};
DOM.listToArray=function(eles){
		try{
			var a=[].slice.call(eles,0);
			eles.slice(0)
		}catch(e){
			var a=[];
			for(var i=0;i<eles.length;i++){
				a.push(eles[i]);	
			}
		}
		return a;
}

DOM.getIndex=function(ele){
	var index=0;
	var prev=ele.previousSibling;
	while(prev){
		if(prev.nodeType===1){
			index++;	
		}
		prev=prev.previousSibling;
	}
	return index;
}

DOM.siblings=function(ele){
	var a=[];
	/*var prev=ele.previousSibling;
	while(prev){
		if(prev.nodeType==1){
			a.push(prev);	
		}
		prev=prev.previousSibling;
	}
	a.reverse();
	var next=ele.nextSibling;
	while(next){
		if(next.nodeType===1){
			a.push(next);
		}	
		next=next.nextSibling;
	}*/
	var child=ele.parentNode.firstChild;
	while(child){
		if(child!=ele){	//确保当前被判断的元素不是自己		
			if(child.nodeType===1){
				a.push(child);	
			}			
		}
		child=child.nextSibling;
	}
	return a;	
}
DOM.prevSiblings=function(ele){
	var child=ele.parentNode.firstChild;
	var a=[];
	while(child){
		if(child==ele)break;
		if(child.nodeType===1){
				a.push(child);
		}
		child=child.nextSibling;
	}
	return a;
}
DOM.nextSiblings=function(ele){
	var a=[];
	var child=ele.parentNode.lastChild;
	while(child){
		if(child==ele)break;
		if(child.nodeType===1){
			a.unshift(child);	
		}
		child=child.previousSibling;		
	}
	return a;
}

DOM.closest=function(ele){//把相邻的哥哥和弟弟找到
	var p=ele.previousSibling;
	var a=[];
	while(p){
		if(p.nodeType===1){
			a.push(p);
			break;//一但找到，则退出循环
		}
		p=p.previousSibling;
	}
	
	var n=ele.nextSibling;
	while(n){
		if(n.nodeType===1){
			a.push(n);
			break;
		}
		n=n.nextSibling;
	}	
	return a;
	
}
DOM.next=function(ele){
	var n=ele.nextSibling;
	while(n){
		if(n.nodeType===1){
			return n;			 
		}
		n=n.nextSibling;
	}	
	return null;
}
DOM.prev=function(ele){
	if(ele.previousElementSibling){
		return ele.previousElementSibling;	
	}
	var p=ele.previousSibling;
	while(p){
		if(p.nodeType===1){
			return p;
		}
		p=p.previousSibling;
	}
	return null;
	
}
DOM.children=function(parent,tag/* 第二个参数可选，表示指定的标记名 */){//获得parent这个父节点的所有元素子节点
	//parent.children;//得到的是所有的元素节点，有兼容问题，在IE中会包括注释节点
	var a=[];
	if(typeof tag=="undefined"){
		var childNodes=parent.childNodes;	
		for(var i=0;i<childNodes.length;i++){
			var child=childNodes[i];
			if(child.nodeType===1){
				a.push(child);	
			}
		}
	}else if(typeof tag=="string"){
		tag=tag.toUpperCase();
		var childNodes=parent.childNodes;	
		for(var i=0;i<childNodes.length;i++){
			var child=childNodes[i];
			if(child.tagName==tag){
				//tagName它不是DOM的属性，DHTML，DOM0 DOM core。这个属性是元素节点专有的
				a.push(child);	
			}
		}
	}else{
	 	throw new Error("第二参数类型错误！");	
	}
	return a;
}

DOM.getElesByClass=function(str,context){
	context=context||document;
	if(context.getElementsByClassName)
		return context.getElementsByClassName(str);
		
	var regTrim=/^ +| +$/g;
	str=str.replace(regTrim,"");
	var aClass=str.split(/ +/);
	var eles=context.getElementsByTagName("*");
	for(var i=0;i<aClass.length;i++){
		//eles=byClass(aClass[i],eles)
		var strClass=aClass[i];
		var regClass=new RegExp("(?:^| )"+strClass+"(?: |$)");
		var a=[];
		for(var j=0;j<eles.length;j++){
			var ele=eles[j];
			if(regClass.test(ele.className)){
				a.push(ele);
			}
		}
		eles=a;
	}
	return eles;	
}

DOM.addClass=function(ele,strClass){
	var reg=new RegExp("(?:^| )"+strClass+"(?: |$)");
	if(!reg.test(ele.className))ele.className+=" "+strClass;
}

DOM.removeClass=function(ele,strClass){
	var reg=new RegExp("(?:^| )"+strClass+"(?: |$)","g");
	ele.className=ele.className.replace(reg,"");
}