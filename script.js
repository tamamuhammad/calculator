class Calculator {

    constructor(histories, currents){
        this.histories = histories
        this.currents = currents
        this.clear()
    }

    clear(){
        this.history = ''
        this.current = ''
        this.operation = undefined
    }

    delete(){
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.current.includes('.') || this.current.length == 16) return
        this.current = this.current.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.current === ''){
            if(operation !== '-'){
                return
            } else {
                this.current = operation
            }
        } else if (this.current === '-'){
            if(operation === '-'){
                this.current = ''
            } else {
                return
            }
        } else {
            if (this.history !== ''){
                this.compute()
            }
            this.operation = operation
            this.history = this.current
            this.current = ''
        }
    }

    compute(){
        let computation
        const hist = parseInt(this.history)
        const curr = parseInt(this.current)

        if (isNaN(hist) || isNaN(curr)) return
        switch(this.operation){
            case '+':
                computation = hist + curr
                break
            case '-':
                computation = hist - curr
                break
            case '×':
                computation = hist * curr
                break
            case '÷':
                computation = hist / curr
                break
            case '^':
                computation = Math.pow(hist, curr)
                break
            case '%':
                computation = hist % curr
                break
            default:
                return
        }
        this.current = computation
        this.operation = undefined
        this.history = ''
    }

    getNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseInt(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let display

        if (isNaN(integerDigits)){
            display = ''
        } else {
            display = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${display}.${decimalDigits}`
        } else {
            return display
        }
    }

    update(){
        this.currents.value = this.getNumber(this.current)
        if (this.operation != null){
            this.histories.value = `${this.history} ${this.operation}`
        } else {
            this.histories.value = ''
        }
    }

}

const numbers = document.querySelectorAll('[data-number]')
const operators = document.querySelectorAll('[data-operator]')
const equal = document.querySelector('[data-equal]')
const clear = document.querySelector('[data-clear]')
const deleted = document.querySelector('[data-delete]')
const histories = document.querySelector('[data-history]')
const currents = document.querySelector('[data-current]')

let calculator = new Calculator(histories, currents)

numbers.forEach(number => {
    number.addEventListener('click' , () => {
        calculator.appendNumber(number.innerHTML)
        calculator.update()
    })
})

operators.forEach(operator => {
    operator.addEventListener('click' , () => {
        calculator.chooseOperation(operator.innerHTML)
        calculator.update()
    })
})

clear.addEventListener('click' , () => {
    calculator.clear()
    calculator.update()
})

deleted.addEventListener('click' , () => {
    calculator.delete()
    calculator.update()
})

equal.addEventListener('click' , () => {
    calculator.compute()
    calculator.update()
})