function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.name === "") {
        error.name = "Name should not be empty"
    }
    else{
        error.name = ""
    }

    if(values.email === "") {
        error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Email didn't match"
    }else{
        error.email = ""
    }

    if(values.password === "") {
        error.password = "Password should not be empty"
    }
    else if (!password_pattern.test(values.password)) {
        error.password = "Password does not meet security requirements. Password must include: at least one digit, one uppercase letter, one lowercase letter, no special character (!@#$%^&*), and be at least 8 characters long.";
    }else{
        error.password = ""
    }

    if(values.confirmPassword === "") {
        error.confirmPassword = "Confirm Password should not be empty"
    }
    else if (values.confirmPassword !== values.password) {
        error.confirmPassword = "Password didn't match"
    }
    else{
        error.confirmPassword = ""
    }

    return error

}

export default Validation;