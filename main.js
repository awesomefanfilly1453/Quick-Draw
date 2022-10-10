array_1=["coffee cup","mittens","stick figure","bottle","alarm clock","lemon","plane","banana","box","square","face","flower","hat","triangle","camera","vase","chair"];
var random_no = Math.floor((Math.random()*array_1.length)+1);

console.log(array_1[random_no]);
var Element_of_array = array_1[random_no];
console.log(Element_of_array);
document.getElementById("sketch_to_be_drawn").innerHTML="Sketch to be drawn:"+Element_of_array;
var time_counter=0;
var time_check="";
drawn_sketch="";
answer_holder="";
score=0;

function setup(){
canvas=createCanvas(300,300);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth=window.speechSynthesis;
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}

function draw(){
    strokeWeight(3);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY)
        check_sketch();
        if (drawn_sketch==sketch){
            answer_holder="set";
            score=score+1;
            document.getElementById("score").innerHTML="Score:"+score;
        }
    }
}
    function check_sketch(){
        time_counter=time_counter+1;
        document.getElementById("timer").innerHTML="Timer:"+time_counter;
        console.log(time_counter);
        if(time_counter>400){
            time_counter=0;
            time_check="completed";
        }
        if (time_check=="completed"||answer_holder=="set"){
            time_check="";
            answer_holder="";
            updateCanvas();
        }
    }
function updateCanvas(){
    var random_no = Math.floor((Math.random()*array_1.length)+1);

console.log(array_1[random_no]);
var Element_of_array = array_1[random_no];
console.log(Element_of_array);
document.getElementById("sketch_to_be_drawn").innerHTML="Sketch to be drawn:"+Element_of_array;
}

function classifyCanvas(){
classifier.classify(canvas,gotresult);
}
function gotresult(error,result){
    if (error){
        console.error(error);
    }
    console.log(result);
    document.getElementById("label").innerHTML=="Your Sketch:"+result[0].label;
    document.getElementById("confidence").innerHTML="Confidence : "+Math.round(result[0].confidence*100)+"%";
    utterthis=new SpeechSynthesisUtterance(result[0].label);
    synth.speak(utterthis);
}