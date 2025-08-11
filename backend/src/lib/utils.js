import jwt from 'jsonwebtoken'


export const generateToken = (userId,res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '28d'
    })

    res.cookie("jwt",token,{
        maxAge: 28 * 24 *60 *60 *1000, //ms,
        httpOnly: true,
        sameSite:"strict", 
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}