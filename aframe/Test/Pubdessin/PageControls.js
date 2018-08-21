/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 var generatorEl = function* (){
    var index = 0;
    while(true)
        yield index++;
};

var getCoordtoCursor = function(){
    var scene = document.querySelector("a-scene");
    scene.onmousemove = function(e){
        var pointer = getCoordInDocument(e); 
        if( document.getElementsByClassName("3Dmodel"))
            var deep = -5;
        else
            var deep = -1;
        if(!scene.isMobile){
            if((window.innerWidth/2-pointer.x>-145)&&(window.innerWidth/2-pointer.x<145)&&(340-pointer.y>-235)&&(340-pointer.y<235)){
                document.querySelector('a-cursor').setAttribute('position',{                
                    x:-(window.innerWidth/2-pointer.x)*0.38/(200*Math.exp(pointer.x/5000)/(-deep)),
                    y:(window.innerHeight/2-pointer.y)*0.38/(200*Math.exp(pointer.x/5000)/(-deep)),
                    z:deep});
            }
        }
        else
            document.querySelector('a-cursor').setAttribute('position',
                {x:-(window.innerWidth/2-pointer.x)*0.38/(200*Math.exp(pointer.x/5000)),
                 y:(window.innerHeight/2-pointer.y)*0.38/(200*Math.exp(pointer.x/5000)),z:-5}
            );           
    };
};

var getCoordInDocument = function(e) {
    e = e || window.event;
    var x = e.pageX || (e.clientX +
      (document.documentElement.scrollLeft
      || document.body.scrollLeft));
    var y= e.pageY || (e.clientY +
      (document.documentElement.scrollTop
      || document.body.scrollTop));
    return {'x':x,'y':y};
  };
  
var getAngleOfCamera = function() {
    var scene = document.querySelector("a-scene");
    var angle = {x:0,y:0,z:0};
    scene.onmousedown = function(e){       
        var oldPointer = {x:0,y:0};
        var Pointer = getCoordInDocument(e);        
        if (oldPointer.x!=Pointer.x || oldPointer.y!=Pointer.y ){
            var newPointer = getCoordInDocument(e);
            angle.x = (newPointer.y - oldPointer.y)*5;
            angle.y = (newPointer.x - oldPointer.x)*5;  
            oldPointer.x = Pointer.x;
            oldPointer.y = Pointer.y;
        }
    };
    return angle;
};

var setAngleOfCamera = function(){
    var angle = getAngleOfCamera();
    var camera = document.getElementsById("rig");
    camera.setAttribute('rotation',{x:angle.x,y:angle.x,z:0});  
};
  