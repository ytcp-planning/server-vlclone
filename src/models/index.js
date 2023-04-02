const MemberLog = require("./member.log.model");
const MemberLogLocation = require("./member.log.location");
const Product = require("./product.model");
const ProductLog = require("./product.log.model");
const Member = require("./member.model");
const ProductCategory = require("./product_category.model");
const ProductCategoryLog = require("./product_category.log.model");


//#region MemberLog
Member.belongsTo(MemberLog, {
  foreignKey: "member_id",
  as: "MemberLog",
});
//#endregion

//#region MemberLogLocation
Member.belongsTo(MemberLogLocation, {
  foreignKey: "member_id",
  as: "MemberLogLocation",
});
//#endregion

//#region ProductCategory
Product.belongsTo(ProductCategory, {
  foreignKey: "category_id",
  as: "ProductCategory",
});
//#endregion

//#region ProductCategory
ProductLog.belongsTo(Product, {
  foreignKey: "product_id",
  as: "ProductLog",
});
//#endregion

//#region ProductCategoryLog
ProductCategoryLog.belongsTo(ProductCategory, {
  foreignKey: "product_category_id",
  as: "ProductCategoryLog",
});
//#endregion


//#region Student
// Student.belongsToMany(Classroom, {
//   through: "ClassStudent",
//   foreignKey: "student_id",
//   as: "Classroom",
// });

// Student.belongsToMany(Course, {
//   through: "StudentCourse",
//   foreignKey: "student_id",
//   as: "Course",
// });

//#endregion

// Student.belongsToMany(Lecturer, {
//   foreignKey: "lecturer_id",
//   as: "Lecturer",
// });