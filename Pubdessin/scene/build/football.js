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
    $('#soccerModel').mousedown(positTF);
    initElement();
    selectPosFin();
});
var initElement = function(){
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan2" width="1.2" height="0.4" color ="#FFFFFF" opacity="0" position="0 0.2 2.59"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after(' <a-plane class="tragetPlan"id="tragetPlan1" width="1.2" height="0.4" color ="#FFFFFF" opacity="0" position="1.2 0.2 2.59"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan3" width="1.2" height="0.4"  color ="#FFFFFF" opacity="0" position="-1.2 0.2 2.59"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan5" width="1.2" height="0.4"  color ="#FFFFFF" opacity="0" position="0 0.6 2.59"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan4" width="1.2" height="0.4"  color ="#FFFFFF" opacity="0" position="1.2 0.6 2.59"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan6" width="1.2" height="0.4" color ="#FFFFFF" opacity="0" position="-1.2 0.6 2.59"  rotation="0 180 0"  ></a-plane>');  
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan8" width="1.2" height="0.4" color ="#FFFFFF" opacity="0" position="0 1.0 2.59"  rotation="0 180 0"  ></a-plane>');   
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan7" width="1.2" height="0.4" color ="#FFFFFF" opacity="0" position="-1.2 1.0 2.59"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after(' <a-plane class="tragetPlan" id="tragetPlan9" width="1.2" height="0.4" color ="#FFFFFF" opacity="0" position="1.2 1.0 2.59"  rotation="0 180 0"  ></a-plane>');
    $("#goalModel").after('<a-ring id="traget" radius-inner="0.05" radius-outer="0.1" color ="#FFFFFF" position="0 0 3"  rotation="0 180 90"  ></a-ring>');
};
var positTF = function(){
    
    var Vinit = 0;
    var funct;
     var deltat =10;

    if(terminal==="mobile")
        funct =  "touchend";
    else
        funct =  "mouseup";
    var model = document.getElementById("soccerModel");
    var ID = setInterval(function(){
        Vinit = Vinit+0.0001;
    },10);

    model.addEventListener(funct,function(){
        clearInterval(ID);   
        var angleElevation = Math.PI/6;
        var anglePlane = Math.PI/12;
        var vitesse = {x:Vinit *  Math.cos(angleElevation) *  Math.sin(anglePlane),y:Vinit*  Math.sin(angleElevation),z: Vinit*  Math.cos(angleElevation) *  Math.cos(anglePlane)};
        var positSoccer= model.getAttribute("position");
        var positGoal = document.getElementById('goalModel').getAttribute("position");
        var ID2 = setInterval(function(){
            positSoccer.x =  positSoccer.x + vitesse.x*deltat;
            positSoccer.z = positSoccer.z + vitesse.z*deltat;
            positSoccer.y= positSoccer.y +vitesse.y*deltat;
            model.setAttribute("position",{x:positSoccer.x,y:positSoccer.y,z:positSoccer.z});       
            if(positSoccer.z>positGoal.z+0.1){
                model.addState('fin');}

        },deltat);

        model.addEventListener('stateadded',function (evt) {
            if(evt.detail === 'fin'){
                clearInterval(ID2);
                model.setAttribute("visible",false);
            }
        });

    });
};

var selectPosFin = function(){
    $('.tragetPlan').bind('click', function (){
        var model = document.getElementById("traget");
        posFin=$(this).attr('position');
        model.setAttribute("position",{x: posFin.x,y:posFin.y,z:posFin.z});
    });
};
