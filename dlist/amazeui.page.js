!function($){
	"use strict";
	function page(data){
		this.$element=data.element;
		this.first=true;
		data.option.curr=data.option.curr||1;
		data.option.groups=(typeof data.option.groups!="undefined")?data.option.groups:5;
		this.option=data.option;
		this._init();
	}

	page.prototype._init=function(){
		if(this.option.groups>0){
			this.option._prev=Math.ceil(this.option.groups/2);
			this.option._next=Math.floor(this.option.groups/2);
			this.option._status={prev:false,next:false};
		}
		if(this.option.before){
			var _this=this;
			this.option.before(this,function(){
				_this._load();
			});
		}else{
			this._load();
		}		
	}

	page.prototype._load=function(){
		var option=this.option;
		if(!option.pages||option.pages==1){
			return false;
		}
		var $element = this.$element;
		var $ul=$("<ul></ul>");
		var type=option.type?option.type:'default';
		$ul.addClass('am-pagination am-pagination-'+type);
		$element.html($ul)

		var list=[];
		if(option.curr>1&&option.prev!==false)list.push({key:'prev',value:option.prev||'上一页',page:option.curr-1});
		if(option.first)list.push({key:'first',value:option.first,page:1});
		for(var i=1;i<=option.pages;i++){
			list.push({key:i,value:i,page:i});
		}
		if(option.last)list.push({key:'last',value:option.last,page:option.pages});
		if(option.curr!=option.pages&&option.next!==false)list.push({key:'next',value:option.next||'下一页',page:option.curr+1});
		var judge=function(option,index){
			var result='<span>...</span>';
			if(index<=((option.curr+option._next)<option.pages?option.curr-option._prev:option.pages-option.groups)){
				result=option._status.prev?"":result;
				option._status.prev=true;
				return result;
			}
			if(index>((option.curr+option._next)<option.groups?option.groups:option.curr+option._next)){
				result=option._status.next?"":result;
				option._status.next=true;
				return result;				
			}
			return false;
		}
		var render=function(context,$li,index){
			var option=context.option,r;
			//是否显示分页按钮
			if(option.groups==0&&typeof index=="number"){
				return false;
			}
			//数量
			if(typeof index=="number"&&option.groups<option.pages){
				if((r=judge(option,index))!==false){
					return r;
				}
			}
			//当前按钮
			if(option.curr==index){
				$li.addClass('am-active');
			}
			return $li;
		}
		var _render=option.render?option.render:render;
		for (var i in list) {
			var $li=$('<li><a href="javascript:" data-page="'+list[i]['page']+'">'+list[i]['value']+'</a></li>');
			var res;
			if(!option.render||!(res=option.render(this,$li,list[i]['key']))){
				res=render(this,$li,list[i]['key']);
			}
			$ul.append(res);
		}
		this._on();
		if(this.option.after){
			var _this=this;
			this.option.after(this,function(){
				_this._jump();
			});
		}else{
			this._jump();
		}
	}

	page.prototype._on=function(){
		var _this=this;
		_this.$element.one('click','li a',function(){
			_this.option.curr=$(this).data('page');
			_this._init();
		});	
	}

	page.prototype._jump=function(){
		if(this.option.jump){
			this.option.jump(this,this.first);
		}
		this.first=false;
	}
	
	page.prototype.remove=function(callback){
		this.$element.remove();
		if(callback)callback();
	}
	
	page.prototype.setCurr=function(curr,callback){
		this.option.curr=typeof curr=='number'?curr:parseInt(curr);
		this._init();
		if(callback)callback();
	}

	$.fn.extend({
		'page':function(option){
			return new page({
				element:this,
				option:option
			});
		}
	});
	if($("[data-am-page]").length>1){
		console.log($("[data-am-page]"))
	}
	
}(jQuery);