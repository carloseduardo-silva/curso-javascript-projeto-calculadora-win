class CalcController{

    constructor(){
        this._operation = []
        this._lastNumber = "";
        this._lastOp = "";
        this._DisplayCalcEl = document.querySelector("div#display");

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

    clearAll(){
        this._operation = []
    }

    clearEntry(){
        this._operation.pop()
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

    
    pushOperator(value){
        this._operation.push(value)
    }
    
    addOpDot(value){
        
    }


    setLastNumberToDisplay(){
        let lastNumber;
        for(let i = this._operation.length-1; i >= 0; i--){

            if(!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i]
                break;
            }
        }
        
        this.displayCalc = lastNumber;
    }
    
    addOperation(value){

        if(isNaN(this.getLastOperation())){
            // last operation is a str(operator or =)
            if(this.isOperator(value)){
                // when the operator is the first element added.  
                if(this._operation.length == false){
                    this.pushOperator(value);
                    console.log("first operator")
                }
                // operator after operator, will substitute the last one.
                else{
                    this.setLastOperation(value)
                }
            
            }
            //first number added.
            else{
                this._operation.push(value)
                this.setLastNumberToDisplay()
                


            }    
            
        }

        else{

            if(this.isOperator(value)){
                this._operation.push(value)
                console.log("operador")
            }


            else{

                let numberconcatend = this.getLastOperation().toString() + value.toString()
    
                this.setLastOperation(numberconcatend)
                console.log(numberconcatend)
                this.setLastNumberToDisplay()

            }

            
        }
    }



    execBtn(value){
        console.log(value)

        switch(value){
            case "CE":
                this.clearEntry()
                break;
            case "C":
                this.clearAll()
                break    
                
            case "+":
                this.addOperation("+")
                break 
                
            case "-":
                this.addOperation("-")
                break 
                
            case "*":
                this.addOperation("*")
                break 
                
            case "÷":
                this.addOperation("÷")
                break

            case "%":
                this.addOperation("%")
                break  
                
            case "=":
                this.addOperation("=")
                break

            case ".":
                this.addOpDot(".")
                break

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
                this.addOperation(parseInt(value).toString())
                break
            default:
                this.setError()

        }
        


    }

    InitButtonEvents(){

        let buttons = document.querySelectorAll("button")

        buttons.forEach(btn =>{
            this.addEventListenerAll(btn, 'click drag', (e) =>{
                let textbtn = btn.innerHTML
                this.execBtn(textbtn)
            
            })
        })

    }









}