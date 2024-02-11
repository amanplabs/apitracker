import ApiCall from "../models/ApiCall.js";

const countMiddleware = async (req, res, next) => {
  try {
    // Increment the overall count for any API call
    const apiCall = await ApiCall.findOneAndUpdate(
      {}, // Empty query matches all documents
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );

    // Log the updated count (optional)
    console.log("Updated count:", apiCall.count);

    next();
  } catch (error) {
    console.error("Error updating API call count:", error);
    next(error); // Pass error to error handler
  }
};

export default countMiddleware;
