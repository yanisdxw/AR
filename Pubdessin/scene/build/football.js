/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var terminal;

var isPC = function(){    
    if ( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
        terminal="mobile";
    }
    else{
        terminal="pc";
    }
    
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
        console.log(vitesse);
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
