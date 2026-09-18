import dotenv from "dotenv/config";

// Send email via Brevo Transactional Email REST API
const sendBrevoEmail = async ({ to, subject, html }) => {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            sender: {
                name: "Online Library",
                email: process.env.BREVO_FROM_EMAIL,
            },
            to: [{ email: to }],
            subject,
            htmlContent: html,
        }),
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(`Brevo API error: ${JSON.stringify(err)}`);
    }

    return response.json();
};

export const resetPasswordEmail = async (token, email) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendBrevoEmail({
        to: email,
        subject: "Reset Your Password",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
                <h2 style="color: #2563eb;">Reset Your Password</h2>
                <p>Click the button below to reset your password.</p>
                <a
                    href="${resetLink}"
                    style="
                        display: inline-block;
                        padding: 12px 20px;
                        background-color: #dc2626;
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                        margin: 16px 0;
                    "
                >
                    Reset Password
                </a>
                <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
                    This link will expire in 10 minutes. If you did not request a password reset, please ignore this email.
                </p>
            </div>
        `,
    });
};

export const bookBorrowedEmail = async (
    email,
    userName,
    bookTitle,
    borrowDate,
    dueDate
) => {
    await sendBrevoEmail({
        to: email,
        subject: "Book Borrowed Successfully",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
                <h2 style="color: #2563eb;">Book Borrowed Successfully ✅</h2>
                <p>Hello <strong>${userName}</strong>,</p>
                <p>You have successfully borrowed the following book:</p>
                <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Book</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${bookTitle}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Borrow Date</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${new Date(borrowDate).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Due Date</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${new Date(dueDate).toLocaleDateString()}</td>
                    </tr>
                </table>
                <p>Please return the book on or before the due date to avoid overdue fines.</p>
                <p style="color: #6b7280; font-size: 14px;">Thank you for using our Online Library System.</p>
            </div>
        `,
    });
};

export const dueDateReminderEmail = async (
    email,
    userName,
    bookTitle,
    dueDate
) => {
    await sendBrevoEmail({
        to: email,
        subject: "📅 Book Return Reminder - Due Tomorrow",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
                <h2 style="color: #d97706;">⚠️ Book Return Reminder</h2>
                <p>Hello <strong>${userName}</strong>,</p>
                <p>This is a reminder that the following book is <strong>due tomorrow</strong>:</p>
                <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Book</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${bookTitle}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Due Date</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${new Date(dueDate).toLocaleDateString()}</td>
                    </tr>
                </table>
                <p>Please return the book on or before the due date to avoid overdue fines.</p>
                <p style="color: #6b7280; font-size: 14px;">Thank you for using our Online Library System.</p>
            </div>
        `,
    });
};