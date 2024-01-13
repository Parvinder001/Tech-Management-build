const z = require('zod');
const loginSchema = z.object({
  email: z
    .string().email()
    .min(3, { message: "Email is required." }),
  password: z
    .string()
    .min(3, { message: "Password is required." }),
});
const signupSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at lest 3 chars." }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .min(3, { message: "Email must be at lest 3 chars" })
        .email({ message: "Invalid email address" }),
    phone: z
        .string({ required_error: "Phone field is required" })
        .trim()
        .min(10, { message: "Phone number must be at lest 10 number" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "Password must be at lest 6 chars" })

});

module.exports = { signupSchema, loginSchema };