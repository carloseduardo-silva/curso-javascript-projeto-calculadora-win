class CalcController{

    constructor(){
        this._operation = []
        this._lastNumber = " ";
        this._lastOp = "";
        this._DisplayCalcEl = document.querySelector("div#display");
        this._maxNumber = "";
        this.initialize();
        this.InitButtonEvents();
    }

    initialize(){



    }

    get displayCalc(){
        return this._DisplayCalcEl.innerHTML;

    }

    set displayCalc(value){
        return this._DisplayCalcEl.innerHTML = value;

    }

    
    addEventListenerAll(el, events, fn){

        let eventoarray = events.split(" ")

        eventoarray.forEach(evento => {

            el.addEventListener(evento, fn, false)
            
        });


    }

    darkModeToggle(){
        let calculadora = document.getElementById("calculadora");

        

        if(calculadora.classList.value == "black"){
            calculadora.style.backgroundColor = "#B1B1B1";
            this._DisplayCalcEl.style.color = "black";
        }
        else{
            calculadora.style.backgroundColor = "#202020";
            this._DisplayCalcEl.style.color = "white";
        }
        
        calculadora.classList.toggle("black")
        document.querySelectorAll(".btn-number").forEach(el => {el.classList.toggle("btn-numberBlack")
        })

        document.querySelectorAll(".btn-others").forEach(el => {el.classList.toggle("btn-othersBlack")
    })
        
    }

    clearAll(){
        this._operation = []
        this._lastNumber = " "
        this.setLastNumberToDisplay()
    }

    clearEntry(){
        this._operation.pop()
        this.setLastNumberToDisplay()
    }

    excludeOperation(){
        if(!isNaN(this.getLastOperation())){
            if(this.getLastOperation() == ""){
                this._operation.pop();
            }

            else if(this._lastNumber !== " "){
                this._lastNumber = " ";
            }

            else{

                let number = this.getLastOperation().toString()

                let arrayNumber = number.split("")
                
                arrayNumber.pop()
     
                this.setLastOperation(arrayNumber.join(""));
                this.setLastNumberToDisplay();
            }
        }
        

    }

    negateOperation(){
        if(this.getLastOperation() == undefined){
            return;
        }
        
        else if(isNaN(this.getLastOperation())){
            let negativenumber = this._operation[0] * -1
            
            this._operation.push(negativenumber.toString())
            this.setLastNumberToDisplay();

        }
        else{
            let negativenumber = this.getLastOperation() * -1

            this.setLastOperation(negativenumber.toString());
            this.setLastNumberToDisplay();
        }
    }

    squaredOperation(){
        //clicado apos a operador -> repete o primeiro numbero digitado, apos a numero -> pega o ultimo e aplica
        let number;
        let squarednumber;
        if(this.getLastOperation() == undefined){
            return;
        }

        else if(isNaN(this.getLastOperation())){
            number = this. _operation[0]
            squarednumber = number*number

            this._operation.push(squarednumber.toString())
        }
        else{
            number = this.getLastOperation()
            squarednumber = number*number
            
            this.setLastOperation(squarednumber.toString());
        }
        
        this.setLastNumberToDisplay();

    }

    divisionOperation(){
            let number;
            if(this.getLastOperation() == undefined){
                this._DisplayCalcEl.style.color = "red";
                this._DisplayCalcEl.style.fontSize = "23px"
                this._DisplayCalcEl.style.bottom = "10px"
               return this.displayCalc = "Não é possivel dividir por 0";
            }


            else if(isNaN(this.getLastOperation())){

                  number = 1/this._operation[0]
                  this._operation.push(number.toString()) 
                
                }
            else{

                number = 1/this.getLastOperation();
                this.setLastOperation(number.toString())
                }
                
                this.setLastNumberToDisplay();

    
    
    
    
        }


    squareRootOperation(){
        let number;
        let squarenumber;
        
        if(this.getLastOperation() == undefined){
            return;
        }

        else if(isNaN(this.getLastOperation())){

            number = this._operation[0]
            squarenumber = Math.sqrt(number)
            this._operation.push(squarenumber.toString()) 
          
          }

        else{

            number = this.getLastOperation();
            squarenumber = Math.sqrt(number)
            this.setLastOperation(squarenumber.toString())
            }
            
            this.setLastNumberToDisplay();



    }

    setError(){
        this.displayCalc = 'error'
    }

    isOperator(value){
       
        return(["+", "-", "*", "÷", "%"].indexOf(value) > -1)
           
        
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1]
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }
    
    addDot(){
        
        // if be pressed . twice ou more times in a same number.
       if(typeof this.getLastOperation() == "string" && this.getLastOperation().indexOf(".") > -1 ){
            return;
       }

        // if . clicked right after a operator or as first value pressed.
        if(isNaN(this.getLastOperation())){
            this._operation.push("0.")
            this.setLastNumberToDisplay();
        }
        // if . clicked right after a number
        else{
            let numberconcatend = this.getLastOperation() + "."
            this.setLastOperation(numberconcatend)
            this.setLastNumberToDisplay();
        }
        
    }

    EqualRepeatOp(){
        // if the = be pressed in the second position, will repeat the last operation saved.
        let operation = this._operation[0] + this._lastNumber
        let resul = eval(operation)
        this._operation = [resul]
        
        this.setLastNumberToDisplay();
        
    }
    
    PercentRepeatOp(){
        // if the % be pressed in the second position right after an operation, will repeat the last operation saved.
        let newresul = this._operation[0]/100
        this._operation = [newresul]
        
        this.setLastNumberToDisplay();
    }
    
    
    setLastNumberToDisplay(){
            let lastNumber;
            
            for(let i = this._operation.length-1; i >= 0; i--){
    
                if(!this.isOperator(this._operation[i])){
                    lastNumber = this._operation[i]
                    break;
                }
            }
    
            if(!lastNumber){
                lastNumber = 0;
                // refresh display to 0, from clearall() and clearEntry()
            }

            let numberHeight = lastNumber.toString().split("").length;
           
            switch(numberHeight){
                case 12:
                    return this._DisplayCalcEl.style.fontSize = "46px";

                case 13:
                    return this._DisplayCalcEl.style.fontSize = "44px";

                case 14:
                    return this._DisplayCalcEl.style.fontSize = "43px";

                case 15:
                    return this._DisplayCalcEl.style.fontSize = "42px";

                case 16:
                    return this._DisplayCalcEl.style.fontSize = "41px";
                
                case 17:
                    return this._DisplayCalcEl.style.fontSize = "40px";
                
               
            }

         
            

            // case the display/operation has a number with more than 16 digits will stop to concatenate other numbers to this one.
             if(numberHeight > 18){
                
                
                this._maxNumber = lastNumber.toString().split("")


                if(this._maxNumber != ""){  
                    let numberMaxArray = lastNumber.toString().split("")
                    numberMaxArray.pop()
                    let numbermax = numberMaxArray.join("")
                    this.setLastOperation(numbermax.toString())
                    
                    
                    return;

                }

                else{
                    
                    return this.displayCalc = this._maxNumber.join("") ;

                }
            }
     
            
            this._DisplayCalcEl.style.fontSize = "48px"
            this.displayCalc = lastNumber;
        }
        
    
    pushOperator(value){

    

        this._operation.push(value)

        // case operator is the first element clicked in calc
        if(this.isOperator(this._operation[0])){
            this._operation.unshift("0")
        }

        //case = is the first element clicked in calc
        else if(this._operation[0] == "="){
            this.clearAll()
        }
        // case = is the second element clicked in the calc
        else if(this._operation[1] == "="){
            if(this._lastNumber == " "){
                this._operation.pop();
            }
            else{
                
                this.EqualRepeatOp();
            }
        }
        // case = is the third element clicked in the calc after an operator.
        else if(this._operation[2] == "="){
             let repeatnumber = this._operation[0]
             this._operation.pop()
             this._operation.push(repeatnumber)
             this.calc()

        }
        //case % is the second element clicked in the calc
        else if(this._operation[1] == "%"){
            if(this._lastNumber ==  " "){
                this.clearAll()
            }
            else{
                this.PercentRepeatOp();
            }

        }


        
        // normal calc 
        else{
            
            if(this._operation.length > 3 ){
                this.calc()
            }

        }

        

    }

    calc(){

        if(this._operation.length > 3){
                
            this._lastNumber = this._operation.pop()
    
            }

        let operationstr = this._operation.join(" ")
        let resul = eval(operationstr)

        
        
        //case % is the forthy value clicked in the array
        if(this._lastNumber == "%"){
            resul = resul/100
            this._operation = [resul]
            
        }

        //case a operator is the forthy value clicked in the array
        else if(this.isOperator(this._lastNumber)){
            this._operation = [resul, this._lastNumber]
        }

        //case = is the forthy value clicked in the array
        else{

            // saving the last operation did it, case it will be necessary in the next op.
            let lastoperation = operationstr.split(" ")
            lastoperation.shift()
            this._lastNumber = lastoperation.join(" ")

            this._operation = [resul.toString()]
            
            
        }
        let resulstr = resul.toString()
        if(resulstr.split("").length > 17){
            this._DisplayCalcEl.style.fontSize = "27px"
        }

        this.displayCalc = resul

    }
    

    addOperation(value){

        if(isNaN(this.getLastOperation())){
            // last operation is a str(operator or =)
            if(this.isOperator(value)){
                // when the operator is the first element added.  
                if(this._operation.length == false){
                    this.pushOperator(value);
                   
                }
                // operator after operator, will substitute the last one.
                else{
                    this.setLastOperation(value)
                    
                }
            
            }
            //first number added.
            else{
                this.pushOperator(value)
                this.setLastNumberToDisplay()
                


            }    
            
        }

        else{

            if(this.isOperator(value)){
                this.pushOperator(value);
                
            }

            else if(value == '='){
                this.pushOperator(value);
            }

   


            else{
                //case a count haves 0 as result, the 0 will not concatenate with the next number pressed.
                if(this._operation[0] == 0){
                   this._operation[0] = []
                }

                let numberconcatend = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(numberconcatend)
                this.setLastNumberToDisplay()

            }

            
        }
    }



    execBtn(value){
       
        switch(value){
            
            case "CE":
                this.clearEntry()
                break;
            case "C":
                this.clearAll()
                break;    
                
            case "+":
                this.addOperation("+")
                break; 
                
            case "-":
                this.addOperation("-")
                break; 
                
            case "*":
                this.addOperation("*")
                break 
                
            case "÷":
                this.addOperation("÷")
                break;

            case "%":
                this.addOperation("%")
                break;
                
            case "=":
                this.addOperation("=")
                break;

            case ".":
                this.addDot()
                break;
            
            case "←":
                this.excludeOperation()
                break;

            case "±":
                this.negateOperation()
                break;

            case "x²":
                this.squaredOperation()
                break;
            
            case "¹/x":
                this.divisionOperation()
                break;
            
            case "√":
                this.squareRootOperation()
                break;


            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
                this.addOperation(parseFloat(value).toString())
                break;

            default:
                console.log(value)
                this.setError();

        }
        
    }

    InitButtonEvents(){

        let buttons = document.querySelectorAll("button")
        let toggle =  document.getElementById("toggle")

        this.addEventListenerAll(toggle, "click", e =>{
            this.darkModeToggle();
        })

        buttons.forEach(btn =>{
            this.addEventListenerAll(btn, 'click drag', (e) =>{
                let textbtn = btn.innerHTML
                this.execBtn(textbtn)
            
            })
        })

    }









}