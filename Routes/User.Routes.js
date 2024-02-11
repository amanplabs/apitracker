import { UserServices } from "../Services/User.Services.js";
import ApiCall from "../models/ApiCall.js";
import { User } from "../models/UserModel.js";

export const UserRoutes = (app) => {
  app.post("/api/users", async (req, res) => {
    try {
      const { user } = req.body;
      console.log("Received user:", user);

      if (!user) {
        throw { code: 400, message: "Field is required" };
      }
      const createdAt = new Date();
      const todo = new User({ user, createdAt });
      await todo.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(error.code || 500)
        .json({ error: error.message || "Internal Server Error" });
    }
  });

  app.get("/api/getUser", async (req, res) => {
    const ITEMS_PER_PAGE = 5;
    const page = parseInt(req.query.page) || 1;
    const userId = req.body.userId;
    const searchQuery = req.query.search || "";
    try {
      const userData = await UserServices.getUserData(
        userId,
        searchQuery,
        page,
        ITEMS_PER_PAGE
      );
      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      res.status(error.code || 404).send({ message: error.message });
    }
  });

  app.patch("/edit/:todoId", async (req, res) => {
    const { todoId } = req.params;
    const updatedNote = await User.findOneAndUpdate(
      { _id: todoId, userId: req.body.todoId },
      { ...req.body }
    );
    if (updatedNote) {
      res.send("updated");
    } else {
      res.send("unable to update");
    }
  });

  app.get("/api/counts", async (req, res) => {
    try {
      const count = await ApiCall.findOne({}, { count: 1 }); // Get updated count
      res.json({ count });
    } catch (error) {
      console.error("Error retrieving API call count:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
