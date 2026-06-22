// src/modules/visitor-passes/visitorPass.controller.js
const VisitorPass = require("./visitorPass.model");
const logAccess = require("../../utils/accessLogger");
const generatePassCode = () => {
  return (
    "RC-" +
    Math.floor(
      1000 + Math.random() * 9000
    ) +
    "-" +
    Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()
  );
};

exports.createPass = async (
  req,
  res
) => {
  try {
    const pass =
      await VisitorPass.create({
        ...req.body,
        resident: req.user.id,
        passCode: generatePassCode(),
      });

    res.status(201).json({
      success: true,
      data: pass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPasses = async (
  req,
  res
) => {
  const passes =
    await VisitorPass.find({
      resident: req.user.id,
    }).sort({ createdAt: -1 });

  res.json({
    success: true,
    data: passes,
  });
};

exports.getPass = async (
  req,
  res
) => {
  const pass =
    await VisitorPass.findById(
      req.params.id
    );

  res.json({
    success: true,
    data: pass,
  });
};

exports.updatePass = async (
  req,
  res
) => {
  const pass =
    await VisitorPass.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json({
    success: true,
    data: pass,
  });
};

exports.deletePass = async (
  req,
  res
) => {
  await VisitorPass.findByIdAndDelete(
    req.params.id
  );

  res.json({
    success: true,
    message: "Pass deleted",
  });
};

exports.verifyPass = async (
  req,
  res
) => {
  const pass =
    await VisitorPass.findOne({
      passCode: req.params.passCode,
    });

  if (!pass) {
    return res.status(404).json({
      success: false,
      message: "Pass not found",
    });
  }

  res.json({
    success: true,
    data: pass,
  });
};

exports.getStatus = async (
  req,
  res
) => {
  const value =
    req.params.phoneOrCode;

  const pass =
    await VisitorPass.findOne({
      $or: [
        { passCode: value },
        { phone: value },
      ],
    });

  if (!pass) {
    return res.status(404).json({
      success: false,
      message: "Pass not found",
    });
  }

  res.json({
    success: true,
    data: pass,
  });
};

exports.usePass = async (
  req,
  res
) => {
  try {
    const pass =
      await VisitorPass.findOne({
        passCode: req.params.passCode,
      });

    if (!pass) {
      return res.status(404).json({
        success: false,
        message: "Pass not found",
      });
    }

    pass.status = "USED";

    await pass.save();

    await logAccess({
      resident: pass.resident,
      type: "ENTRY",
      method: "VISITOR",
      subject: `${pass.visitorName} (${pass.passCode})`,
    });

    res.json({
      success: true,
      data: pass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};