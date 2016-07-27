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