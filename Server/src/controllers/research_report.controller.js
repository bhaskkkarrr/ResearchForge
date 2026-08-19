import axios from "axios";
import { axiosInstance } from "../services/axiosInstance.js";
import User from "../model/user.model.js";
import Report from "../model/report.model.js";

export const research_report = async (req, res) => {
  const user = req.user;
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({
      success: false,
      message: "Topic is required",
    });
  }
  try {
    if (user.credits < 30) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits",
      });
    }

    try {
      console.log("reached before");
      const response = await axiosInstance.post("/research/report", {
        topic: topic,
      });
      console.log("after");

      const avalCredits = user.credits - 30;
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { credits: avalCredits } },
        { new: true },
      );

      const new_report = await Report.create({
        userId: user._id,
        report: {
          ...response.data.final_report,
          critic_score: response.data.critic_report.score,
          strengths: response.data.critic_report.strengths,
          areaToImprove: response.data.critic_report.area_to_improve,
          topic: topic,
        },
      });

      return res.status(200).json({
        success: true,
        report: new_report,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while generating research report",
        error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const get_report = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "No id found",
    });
  }
  const report = await Report.findById(id);
  if (!report) {
    return res.status(400).json({
      success: false,
      message: "Invalid id",
    });
  }

  return res.status(200).json({
    success: true,
    report,
  });
};

export const all_reports = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);

  const reports = await Report.find({ userId });

  return res.status(200).json({
    success: true,
    reports,
  });
};
