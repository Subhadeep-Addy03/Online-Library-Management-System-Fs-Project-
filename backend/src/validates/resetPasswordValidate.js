import yup from "yup"


export const resetPasswordValidate = yup.object({
    newPassword: yup
        .string()
        .required("Enter Your New Password")
        .trim()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*?|])(?=.{8,})/,
            "Your New Password Must be Atleast 8 Characters,one Upercase,one Lowercase,one Special Character and one Number !"
        )
})

export const validateResetPassword = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}