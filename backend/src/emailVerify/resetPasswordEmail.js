// import nodemailer from "nodemailer"
// import dotenv from "dotenv/config"


// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// });

// export const resetPasswordEmail = async (token, email) => {

//     const resetLink = `http://localhost:5173/reset-password/${token}`;
//     await transporter.sendMail({
//         from: process.env.EMAIL,
//         to: email,
//         subject: "Reset Password",
//         html: `
//             <h2>Reset Your Password</h2>

//             <p>Click the button below to reset your password.</p>

//             <a href="${resetLink}">Reset Password</a>

//             <p>This link will expire in 10 minutes.</p>
//         `
//     });

// };



import nodemailer from "nodemailer"
import dotenv from "dotenv/config"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const resetPasswordEmail = async (token, email) => {

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password",
        html: `
            <h2>Reset Your Password</h2>

            <p>Click the button below to reset your password.</p>

            <a href="${resetLink}">Reset Password</a>

            <p>This link will expire in 10 minutes.</p>
        `
    });

};

export const bookBorrowedEmail = async (
    email,
    userName,
    bookTitle,
    borrowDate,
    dueDate
) => {

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Book Borrowed Successfully",
        html: `
            <h2>Book Borrowed Successfully</h2>

            <p>Hello ${userName},</p>

            <p>You have successfully borrowed the following book:</p>

            <p><strong>Book:</strong> ${bookTitle}</p>

            <p><strong>Borrow Date:</strong> ${new Date(borrowDate).toLocaleDateString()}</p>

            <p><strong>Due Date:</strong> ${new Date(dueDate).toLocaleDateString()}</p>

            <p>Please return the book on or before the due date.</p>

            <p>Thank you for using our Online Library System.</p>
        `
    });

};

export const dueDateReminderEmail = async (
    email,
    userName,
    bookTitle,
    dueDate
) => {

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Book Return Reminder - Due Tomorrow",
        html: `
            <h2>Book Return Reminder</h2>

            <p>Hello ${userName},</p>

            <p>This is a reminder that the following book is due tomorrow:</p>

            <p><strong>Book:</strong> ${bookTitle}</p>

            <p><strong>Due Date:</strong> ${new Date(dueDate).toLocaleDateString()}</p>

            <p>Please return the book on or before the due date to avoid overdue fines.</p>

            <p>Thank you for using our Online Library System.</p>
        `
    });

};