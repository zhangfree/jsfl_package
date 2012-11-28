/**
 * fla生成界面代码脚本。能把场景上的文本，资源生成代码坐标
 * @author Pelephone
 */
 
fl.outputPanel.clear();
fl.trace("////////////////////////////////////////////");
fl.trace("// jsfl自动生成!");

// 变量分隔符
var elmSplit = "$";
// 组分隔
var groupSplit = "_";

traceVars();
function traceVars(){
	
	var timeline = fl.getDocumentDOM().getTimeline();
	var layers = timeline.layers;
	

	var str1 = "";
	var str = "";
	var funObj = {};
	
	var newVar = "private var {vName}:{vType};\n";
	var newInj = "{vName} = Reflection.{refType}(DefaultSkinConfig.{linkName});\n";
	var newInj2 = "{vName} = new {vType}();\n";
	var newTrans = "var trans:Transform = new Transform({vName});\n"
	var newMtx = "var mtx:Matrix = new Matrix({mxa}, {mxb}, {mxc}, {mxd}, {mxtx}, {mxty})\n";
	
	var varStr = "";	// 创建变量
	var varInj = "";	// 变量注入
	var varSet = "";	// 变量属性设置
	var varTxt = "";	// 文本内容设置
	var addStr = "";
	
	var hasTfm = false;
	for(ilayer=layers.length-1; ilayer>=0; ilayer--)
	{
		layer = layers[ ilayer ];
		if(layer.layerType=="guide") continue;
		
		frame = layer.frames[0];
		var elements = frame.elements;
		
		var elmDeps = [];
		
		// 遍历每一个元素生成引用方法
		for(iele=0; iele<elements.length; iele++){
			var obj = elements[iele];
			elmDeps.push(obj);
			
			var vName = obj.name;	//变量名
			if(!vName) {
				vName = "skinDsp" + iele;
				obj.name = vName;
			}
			var vType = changeType(obj);	// 变量类型
			var refType = changeType2(obj);
			var linkName = null;	// 导出名
			if(obj.libraryItem && obj.libraryItem.linkageExportInFirstFrame)
				linkName = obj.libraryItem.linkageClassName;
			
			aNewVar = newVar.replace("{vName}",vName);
			aNewVar = aNewVar.replace("{vType}",vType);
			
			
			if(linkName!=null)
			{
				var pStr = "gui_";
				var guid = linkName.indexOf(pStr);
				var effName = backInject(linkName,vName);
				
				if(guid>=0)
				{
					var ttype = backType(pStr,linkName);
					aNewVar = newVar.replace("{vName}",vName);
					aNewVar = aNewVar.replace("{vType}",ttype);
				}
				
				if(effName)
					aNewInj = effName;
				else if(guid>=0)
				{
					aNewInj = newInj2.replace("{vName}",vName);
					aNewInj = aNewInj.replace("{vType}",ttype);
				}
				else
				{
					aNewInj = newInj.replace("{vName}",vName);
					aNewInj = aNewInj.replace("{vType}",vType);
					aNewInj = aNewInj.replace("{refType}",refType);
					aNewInj = aNewInj.replace("{linkName}",linkName.toLocaleUpperCase());
				}
			}
			else
			{
				aNewInj = vName + " = " + getCreate(obj) + ";\n";
			}
			
			varStr += aNewVar;
			if(vName)
				varInj += aNewInj;
			
			if(obj.elementType=="text" && obj.getTextString() && obj.length>0)
			{
				var arr= obj.getTextString().split("\r");
				var tstr = arr[0];
				varSet += "// " + tstr + "\n";
			}
			
			varSet += vName + ".x = " + Math.round(obj.x) + ";\n";
			varSet += vName + ".y = " + Math.round(obj.y) + ";\n";
			
			if(obj.scaleX!=1)
			{
//				varSet += vName + ".scaleX = " + obj.scaleX + ";\n";
				varSet += vName + ".width = " + Math.round(obj.width) + ";\n";
			}
			if(obj.scaleY!=1)
			{
//				varSet += vName + ".scaleY = " + obj.scaleY + ";\n";
				varSet += vName + ".height = " + Math.round(obj.height) + ";\n";
			}
			if(obj.rotation!=0 && obj.rotation)
				varSet += vName + ".rotation = " + obj.rotation + ";\n";
			
			
			var matx = obj.matrix;
			if(matx && (matx.b!=0 || matx.c!=0))
			{
				varTr = newTrans.replace("{vName}",vName);
				varMX = newMtx.replace("{mxa}",matx.a);
				varMX = varMX.replace("{mxb}",matx.b);
				varMX = varMX.replace("{mxc}",matx.c);
				varMX = varMX.replace("{mxd}",matx.d);
				varMX = varMX.replace("{mxtx}",matx.tx);
				varMX = varMX.replace("{mxty}",matx.ty);
				varSet += varTr + varMX;
				varSet += "trans.matrix = mtx;\n";
			}
			
			// 如果是文本生成处理要麻烦些
			if(obj.elementType=="text")
			{
				if(!obj.selectable)
					varSet += vName + ".selectable = " + obj.selectable + ";\n";
				
				if(obj.textType != "dynamic" && obj.textType != "static")
					varSet += vName + ".type = \"" + obj.textType + "\";\n";
				
				if(obj.border)
					varSet += vName + ".border = " + obj.border + ";\n";
				
				if(obj.lineType == "multiline")
				{
					varSet += vName + ".multiline = true;\n";
					varSet += vName + ".wordWrap = true;\n";
				}
				else if(obj.lineType == "multiline no wrap")
				{
					varSet += vName + ".multiline = true;\n";
					varSet += vName + ".wordWrap = false;\n";
				}
				if(obj.lineType == "password")
					varSet += vName + ".displayAsPassword = true;\n";
					
				if(obj.scaleX==1)
					varSet += vName + ".width = " + obj.width + ";\n";
				if(obj.scaleY==1)
					varSet += vName + ".height = " + obj.height + ";\n";
					
				var txtSize = obj.getTextAttr("size");
				var txtAlign = obj.getTextAttr("alignment");
				var txtFace = obj.getTextAttr("face");
				var txtBold = obj.getTextAttr("bold");
				var txtItalic = obj.getTextAttr("italic");
				var txtTarget = obj.getTextAttr("target");
				var txtUrl = obj.getTextAttr("url");
				var txtColor = obj.getTextAttr("fillColor");
				var txtIndent = obj.getTextAttr("indent");
				
				
				if(txtColor!="#000000")
				{
					txtColor = txtColor.replace("#","");
					varSet += vName + ".textColor = 0x" + txtColor + ";\n";
				}
				
				if(txtBold)
					varSet += vName + ".bold = " + txtBold + ";\n";
				
				if(txtAlign!="left" || txtItalic!=false || txtTarget || txtUrl || txtIndent || txtSize!=12)
				{
					//varSet += "var tfm:TextFormat = new TextFormat();\n";
					varSet += "tfm = new TextFormat();\n";
					hasTfm = true;
					
					if(txtAlign!="left")
						varSet += "tfm.align = TextFormatAlign." + txtAlign.toUpperCase() + ";\n";
					if(txtItalic)
						varSet += "tfm.italic = " + txtItalic + ";\n";
					if(txtTarget)
						varSet += "tfm.target = \"" + txtTarget + "\";\n";
					if(txtUrl)
						varSet += "tfm.url = \"" + txtUrl + "\";\n";
					if(txtIndent)
						varSet += "tfm.indent = " + txtIndent + ";\n";
					if(txtSize)
						varSet += "tfm.size = " + txtSize + ";\n";
					
					varSet += vName + ".defaultTextFormat = tfm;\n";
				}
				
				if(obj.getTextString() && obj.length>0)
				{
					arr = obj.getTextString().split("\r");
					tstr = arr.join("\\n");
					varTxt += vName + ".text = \"" + tstr + "\";\n";
				}
			}
			
			addStr += "addChild(" + vName + ");\n";
		
			varSet += "\n";
		}
	}
	
	
	if(hasTfm)
		varSet = "var tfm:TextFormat;\n" + varSet;
		
	resStr = "// 代码生成于:" + fl.getDocumentDOM().name + ">" + fl.getDocumentDOM().getTimeline().name + "\n";
	resStr += "//\n" + varStr + "\n";
	resStr += "// 创建注入\n" + varInj + "\n";
	resStr += "// 设置属性\n" + varSet + "\n";
	resStr += "// 加入容器层级\n" + addStr + "\n";
	resStr += "// 其它设置\n" + varTxt + "\n";
	
	fl.trace(resStr);
		
	// 复制到剪贴板
	fl.clipCopyString(resStr);
}

