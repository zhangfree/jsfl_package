fl.outputPanel.clear();
fl.trace("////////////////////////////////////////////");
fl.trace("// jsfl自动生成");

// 变量分隔符
var elmSplit = "$";
// 组分隔
var groupSplit = "_";

traceVars();
function traceVars(ty){
	if(!ty) ty = "private";
	var selItems = fl.getDocumentDOM().library.getSelectedItems();

	var timeline = selItems[0].timeline;
	var layers = timeline.layers;
	

	var str1 = "";
	var str = "";
	var funObj = {};
	// 遍历每一个图层
	for(ilayer=0; ilayer<layers.length; ilayer++)
	{
		layer = layers[ ilayer ];
		if(layer.layerType=="guide") continue;
		
		frame = layer.frames[0];
		elements = frame.elements;
		
		// 遍历每一个元素生成引用方法
		for(iele=0; iele<elements.length; iele++){
			element = elements[iele];
			
			// 有实例名的元素输出变量
			if(element.name){
				var vaName = element.name;
				
				vaName = vaName.toUpperCase();
				str1 += 'static ' + ty + ' const ' + vaName + '_NAME:String = "' +element.name + '";\n';
				
				var reType = changeType(element);
				str += ty + ' function get ' + element.name + '():' + reType + 
				'{return skin["' + element.name + '"] as ' + reType + ";}\n";
				
				var tid = element.name.indexOf(groupSplit);
				if(tid>=0){
					var tt = element.name.substring(0,tid);
					funObj[tt] = reType;
				}
			}
		}
	}
		
		
	var funStr = "";
	for (var attrName in funObj) 
	{
		var key = "";
		var argStr = "";
		var argStr2 = "";
		var argStr3 = "";
		var attrLs = attrName.split(elmSplit);
		var i = 0;
		for each(var ao in attrLs){
			argStr += "," + ao + ":int";
			argStr2 += elmSplit + ao;
			var aa = "";
			if(i++!=0) aa = " + \"" + elmSplit + "\"";
			argStr3 += aa + " + " + ao;
			key += ao.charAt(0).toUpperCase() + ao.substring(1);
		}
		argStr = argStr.substring(1);
		argStr2 = argStr2.substring(1);
		funStr += "//"
			+ "\n" + ty + " function get" + key + "(" + argStr + "):" + funObj[attrName]
			+ "\n{"
			+ "\n\t return skin[\"" + argStr2 + groupSplit + "\"" + argStr3 + "] as " + funObj[attrName] + ";"
			+ "\n}\n\n";
	}
		
	fl.trace(str1);
	fl.trace("");
	fl.trace(str);
	fl.trace(funStr);
	
	// 复制到剪贴板
	fl.clipCopyString(str + funStr);
}

function changeType(elm)
{
	if(elm.elementType=="text")
		return "TextField";
	else{
		if(!elm.libraryItem.itemType) return "DisplayObject";
		switch(elm.libraryItem.itemType)
		{
			case "movie clip":
				if(elm.libraryItem.timeline.frameCount==1) return "Sprite";
				return "MovieClip";
			break;
			case "button":
				return "SimpleButton";
			break;
			case "text":
				return "TextField";
			break;
			default:
				return "DisplayObject";
			break;
		}
	}
}

function changeType2(elm)
{
	if(elm.elementType=="text")
			return "tf_";
	else{
		if(!elm.libraryItem.itemType) return "disp_";
		switch(elm.libraryItem.itemType)
		{
			case "movie clip":
				if(elm.libraryItem.timeline.frameCount==1) return "sp_";
				return "mc_";
			break;
			case "button":
				return "sb_";
			break;
			case "text":
				return "tf_";
			break;
			default:
				return "disp_";
			break;
		}
	}
}