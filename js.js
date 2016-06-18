var ctx;
var right=true;
var ballside=true;
var playerleft=0;
var playerright=0;
var no=0;
function gameOpen()
{
    gameArea.begin();
    leftPaddle =new createParts(0,100,10,100,"#113aff");
    rightPaddle=new createParts(990,100,10,100,"#113aff");
    ball = new createParts(500,200,5,0,"red","ball");
    leftPaddle.update();
    rightPaddle.update();
    ball.dx=2;
    // ball.dy=1;
    ball.update();
}

var gameArea={
    canvas:document.createElement("canvas"),
    begin:function(){
        this.canvas.height=400;
        this.canvas.width=1000;
        this.context=this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.getElementById("fun"));
        this.interval=setInterval(updategame,4);
        window.addEventListener('keydown', function (e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        });
    },
    clear : function() {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop: function(){
        clearInterval(this.interval);
    }
}
function createParts(x,y,w,h,color,type)
{
    this.x=x;
    this.y=y;
    this.width=w;
    this.height=h;
    this.dx=0;
    this.dy=0;
    this.update =function()
    {
        this.x+=this.dx;
        this.y+=this.dy;
        ctx = gameArea.context;
        if(type=="ball")
        {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(this.x, this.y, this.width, 0, Math.PI*2, true);
            ctx.fill();
        }


        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
function updategame() {
    ctx = gameArea.context;
    gameArea.clear();
    gameArea.frameno++;
    leftPaddle.dx=0;
    leftPaddle.dy=0;
    rightPaddle.dx=0;
    rightPaddle.dy=0;
    if(ballside==true) {
        if (gameArea.keys && gameArea.keys[38] && rightPaddle.y > 0) {
            rightPaddle.dy = -3;
        }
        if (gameArea.keys && gameArea.keys[40] && rightPaddle.y < (gameArea.canvas.height - rightPaddle.height))
            rightPaddle.dy = 3;

    }
    if(ballside==false) {
        if (gameArea.keys && gameArea.keys[87] && leftPaddle.y > 0) {
            leftPaddle.dy = -3;
        }
        if (gameArea.keys && gameArea.keys[83] && leftPaddle.y < (gameArea.canvas.height - leftPaddle.height))
            leftPaddle.dy = 3;

    }
    if((ball.x+ball.width>=rightPaddle.x&&(ball.x+ball.width<gameArea.canvas.width))&&(rightPaddle.y<ball.y)&&(rightPaddle.y+rightPaddle.height>ball.y))
    {  // ball.dy=rightPaddle.dy;
        if(rightPaddle.dy!=0)
           ball.dy=rightPaddle.dy/3;
        //ball.dy=-1*ball.dy;

        if(ball.dx>0)
            ball.dx=-1*ball.dx;
        rightPaddle.y=Math.floor(Math.random()*(gameArea.canvas.height-rightPaddle.height));
        leftPaddle.y=Math.floor(Math.random()*(gameArea.canvas.height-leftPaddle.height));
        playerright++;
        document.getElementById("rightscore").innerHTML="Player2 :"+playerright;
        leftPaddle.update();
        rightPaddle.update();
        ballside=false;
    }
    if((ball.x-ball.width<=(leftPaddle.x+leftPaddle.width)&&(ball.x-ball.width>0))&&(leftPaddle.y<ball.y)&&(leftPaddle.y+leftPaddle.height>ball.y))
    {// ball.dy=leftPaddle.dy;
        if(leftPaddle.dy!=0)
            ball.dy=leftPaddle.dy/3;
        //ball.dy=-1*ball.dy;
        if(ball.dx<0)
            ball.dx=-1*ball.dx;
        rightPaddle.y=Math.floor(Math.random()*(gameArea.canvas.height-rightPaddle.height));
        leftPaddle.y=Math.floor(Math.random()*(gameArea.canvas.height-leftPaddle.height));
        playerleft++;
        document.getElementById("leftscore").innerHTML="Player1 :"+playerleft;
        leftPaddle.update();
        rightPaddle.update();
        ballside=true;}
    if((ball.y+ball.width)>=gameArea.canvas.height||ball.y-ball.width<=0)
        ball.dy=(-1)*ball.dy;
    if((ball.x-ball.width<=0)||(ball.x+ball.width>=gameArea.canvas.width))
    {   if(playerleft>playerright&&no==0)
        document.getElementById("leftscore").innerHTML="Player1 wins!!!";
    else if(playerleft<playerright&&no==0)
        document.getElementById("rightscore").innerHTML="Player2 wins!!!";
    else if(no==0)
    {document.getElementById("leftscore").innerHTML="Match Draw:(";
        document.getElementById("rightscore").innerHTML="";}
        no=1;
        playerleft=playerright=0;


        if (gameArea.keys && gameArea.keys[32]) {
            no=0;
            ball.x=500;
            ball.y=Math.floor(Math.random()*(200)+100);
            ball.dx=0;
            ball.dy=0;
            document.getElementById("leftscore").innerHTML="Player1 :0";
            document.getElementById("rightscore").innerHTML="Player2 :0";
            ball.update();
            setTimeout(function(){
                if(right==false)
                { ball.dx=2;ball.dy=0;right=true;ballside=true;}
                else {
                    ball.dx=-2;ball.dy=0;right=false;ballside=false;
                }},2000);
        }

    }
    if(playerleft>5||playerright>5)
        ball.dx=4;
    leftPaddle.update();
    rightPaddle.update();
    ball.update();
}