// 创建函数
function getCreate(elm)
{
	if(elm.elementType=="text")
		return "new TextField()";
	else
	{
		if(!elm.libraryItem || !elm.libraryItem.itemType) return "new Sprite()";
		switch(elm.libraryItem.itemType)
		{
			case "movie clip":
				if(elm.libraryItem.timeline.frameCount==1) return "new Sprite()";
				return "new MovieClip()";
			break;
			case "button":
				return "new SimpleButton()";
			break;
			case "text":
				return "new TextField()";
			break;
			default:
				return "new Sprite()";
			break;
		}
	}
}

function changeType(elm)
{
	if(elm.elementType=="text")
		return "TextField";
	else{
		if(!elm.libraryItem || !elm.libraryItem.itemType) return "DisplayObject";
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
			case "bitmap":
				return "BitmapData";
			default:
				return "DisplayObject";
			break;
		}
	}
}

function changeType2(elm)
{
	if(elm.elementType=="text")
			return "tf";
	else{
		if(!elm.libraryItem.itemType) return "disp";
		switch(elm.libraryItem.itemType)
		{
			case "movie clip":
				if(elm.libraryItem.timeline.frameCount==1) return "createSpriteInstance";
				return "createMovieClipInstance";
			break;
			case "button":
				return "createSimpleButtonInstance";
			break;
			case "text":
				return "tf";
			break;
			case "bitmap":
				return "createBitmapDataInstance";
			default:
				return "createSpriteInstance";
			break;
		}
	}
}
// 返回类型字符串
function backType(typeStr,linkName)
{
	if(typeStr.indexOf("gui_ResImage")>=0)
		return "ResImage";
	else
		return linkName.substring(typeStr.length);
}
// 特殊导出名生成注入字符
function backInject(linkName,vName)
{
	if(linkName == "gui_CustomTabNavigator")
//		return "var tabDatas:Array = [{label:\"标签1\"},{label:\"标签2\"},{label:\"标签3\"}];\n"
//			+ "var tabConts:Array = [];\n" + 
		return vName + " = new CustomTabNavigator([],[]));\n";
	else if(linkName == "gui_List")
	{
		return null;
	}
	else if(linkName.indexOf("gui_ResImage")>=0)
	{
		var tlen = "gui_ResImage".length;
		if(linkName.length <= tlen)
			return null;
		
		return vName + "= new ResImage();\n";
	}
	return null;
}