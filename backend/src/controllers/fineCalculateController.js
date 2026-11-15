// import borrowSchema from "../models/borrowSchema.js";

// export const fineCalculate = async (req, res) => {
//     try {
//         const { borrowId } = req.params;

//         //check borrow record
//         const borrowExist = await borrowSchema.findById(borrowId);
//         if (!borrowExist) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No Borrow Record Found"
//             })
//         }
//         //check book is already return or not
//         if (borrowExist.status === "returned") {
//             return res.status(400).json({
//                 success: false,
//                 message: "You Already Has Been Returned The Book"
//             })
//         }
//         //calculate the overdue days
//         const today = new Date();
//         if (borrowExist.dueDate >= today) {
//             return res.status(400).json({
//                 success: false,
//                 message: "This Book Is Not Overdue"
//             })
//         }
//         //calculate the time
//         const differenceInTime = today.getTime() - borrowExist.dueDate.getTime();

//         //calculate the overdue
//         const overDues = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

//         //fine 10 rs per day
//         const finePerDay = 10;
//         const fineAmmount = overDues * finePerDay;

//         borrowExist.status = "overdue";
//         borrowExist.fineAmmount = fineAmmount;

//         await borrowExist.save();

//         return res.status(200).json({
//             success: true,
//             message: "Fine Amount Calculated Successfully",
//             data: {
//                 overDues,
//                 finePerDay,
//                 fineAmmount
//             }
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


import borrowSchema from "../models/borrowSchema.js";

export const fineCalculate = async (req, res) => {
    try {
        const { borrowId } = req.params;

        const borrowExist = await borrowSchema.findById(borrowId);

        if (!borrowExist) {
            return res.status(404).json({
                success: false,
                message: "No Borrow Record Found"
            });
        }

        if (borrowExist.status === "returned") {
            return res.status(400).json({
                success: false,
                message: "You Already Have Returned The Book"
            });
        }

        if (borrowExist.finePaid) {
            return res.status(400).json({
                success: false,
                message: "Fine Already Paid"
            });
        }

        if (!borrowExist.dueDate) {
            return res.status(400).json({
                success: false,
                message: "Due Date Not Found"
            });
        }

        const dueDate = new Date(borrowExist.dueDate);
        const today = new Date();

        if (Number.isNaN(dueDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid Due Date"
            });
        }

        if (dueDate >= today) {
            return res.status(400).json({
                success: false,
                message: "This Book Is Not Overdue"
            });
        }

        const differenceInTime = today.getTime() - dueDate.getTime();
        const overDues = Math.ceil(
            differenceInTime / (1000 * 60 * 60 * 24)
        );

        const finePerDay = 10;
        const fineAmmount = overDues * finePerDay;

        borrowExist.status = "overdue";
        borrowExist.fineAmmount = fineAmmount;

        await borrowExist.save();

        return res.status(200).json({
            success: true,
            message: "Fine Amount Calculated Successfully",
            data: {
                overDues,
                finePerDay,
                fineAmmount
            }
        });

    } catch (error) {
        console.log("FINE CALCULATE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
