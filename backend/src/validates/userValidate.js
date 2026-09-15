import yup from "yup"

//USER VALIDATION :
export const userValidate = yup.object({
    userName: yup
        .string()
        .trim()
        .min(3, "Username must be atleast 3 charcter !!")
        .required("Please enter your username"),
    email: yup
        .string()
        .email("Invalid email")
        .required("Enter your email"),
    password: yup
        .string()
        .required("Enter your password")
        .trim()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*?|])(?=.{8,})/,
            "Your password must be atleast 8 characters,one upercase,one lowercase,one special character and one number !"
        )
})

export const validateUser = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}