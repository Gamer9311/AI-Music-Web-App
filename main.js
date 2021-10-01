leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

kings_queens_status = "";
everything_at_once_status = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    kings_queens = loadSound('Kings Queens Ava Max.mp3');
    everything_at_once = loadSound('Everything At Once Lenka.mp3');
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.position(300, 300);

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResults);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    kings_queens_status = kings_queens.isPlaying();
    everything_at_once_status = everything_at_once.isPlaying();

    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);

        everything_at_once.stop();

        if (kings_queens_status == false)
        {
            kings_queens.play();
            document.getElementById("song").innerHTML = "Song name = Kings and Queens by Ava Max";
        }
    }

    if (scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);

        kings_queens.stop();

        if (everything_at_once_status == false)
        {
            everything_at_once.play();
            document.getElementById("song").innerHTML = "Song name = Everything at Once by Lenka";
        }
    }
    
}

function modelLoaded()
{
    console.log('PoseNet is Initialised!');
}

function gotResults(results)
{
    if (results.length > 0)
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}
