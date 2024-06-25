import { toast } from "react-toastify";

export const validateForm = ({
    username, 
    email, 
    password,
    confirmPassword
}) => {
    try {
        if (username) {
            const usernameErrorElement = document.querySelector(".usernameError");
            // Validate username
            if (!username) {
                usernameErrorElement.innerHTML = "*Please enter your username";
                usernameError = true;
            } else {
                usernameErrorElement.innerHTML = "";
            }

        }
        const passwordErrorElement = document.querySelector(".passwordError");

        let usernameError = false;
        let passwordError = false;

        

        // Validate password
        if (!password) {
            passwordErrorElement.innerHTML = "*Please enter your password";
            passwordError = true;
        } else {
            passwordErrorElement.innerHTML = "";
        }

        if (usernameError || passwordError) {
            throw new Error("Please re-check your information");
        }
        

        // Validate email & confirm password if they exist
        if (email && confirmPassword) {
            const emailErrorElement = document.querySelector(".emailError");
            const confirmPasswordErrorElement = document.querySelector(".confirmPasswordError");
    
            let emailError = false;
            let confirmPasswordError = false;
            const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
            // Validate email
            if (!email) {
                emailErrorElement.innerHTML = "*Please enter your email";
                emailError = true;
            } else if (!email.match(emailPattern)) {
                emailErrorElement.innerHTML = "*Invalid email";
                emailError = true;
            } else {
                emailErrorElement.innerHTML = "";
            }
    
            // Validate confirm password
            if (!confirmPassword) {
                confirmPasswordErrorElement.innerHTML = "*Please confirm your password";
                confirmPasswordError = true;
            } else if (password !== confirmPassword) {
                confirmPasswordErrorElement.innerHTML = "*Passwords does not match";
                confirmPasswordError = true;
            } else {
                confirmPasswordErrorElement.innerHTML = "";
            }
    
            if (emailError || confirmPasswordError) {
                throw new Error("Please re-check your information");
            }
        }
    } catch (error) {
        toast.error(error.message);
        return false;
    }
    return true;
}