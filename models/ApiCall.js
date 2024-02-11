// models/apiCall.js

import mongoose from "mongoose";

const ApiCallSchema = new mongoose.Schema({
  count: { type: Number, default: 1 },
});

// ApiCallSchema.index({ endpoint: 1, timestamp: 1 });

const ApiCall = mongoose.model("ApiCall", ApiCallSchema);

export default ApiCall;
