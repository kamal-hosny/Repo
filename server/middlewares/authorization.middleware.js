const authorize = (allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;
    console.log("authorized roles:", allowedRoles);
    
    if (!user) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    console.log("Authoticated", req.user);
    
    next();
  };
};
export default authorize;
