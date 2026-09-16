import cron from "node-cron";
import borrowSchema from "../models/borrowSchema.js";
import userSchema from "../models/userSchema.js"
import bookSchema from "../models/bookSchema.js";
import { dueDateReminderEmail } from "../emailVerify/resetPasswordEmail.js";

const dueDateReminder = () => {
    cron.schedule("0 9 * * *", async () => {
        try {
            const today = new Date();

            const tomorrowStart = new Date(today);
            tomorrowStart.setDate(tomorrowStart.getDate() + 1);
            tomorrowStart.setHours(0, 0, 0, 0);

            const tomorrowEnd = new Date(tomorrowStart);
            tomorrowEnd.setHours(23, 59, 59, 999);

            const borrowedBooks = await borrowSchema.find({
                status: "borrowed",
                reminderSent: false,
                dueDate: {
                    $gte: tomorrowStart,
                    $lte: tomorrowEnd
                }
            });

            for (const borrow of borrowedBooks) {

                const user = await userSchema.findById(borrow.userId);
                const book = await bookSchema.findById(borrow.bookId);

                if (!user || !book) {
                    continue;
                }

                await dueDateReminderEmail(
                    user.email,
                    user.userName,
                    book.title,
                    borrow.dueDate
                );

                borrow.reminderSent = true;
                await borrow.save();
            }

            console.log(
                `Due date reminder check completed. ${borrowedBooks.length} reminder(s) found.`
            );

        } catch (error) {
            console.log("DUE DATE REMINDER ERROR:", error);
        }
    });
};

export default dueDateReminder;