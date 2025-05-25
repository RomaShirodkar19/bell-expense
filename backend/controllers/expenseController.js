const xlsx = require('xlsx');  
const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. No user ID found." });
        }

        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        // Create new expense
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        console.error("Error in addExpense:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({ date: -1 });
        res.json(expense);
    } catch (err){
        res.status(500).json({message: "server error"});
    }
}

exports.deleteExpense = async (req, res) => {
    try {

        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted"});
    } catch (err){
        res.status(500).json({message: "server error"});
    }      
}

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({ date: -1 });

        //prepare data for excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    } catch (err){
        res.status(500).json({message: "server error"});
    }
};