const mongoose= require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true,
      default: ""
    },

    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Transection = mongoose.model("Transaction", transactionSchema);
module.exports= Transection;