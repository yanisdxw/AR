/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var terminal;
var posFin ={x:0,y:0,z:0};

$(document).ready(function(){ 
    if ( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
        terminal="mobile";
    }
    else{
        terminal="pc";
    }  
    console.log(terminal);
    initElement();
    restart();
     
});

var initElement = function(){  
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan2" width="1.2" height="0.4" color ="#FFFFFF" opacity="0.05" position="0 0.2 -0.4"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan1" width="1.2" height="0.4" color ="#FFFFFF" opacity="0.05" position="1.2 0.2 -0.4"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan3" width="1.2" height="0.4" color ="#FFFFFF" opacity="0.05" position="-1.2 0.2 -0.4"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan5" width="1.2" height="0.4" color ="#FFFFFF" opacity="0.05" position="0 0.6 -0.4"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan4" width="1.2" height="0.4" color ="#FFFFFF" opacity="0.05" position="1.2 0.6 -0.4"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan6" width="1.2" height="0.4" color ="#FFFFFF" opacity="0.05" position="-1.2 0.6 -0.4"  rotation="0 180 0"  ></a-plane>');  
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan8" width="1.2" height="0.4" color ="#FFFFFF" opacity="0.05" position="0 1.0 -0.4"  rotation="0 180 0"  ></a-plane>');   
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan7" width="1.2" height="0.4" color ="#FFFFFF" opacity="0.05" position="-1.2 1.0 -0.4"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan9" width="1.2" height="0.4" color ="#FFFFFF" opacity="0.05" position="1.2 1.0 -0.4"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after('<a-ring id="traget" radius-inner="0.05" radius-outer="0.1" color ="#FFFFFF" opacity="1" position="0 0 -0.3"  rotation="0 180 90"  ></a-ring>');  
    
    /*
    var $buttonPlay = $('<input type="button" value="yanis" style="position: fixed; margin-top:100px;margin-left: 100px; z-index: 10;"/>');
    $('video').after($buttonPlay);
    */
};
var restart=function(){
    initGoal();
    $('.player').hide();
    $('#buttonShot').hide();
    $('#soccerModel').bind('mousedown',positTF);
    $('.tragetPlan').bind('mousedown',function(){
        setTimeout(tragetSelect(this),100);
    });
    $('#buttonShot').bind('mousedown',shot);
};
var initGoal = function(){
    var posX = Math.random()*2-1;
    var posZ = Math.random()*7+3;
    var pos = {x:posX,y:0,z:posZ};
    var goal = document.getElementById('goalMix');
    goal.setAttribute("position",pos);
};

var positTF = function(){
    var Vinit = 0;
    
    var ID = setInterval(function(){
        Vinit = Vinit+0.0001;
    },10);
    $('#soccerModel').bind('mouseup',function(){
        clearInterval(ID);  
        var deltat =10;
        var model = document.getElementById("soccerModel");
        var angleElevation = Math.PI/6;
        var anglePlane = Math.PI/12;
        var vitesse = {x:Vinit *  Math.cos(angleElevation) *  Math.sin(anglePlane),y:Vinit*  Math.sin(angleElevation),z: Vinit*  Math.cos(angleElevation) *  Math.cos(anglePlane)};
        var positSoccer= model.getAttribute("position");
        var goalMix = document.getElementById('goalMix').getAttribute("position");
        var ID2 = setInterval(function(){
            positSoccer.x =  positSoccer.x + vitesse.x*deltat;
            positSoccer.z = positSoccer.z + vitesse.z*deltat;
            positSoccer.y= positSoccer.y +vitesse.y*deltat;
            model.setAttribute("position",{x:positSoccer.x,y:positSoccer.y,z:positSoccer.z});       
            if(positSoccer.z>goalMix.z+0.1){
                model.addState('fin');console.log('up');}

        },deltat);

        model.addEventListener('stateadded',function (evt) {
            if(evt.detail === 'fin'){
                clearInterval(ID2);
                model.setAttribute("visible",false);
            }
        });
    });
};

var tragetSelect = function(obj){   
    var traget = document.getElementById("traget");
    posFin=obj.getAttribute('position');
    traget.setAttribute("position",{x: posFin.x,y:posFin.y,z:posFin.z}); 
    if($("#buttonShot").is(":hidden"))
        $('#buttonShot').show();
};

var shot = function(){
    $('#buttonShot').bind('mouseup',function(){
        $('#buttonShot').hide();});
};

