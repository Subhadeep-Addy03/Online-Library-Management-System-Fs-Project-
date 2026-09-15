import yup from "yup"

export const forgetPasswordValidate = yup.object({
    email: yup
        .string()
        .trim()
        .email("Invalid Email ,Check Again!!")
        .required("Email Is Required")
})

export const validateForgetPassword = (schema) => async (req, res, next) => {
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