var bool = confirm("�� "+fl.getDocumentDOM().name+" ���е�����ͼƬ��Ϊ����");
 

if(bool)
 
{
 
        var lib = fl.getDocumentDOM().library;
 
        var count = 0;
 
        for(var i=0;i<lib.items.length;i++){
 
                if (lib.items[i].itemType=='bitmap'){
 
                        lib.items[i].compressionType = "lossless";
 
                        count++;
 
                }
 
        }
 
        alert("����"+count+"ͼƬ��������");
 
}