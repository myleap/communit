

function TopMenu (wrapper, options)
{
	if(wrapper == null || wrapper == undefined || wrapper == '')
  {
    return;
  }
  this.wrapperId = wrapper;
  this.wrapperEl = this.getWrapperElement(this.wrapperId);
  if (!this.wrapperEl) 
  {
    return;
  }
  
  this.options = this.applyDefaults(options || {});
	
	this.nameEnable = true;
  if(this.options.name == null || this.options.name == undefined || this.options.name == '')
  {
    this.nameEnable = false;
  }
	this.leftNameEnable = true;
  if(this.options.leftName == null || this.options.leftName == undefined || this.options.leftName == '')
  {
    this.leftNameEnable = false;
  }
	this.rightNameEnable = true;
  if(this.options.rightName == null || this.options.rightName == undefined || this.options.rightName == '')
  {
    this.rightNameEnable = false;
  }
	this.leftIconEnable = true;
  if(this.options.leftIcon == null || this.options.leftIcon == undefined || this.options.leftIcon == '')
  {
    this.leftIconEnable = false;
  }
	this.rightIconEnable = true;
  if(this.options.rightIcon == null || this.options.rightIcon == undefined || this.options.rightIcon == '')
  {
    this.rightIconEnable = false;
  }
	  
	this.init();
}

TopMenu.prototype = 
{
  defaults: 
  {
    reserve: true
  },
  
  init: function () 
  {
//	alert("init");
  
		var html = '<div class="topMenu">';
		
		
		if(this.nameEnable)
		{//中间名称应该放在最前面，方便单击左侧名称和右侧名称的定位。
			html += '<div class="topMenu-name topMenu-middleName">'+this.options.name+'</div>';
		}
		
		if(this.leftNameEnable)
		{
			html += '<div class="topMenu-name topMenu-leftName">'+this.options.leftName+'</div>';
		}
		else if(this.leftIconEnable)
		{
			html += '<div class="topMenu-icon topMenu-leftIcon"><img src="'+this.options.leftIcon+'"/></div>';
		}
		
		if(this.rightNameEnable)
		{
			html += '<div class="topMenu-name topMenu-rightName">'+this.options.rightName+'</div>';
		}
		else if(this.rightIconEnable)
		{
			html += '<div class="topMenu-icon topMenu-rightIcon"><img src="'+this.options.rightIcon+'"/></div>';
		}
		
		html += '</div>';
//		alert("html="+html);
		this.wrapperEl.innerHTML = html;
		
		this.cssSet();
		this.clickEventSet();
  },
  
  cssSet: function ()
	{
//		alert("cssSet");
		this.wrapperEl.style.backgroundColor = this.options.backgroundColor;
  	
  	
  	if(this.nameEnable)
  	{
	  	$("#"+this.wrapperId+" .topMenu-name").css("color",this.options.fontColor);
	  	$("#"+this.wrapperId+" .topMenu-name").css("font-size",this.options.nameSize);
	  	$("#"+this.wrapperId+" .topMenu-name").css("font-weight",this.options.nameWeight);
  	}
	  
	 	if(this.leftNameEnable)
		{
	  	$("#"+this.wrapperId+" .topMenu-leftName").css("color",this.options.fontColor);
	  	$("#"+this.wrapperId+" .topMenu-leftName").css("font-size",this.options.leftNameSize);
	  	$("#"+this.wrapperId+" .topMenu-leftName").css("font-weight",this.options.leftNameWeight);
		}
		else if(this.leftIconEnable)
	 	{
  		$("#"+this.wrapperId+" .topMenu-leftIcon img").attr("src",this.options.leftIcon);
	 	}
	  
	 	if(this.rightNameEnable)
		{
	  	$("#"+this.wrapperId+" .topMenu-rightName").css("color",this.options.fontColor);
	  	$("#"+this.wrapperId+" .topMenu-rightName").css("font-size",this.options.rightNameSize);
	  	$("#"+this.wrapperId+" .topMenu-rightName").css("font-weight",this.options.rightNameWeight);
		}
		else if(this.rightIconEnable)
	  {
  		$("#"+this.wrapperId+" .topMenu-rightIcon img").attr("src",this.options.rightIcon);
	  }
	},
	
  clickEventSet: function () 
  {
//		alert("clickEventSet()");
		var that = this;
		
		if(this.options.callbackClickLeft)
		{
			if(this.leftNameEnable)
			{
				$("#"+this.wrapperId+" .topMenu-leftName")[0].onclick = function()
				{ 
					 that.options.callbackClickLeft();
				};
			}
			if(this.leftIconEnable)
			{
				$("#"+this.wrapperId+" .topMenu-leftIcon")[0].onclick = function() 
				{ 
					 that.options.callbackClickLeft();
				};
			}
		}
		
		if(this.options.callbackClickRight)
		{
			if(this.rightNameEnable)
			{
				$("#"+this.wrapperId+" .topMenu-rightName")[0].onclick = function() 
				{
					 that.options.callbackClickRight();
				};
			}
			if(this.rightIconEnable)
			{
				$("#"+this.wrapperId+" .topMenu-rightIcon")[0].onclick = function() 
				{ 
					 that.options.callbackClickRight();
				};
			}
		}
	},
	
  applyDefaults: function(options) {
    for (var k in this.defaults) {
      if (!options.hasOwnProperty(k)) {
        options[k] = this.defaults[k];
      }
    }
    return options;
  },
  
  getWrapperElement: function(wrapper) {
    if (typeof(wrapper) == 'string') {
      return document.getElementById(wrapper);
    } else {
      return wrapper;
    }
  },
  
	test: function ()
	{
//		alert("test");
	}
}


