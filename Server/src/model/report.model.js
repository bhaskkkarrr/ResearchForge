import mongoose from "mongoose";

const keyFinding = new mongoose.Schema(
  {
    title: String,
    detailed_explanation: String,
  },
  { _id: false },
);

const source = new mongoose.Schema(
  {
    title: String,
    url: String,
  },
  { _id: false },
);

const finalReport = new mongoose.Schema({
  introduction: String,
  key_findings: [keyFinding],
  conclusion: String,
  sources: [source],
  critic_score: Number,
  strengths: [String],
  areaToImprove: [String],
  topic: String,
});

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    report: finalReport,
  },
  { timestamps: true },
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
