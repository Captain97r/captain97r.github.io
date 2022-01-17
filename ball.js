var ball = {
    posX : 100,
    posY : 100,
    size : 5,
    speed : 0.3,
    alpha : Math.PI/4.1,
    dx : 0,
    dy : 0,
    calc_d : function(){
        this.dx = this.speed * Math.cos(this.alpha);
        this.dy = this.speed * Math.sin(this.alpha);
    }
};
//-------------------------------------------
function init(){
    console.log('init');
    ball.calc_d();
    window.requestAnimationFrame(draw);
}
//-----------------------------------------
function draw(){
    var ctx = document.getElementById('smile').getContext('2d');
    if(ctx) {
        ctx.clearRect(0, 0, 200, 200);
        ctx.strokeRect( 0,0,200,200 );
        draw_ball(ctx, ball);
        //console.log(ball.alpha);
        if( (ball.posX + ball.size >= 200) || (ball.posX - ball.size <= 0)){
            ball.alpha = Math.PI - ball.alpha;
            ball.calc_d();
            ball.speed *= 1.1;
        }
        if( (ball.posY + ball.size >= 200) || (ball.posY - ball.size <= 0)){
            ball.alpha = - ball.alpha;
            ball.calc_d();
            ball.speed *= 1.1;
        }
        
        ball.posX += ball.dx;
        ball.posY += ball.dy;

        window.requestAnimationFrame(draw);
    }
}

function draw_ball(context, obj_ball){
    context.strokeStyle = "#000";
    context.fillStyle = "#fa0";
    context.beginPath();
    context.arc(obj_ball.posX, obj_ball.posY, obj_ball.size, 0, Math.PI*2);
    context.closePath();
    context.stroke();
    context.fill();
}
//---------------------------------------
init();
//---------------------------------------