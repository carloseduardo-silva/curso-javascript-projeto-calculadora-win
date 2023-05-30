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
        let operations = ["+", "-", "*", "÷", "%"]
        if(operations.indexOf(value) > -1){
            return true
        }
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1]
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    setLastNumberToDisplay(){
        let LastNumber;
       
        for(let i = this._operation.lenght; i >= 0; i--){
            if(!this.isOperator(this._operation[i])){
                LastNumber = this._operation[i]
                break;
            }
        }

        this.displayCalc = LastNumber;
    }

    pushOperator(value){
        this._operation.push(value)
    }

    addOpDot(value){

    }

    addOperation(value){

        if(isNaN(this.getLastOperation())){
            if(this._operation.length == false){
                this.pushOperator(value);
            }

        }
        else{

            if(this.isOperator(value)){
                this._operation.push(value)
            }


            else{

                let numberconcatend = this.getLastOperation().toString() + value.toString()
    
                this.setLastOperation(numberconcatend)
                console.log(numberconcatend)
                this.pushOperator(value);

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
                this.addOperation(parseInt(value))
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