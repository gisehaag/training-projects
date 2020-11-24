class App {

    constructor() {
        this.container = document.querySelector('.container');

        this.$budget = this.container.querySelector('.budget-input');
        this.$newExpenseName = this.container.querySelector('.expense-title');
        this.$newExpenseValue = this.container.querySelector('.expense-value');

        this.$calculateBudget = this.container.querySelector('#calculateBudget');
        this.$addExpenses = this.container.querySelector('#addExpenses');

        this.$expenseItems = this.container.querySelector('.expense-items');

        this.$budgetAmount = this.container.querySelector('.budget-amount');
        this.$expensesAmount = this.container.querySelector('.expenses-amount');
        this.$balanceAmount = this.container.querySelector('.balance-amount');
        
        this.expenses = [];
        this.id = 0;
        this.totalBalance = 0;
        this.totalExpenses = 0;

        this.addEvents();
    }

    addEvents() {
        this.addEvent(this.$calculateBudget, 'click', this.addBudget);
        this.addEvent(this.$addExpenses, 'click', this.addExpenseItem);
        this.addEvent(this.$expenseItems,'click', this.editItemExpense);
        this.addEvent(this.$expenseItems,'click', this.deleteItemExpense);
    }

    addEvent(object, type, handler){
        object.addEventListener( type, handler.bind(this) );
    }

    addBudget(e) {

        this.$budgetAmount.innerHTML = '$ ' + this.$budget.value;
        this.calculateBalance();
    }
    
    addExpenseItem(e) {

        let itemExpense = {
            id: this.id,
            title: this.$newExpenseName.value,
            amount: parseInt(this.$newExpenseValue.value),
        }
        
        this.expenses.push(itemExpense);

        this.id += 1;
        
        this.showExpenses();
        this.clearExpenseInput();
        this.calculateExpenses();
        this.calculateBalance();
    }

    showExpenses() {
        
        let content = '';

        this.expenses.forEach((element) => {

            content += `
                <div class="expense-item" id=${element.id}>
                    <span class="item-name">${element.title}</span>
                    <span class="item-amount">$ ${element.amount}</span>
                    <div>
                        <i class="far fa-edit edit"></i>
                        <i class="fas fa-trash-alt delete"></i>
                    </div>
                </div>
            `;
        })

        this.$expenseItems.innerHTML = content;
    }



    editItemExpense(e){

        let id = e.target.closest('.expense-item').id;

        if (e.target.classList.contains('edit')) {
            // debugger;
            let item  = this.expenses.filter(expense => expense.id == id)[0];
            
            this.$newExpenseName.value = item.title;
            this.$newExpenseValue.value = item.amount;

            this.$newExpenseName.focus();
            
            this.deleteExpenseFromArray(item.id);
            
        }
    }

    deleteExpenseFromArray(id) {
        
        this.expenses = this.expenses.filter(expense => expense.id != id);
        this.showExpenses();
        this.calculateExpenses();
        this.calculateBalance();

    }

    deleteItemExpense(e) {
        let id = e.target.closest('.expense-item').id;

        if (e.target.classList.contains('delete')) {
            this.deleteExpenseFromArray(id)
        }  
    }


    clearExpenseInput(){
        this.$newExpenseName.value = '';
        this.$newExpenseValue.value = '';
    }

    calculateExpenses(){
        this.totalExpenses = this.expenses.reduce((accumulator, expense) => accumulator + expense.amount, 0);
        this.$expensesAmount.innerHTML = '$ ' + this.totalExpenses;
    }

    calculateBalance(){
        this.totalBalance = this.$budget.value - this.totalExpenses;
        this.$balanceAmount.innerHTML = '$ ' + this.totalBalance;
    }

}

let app = new App();