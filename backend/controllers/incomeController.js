const xlsx = require('xlsx');  
const Income = require("../models/Income");

exports.addIncome = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. No user ID found." });
        }

        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        // Create new income
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (err) {
        console.error("Error in addIncome:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({userId}).sort({ date: -1 });
        res.json(income);
    } catch (err){
        res.status(500).json({message: "server error"});
    }
}

exports.deleteIncome = async (req, res) => {
    try {

        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted"});
    } catch (err){
        res.status(500).json({message: "server error"});
    }      
}

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({userId}).sort({ date: -1 });

        //prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    } catch (err){
        res.status(500).json({message: "server error"});
    }
};