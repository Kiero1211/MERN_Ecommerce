import bcrypt from "bcryptjs";

const saltRound = 10;
const generateHashPassword = async (plain) => {
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(plain, salt);
    return hashedPassword;
}

const comparePassword = async (plain, hash) => {
    return bcrypt.compare(plain, hash);
}

export { generateHashPassword, comparePassword };