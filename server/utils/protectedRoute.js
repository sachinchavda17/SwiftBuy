import jwt from "jsonwebtoken";

const protectedRoute = async (req,res,next) => {
  try {
    let token = req.header("Authorization");

    if (!token)
      return res
        .status(401)
        .json({ error: "UnAuthorized - No Token Provided!" });

    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trimLeft();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({ error: "Unauthorized - Invalid Token!" });

    req.user = decoded;
    next();
  } catch (error) {
    console.log("error", error.message);
  }
};

export default protectedRoute;
