Vue.createApp({
    data() {
        return {
            expenses: [],
            enteredValue: '',
            selectedOption: '',
            customOption: '',
            editIndex: -1,
            currentBalance: null,
            currency: 'USD'
        };
    },
    computed: {
        displayBalance() {
            if (this.currentBalance !== null) {
                const formattedBalance = this.formatCurrency(this.currentBalance);
                return `${formattedBalance} ${this.getCurrencySymbol()}`;
            }
            return '';
        }
    },
    methods: {
        addExpense() {
            let option = this.selectedOption;
            if (this.selectedOption === 'custom' && this.customOption) {
                option = this.customOption;
            }

            if (this.enteredValue && option && this.isNumeric(this.enteredValue)) {
                if (this.editIndex > -1) {
                    // Editing existing expense
                    this.expenses[this.editIndex] = {
                        amount: this.enteredValue,
                        option: option
                    };
                    this.editIndex = -1;
                } else {
                    // Adding new expense
                    this.expenses.push({
                        amount: this.enteredValue,
                        option: option
                    });
                    this.currentBalance -= parseFloat(this.enteredValue);
                }

                this.enteredValue = '';
                this.selectedOption = '';
                this.customOption = '';
            }
        },
        removeExpense(index) {
            const removedAmount = parseFloat(this.expenses[index].amount);
            this.currentBalance += removedAmount;
            this.expenses.splice(index, 1);
        },
        editExpense(index) {
            const expense = this.expenses[index];
            this.enteredValue = expense.amount;
            this.selectedOption = expense.option;
            if (expense.option === 'custom') {
                this.customOption = expense.option;
            }
            this.editIndex = index;
        },
        setBalance() {
            if (this.isNumeric(this.currentBalance)) {
                this.currentBalance = parseFloat(this.currentBalance);
            }
        },
        formatCurrency(value) {
            return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },
        getCurrencySymbol() {
            switch (this.currency) {
                case 'USD':
                    return '$';
                case 'GBP':
                    return '£';
                case 'IRR':
                    return 'IRR';
                default:
                    return '';
            }
        },
        isNumeric(value) {
            return /^\d+(\.\d+)?$/.test(value);
        }
    }
}).mount('#app');
