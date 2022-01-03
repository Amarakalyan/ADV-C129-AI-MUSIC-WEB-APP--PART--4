song = "";
satisfya = "";

scoreLeftWrist=0;

leftWristX=0;
leftWristY=0;

rightWristX=0;
leftWristY=0;

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

 function modelLoaded()      
 {
     console.log('PoseNet is Initialized');
 }

    function gotPoses(results)
    {
        if(results.length>0)
        {
            console.log(results);
            scoreLeftWrist=results[0].pose.keypoints[9].score;
            console.log("scoreLeftWrist = " + scoreLeftWrist);
             
            leftWristX=results[0].pose.leftWrist.x;
            leftWristY=results[0].pose.leftWrist.y;
            console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

            rightWristX=results[0].pose.rightWristx;
            rightWristY=results[0].pose.rightWristy;
            console.log("rightWristX = " +rightWristX + "rightWristY = " + rightWristY);

        }
    }

   function draw()
   {
       image(video,0,0,600,500);
        if(scoreLeftWrist>0.001)
         {        
            circle(100,110,20);
             InNumberLeftWristY = Number(leftWristY);
             remove_decimal = floor(InNumberLeftWristY);
             volume = remove_decimal/500;
            document.getElementById("volume").innerHTML = "Volume = " + volume;
            song.setVolume(volume);
        }
    }
 
   

    function preload()
    {
      song = loadSound("music.mp3");
      satisfya = loadSound("Satisfya.mp3")
    }

    function play()
    {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }