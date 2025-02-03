var output=''
var n1=''
var n2=''
var operator=''

function getdata(value){

    if(value== "+" || value== "-" || value== "x" || value== "/"){
        return;
    }
    else{
        if(operator==''){
            n1=n1+value
        }
        else{
            n2=n2+value
        }
         output=output+value;
         document.getElementById("output").value=output
    }
}
function geteqn(value){
    
    if(value== "+" || value== "-" || value== "x" || value== "/"){
        operator=operator+value
        output=output+value;
        document.getElementById("output").value=output;
    
    }
    else{
    return;
    }
}

function allcancel(){
    n1=''
    n2=''
    operator=''
    output=''
    document.getElementById("output").value=output;
}

function result(){
    var answer;
    var num1=parseFloat(n1)
    var num2=parseFloat(n2)
    switch(operator){
        case '+':
            answer=num1+num2;
            break;
        case '-':
            answer=num1-num2;
            break;
        case 'x':
            answer=num1*num2;
            break;
        case '/':
            answer=num1/num2;
            break;
        default:
            return           
}
   document.getElementById("output").value=" = " +answer
   n1=answer
   n2=''
   operator=''
}