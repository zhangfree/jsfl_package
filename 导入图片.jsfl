var quality = 80;
fl.outputPanel.clear();
var resourcePath = fl.browseForFolderURL("请选择素材路径：");
fl.trace(resourcePath);
var dom = fl.getDocumentDOM();
var lib = dom.library;

analyseFolder(resourcePath);
// 导入图片，导出swf
function analyseFolder(folderPath)
{
	var fileList = FLfile.listFolder(resourcePath,"files");
	var index = 0;
	for(var i =0; i < fileList.length; i++)
	{
	 	var fileName=fileList[i];
 	 	var ind=fileName.indexOf(".");
	    //如果没有后缀或后缀不正确则略过
	    if(ind<=0||ind==(fileName.length-1))
	    {
	        continue;
	    }
	  	//后缀
	    var ext=fileName.substr(ind+1,fileName.length-ind);
	    ext=ext.toLowerCase();
	    //不是图片则略过
	    if(ext!="png")
	    {
	         continue;
	    }
	    //不要后缀的文件名
	    shortName = fileName.substr(0,ind);
		var filePath = folderPath + "/" + fileName;
		dom.importFile(filePath,true);
		//选择项
	    lib.selectItem(fileName);
		if(lib.getItemType() == "bitmap")
		{
	     	//var cls = "image" + (index * 2 + 1);
			var cls = shortName;
	        //使用文档的压缩质量，可在导出时设置
	   		lib.setItemProperty("compressionType","photo");
			lib.setItemProperty("useImportedJPEGQulity",true);
			lib.setItemProperty("quality",quality);
			lib.setItemProperty("linkageExportForAS",true);
			lib.setItemProperty("linkageExportInFirstFrame",true);
			lib.setItemProperty("linkageBaseClass","flash.display.BitmapData");
			lib.setItemProperty("linkageClassName",cls);
			lib.addItemToDocument({x:0,y:0});
			var p;// = positions[index];
			if(p)
			{
				var mat = fl.getDocumentDOM().getTimeline().layers[0].frames[index].elements[0].matrix;
				mat.tx = p.x;
				mat.ty = p.y;
				fl.getDocumentDOM().getTimeline().layers[0].frames[index].elements[0].matrix = mat;
				if(i != (fileList.length -1))
				{
					fl.getDocumentDOM().getTimeline().insertBlankKeyframe(index);
				}
			}
	     }
	 index++;
	}// end of for
}