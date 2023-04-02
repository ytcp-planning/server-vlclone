const bcrypt = require("bcryptjs");
const { signJWT } = require("../services/signJWT");
const Member = require("../models/member.model");
const MemberLog = require("../models/member.log.model");
const nodemailer = require("nodemailer");
const { sendMail } = require("../services/sendmail");
const crypto = require("crypto");
const { Op } = require("sequelize");
const {statusMember} = require('../enum/member.enum')
const {
    SignUpSchema,
    SignInSchema,
    forgotSchema,
    newPasswordSchema,
} = require("../validations/auth");
const dayjs = require("dayjs");
const { typeRole } = require("../enum/role.enum");

//#region Auth Member
const signUp = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body;
        const check = await Member.findOne({
            where: {
                email: email,
            },
        });

        if (check) {
            return res.status(422).json({
                status_code: 422,
                error: "Email đã tồn tại trong hệ thống!",
            });
        }

        bcrypt.hash(password, 12, async (error, passwordhashed) => {
            if (error) {
                console.log(error);
            }

            const member = await Member.create({
                fullname,
                email,
                role: typeRole.member.id,
                status: statusMember.active.id,
                password: passwordhashed,
            });
           const memberLog = await MemberLog.create({
                column: "status",
                member_id: member.id,
                creator: {
                    id: member.id,
                    fullname: member.fullname,
                    email: member.email, 
                },
                new_data:  {
                    status: statusMember.new.id
                }
            });
            await member.save();
            await memberLog.save();

            return res.status(200).json({ msg: "success",status_code: 200 });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server_err",status_code:500 });
    }
};

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(402).json({
                status_code: 402,
                message: "Vui lòng nhập đủ thông tin",
            });
        }
        // const validation = await SignInSchema.validateAsync(req.body);

        const check = await Member.findOne({
            where: {
                email: email.toLowerCase().toString(),
            },
        });

        if (!check) {
            return res.status(422).json({
                status_code: 422,
                message: "Không tìm thấy tài khoản trong hệ thống",
            });
        }
        delete check.password

        const comparePassword = await bcrypt.compare(password, check.password);

        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid Pw", status_code: 400 });
        }

        const token = signJWT(check);
        return res.status(200).json({
            message: "success",
            status_code: 200,
            // token, 
            data: {
                ...check.dataValues,
                expireToken: undefined,
                resetToken: token
            }
        });
    } catch (error) {
        console.log(error);
      return res.status(500).json({
        msg: "err_server",
        status_code: 500,
      });
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const buffer = crypto.randomBytes(32);
        const token = buffer.toString("hex");
        const { email } = req.body;
        const validation = await forgotSchema.validateAsync(req.body);

        const member = await Member.findOne({
            where: { email: email },
        });

        if (!member) {
            return res.status(422).json({
                errors: "User dont exists with that email",
            });
        }

        member.resetToken = token;
        member.expireToken = Date.now() + 3600000;

        const result = await member.save();

        //send mail
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD,
            },
        });

        var mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: result.email,
            subject: "Reset Password",
            html: `
        <h3>You requested for password reset</h3>
        <h3>Click in this <a href="http://localhost:5000/new-password/${token}">Link</a>to reset password</h3>
       `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.status(200).json({
                    msg: "Check your email",
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const newPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;
        const validation = await newPasswordSchema.validateAsync(req.body);

        if (!token) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        const check = await Member.findOne({
            where: {
                resetToken: token,
                expireToken: {
                    [Op.gt]: Date.now(),
                },
            },
        });

        if (!check) {
            return res.status(422).json({
                error: "Try again session expired",
            });
        }

        const hashedpassword = await bcrypt.hash(password, 12);
        check.password = hashedpassword;
        check.resetToken = null;
        check.expireToken = null;

        await check.save();

        return res.status(200).json({
            msg: "success",
        });
    } catch (error) {
        console.log(error);
    }
};

//#endregion

// //#region Auth Admin
// const Register = async (req, res, next) => {
//   try {
//     const { lecturer_name, email, password } = req.body;

//     const check = await Lecturer.findOne({
//       where: {
//         email: email,
//       },
//     });

//     if (check) {
//       return res.status(422).json({
//         status: false,
//         error: "User already exists with that email or username!",
//       });
//     }

//     bcrypt.hash(password, 12, async (error, passwordhashed) => {
//       if (error) {
//         console.log(error);
//       }

//       const lecturer = await Lecturer.create({
//         lecturer_name,
//         email,
//         password: passwordhashed,
//       });

//       await lecturer.save();

//       return res.status(200).json({ msg: "success", data: lecturer });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const Login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const check = await Lecturer.findOne({
//       where: {
//         email: email.toLowerCase().toString(),
//       },
//     });

//     if (!check) {
//       return res.status(422).json({
//         errors: "Invalid Email or Password",
//       });
//     }

//     const comparePassword = await bcrypt.compare(password, check.password);

//     if (!comparePassword) {
//       return res.status(400).json({ message: "Invalid Pw" });
//     }

//     const token = signJWT(check);

//     return res.status(200).json({
//       msg: "success",
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

//#endregion

module.exports = {
    signUp,
    signIn,
    forgotPassword,
    newPassword,
    //   Register,
    //   Login,
};
