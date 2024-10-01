import mongoose from "mongoose";

const pendingRequestSchema = new mongoose.Schema(
  {
    acceptorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const PendingRequest = mongoose.model("PendingRequest", pendingRequestSchema);

export default PendingRequest;
