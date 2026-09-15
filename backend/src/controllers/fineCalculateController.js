import borrowSchema from "../models/borrowSchema.js";

export const fineCalculate = async (req, res) => {
    try {
        const { borrowId } = req.params;

        //check borrow record
        const borrowExist = await borrowSchema.findById(borrowId);
        if (!borrowExist) {
            return res.status(404).json({
                success: false,
                message: "No Borrow Record Found"
            })
        }
        //check book is already return or not
        if (borrowExist.status === "returned") {
            return res.status(400).json({
                success: false,
                message: "You Already Has Been Returned The Book"
            })
        }
        //calculate the overdue days
        const today = new Date();
        if (borrowExist.dueDate >= today) {
            return res.status(400).json({
                success: false,
                message: "This Book Is Not Overdue"
            })
        }
        //calculate the time
        const differenceInTime = today.getTime() - borrowExist.dueDate.getTime();

        //calculate the overdue
        const overDues = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

        //fine 10 rs per day
        const finePerDay = 10;
        const fineCalculate = overDues * finePerDay;

        //update borrow record
        borrowExist.status = "overdue";
        borrowExist.fineAmmount = fineCalculate;

        //save in the database also
        await borrowExist.save();

        return res.status(200).json({
            success: true,
            message: "Fine Ammount Calculate Successfuly",
            data: {
                overDues,
                finePerDay,
                fineAmmount
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}