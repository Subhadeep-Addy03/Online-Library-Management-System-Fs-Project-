import yup from "yup"


//ADD BOOK VALIDATTION :

export const bookValidate = yup.object({
    title: yup
        .string()
        .trim()
        .required("Please provide the title of the book"),
    author: yup
        .string()
        .trim()
        .required("Author is required"),
    category: yup
        .string()
        .trim()
        .required("Category is required"),
    bookNo: yup
        .string()
        .trim()
        .required("BookNo is required"),
    publishYear: yup
        .number()
        .typeError("PublishYear must be number")
        .required("PublishYear is required"),
    quantity: yup
        .number()
        .typeError("Quantity must be a number")
        .min(1, "Quantity must be at least 1")
        .required("Quantity is required"),
    description: yup
        .string()
        .trim()
        .optional(),
    image: yup
        .string()
        .trim()
        .optional()

})

export const validateBook = (schema) => async (req, res, next) => {
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

//UPDATE BOOK VALIDATION :

export const updateValidation = yup.object({

    title: yup.string().trim(),

    author: yup.string().trim(),

    category: yup.string().trim(),

    publishYear: yup.number(),

    quantity: yup.number().min(1),

    description: yup.string(),

    image: yup.string(),

})

export const validateUpdate = (schema) => async (req, res, next) => {
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