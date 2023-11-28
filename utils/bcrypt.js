import bcrypt from 'bcryptjs';

const salt = 15

export const hashPassWord = plaintext => {
    return bcrypt.hashSync(plaintext, salt)
}