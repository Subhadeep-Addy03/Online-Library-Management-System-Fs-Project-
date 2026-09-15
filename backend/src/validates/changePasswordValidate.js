import yup from "yup"

export const changePasswordValidate = yup.object({
    oldPassword: yup
        .string()
        .trim()
        .required("Old Password is Required"),
    newPassword: yup
        .string()
        .required("Enter Your New Password")
        .trim()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*?|])(?=.{8,})/,
            "Your New Password must be atleast 8 characters,one upercase,one lowercase,one special character and one number !"
        )
})

export const validateChangePassword = (schema) => async (req, res, next) => {
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