const { typeRole } = require("../enum/role.enum");
const Member = require("../models/member.model");
const MemberLog = require("../models/member.log.model");

//#region Member
const getAllMember = async (req, res, next) => {
  try {
    const { download } = req.body;

    const member = await Member.findAll({
      include: [
        // {
        //   model: Member,
        //   through: ClassMember,
        //   as: "Member",
        //   attributes: ["student_name"],
        // },
      ],
      order: [
        ["createdAt", "DESC"],
        [
          "createdAt",
          "DESC",
        ],
      ],
    })
    console.log(Member);
    return res.status(200).json({
      message: "success",
      status_code: 200,
      data: member,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "err_server",
      status_code: 500,
    });
  }
};
const getMemberByID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const member = await Member.findByPk(id);
    return res.status(200).json({
      message: "success",
      status_code: 200,
      data: member,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "err_server",
      status_code: 500,
    });
  }
};
//#endregion

//#region Admin
const postAdmin = async (req, res, next) => {
  const { email } = req.body;
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
  try {
    bcrypt.hash(process.env.DEFAULT_PASS, 12, async (error, passwordhashed) => {
      if (error) {
        console.log(error);
      }

      const member = await Member.create({
        fullname,
        email,
        role: typeRole.admin.id,
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
        new_data: {
          status: statusMember.new.id
        }
      });
      await member.save();
      await memberLog.save();

      return res.status(200).json({ msg: "success", status_code: 200, data: member });
    });
  } catch (error) {
    return res.status(500).json({ msg: "server_err", status_code: 500 });
  }
};

const updateAdmin = async (req, res, next) => {
  const { id } = req.params;
  const check = await Member.findByPk(id);

  if (!check) {
    return res.status(404).json({
      status_code: 404,
      error: "Không tìm thấy thành viên",
    });
  }
  try {
    const result = await check.update(
      {
        ...req.body
      }
    );
    await result.save();

    return res.status(200).json({ msg: "success", status_code: 200, data: { ...result.dataValues, password: undefined } });
  } catch (error) {
    return res.status(500).json({ msg: "server_err", status_code: 500 });
  }
};
//#endregion


module.exports = {
  getAllMember,
  getMemberByID,
  postAdmin,
  updateAdmin
};
