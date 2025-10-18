const adminAuth = (req, res, next) => {
  console.group("Admin Auth is Checked");
  const token = "XYZ";
  const isAdminAuthorized = token === "XYZ";

  if (!isAdminAuthorized) {
    res.status(401) / send("unothorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.group("User Auth is Checked");
  const token = "XYZ";
  const isUserAuthorized = token === "XYZ";

  if (!isUserAuthorized) {
    res.status(401) / send("unothorized");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth }