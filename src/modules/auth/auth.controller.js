// src/modules/auth/auth.controller.js
const crypto = require("crypto");
const User = require("./auth.model");
const {generateAccessToken, generateRefreshToken} = require("../../utils/generateToken");
exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    res.status(201).json({
      success: true,
      data: {
        user,
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: 3600,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const validPassword =
      await user.comparePassword(password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken =
      generateAccessToken(user);

    const refreshToken =
      generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    user.password = undefined;

    res.json({
      success: true,
      data: {
        user,
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: 3600,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.me = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json({
    success: true,
    data: user,
  });
};

exports.logout = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user.id,
    {
      refreshToken: null,
    }
  );

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      success: true,
      message:
        "If the email exists, reset instructions have been sent",
    });
  }

  const resetToken = crypto
    .randomBytes(32)
    .toString("hex");

  user.passwordResetToken = resetToken;

  user.passwordResetExpires =
    Date.now() + 1000 * 60 * 15;

  await user.save();

  res.json({
    success: true,
    resetToken,
  });
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  }).select("+password");

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid reset token",
    });
  }

  user.password = password;

  user.passwordResetToken = null;

  user.passwordResetExpires = null;

  await user.save();

  res.json({
    success: true,
    message: "Password reset successful",
  });
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const decoded = require("jsonwebtoken").verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const accessToken = generateAccessToken(user);

    res.json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        expiresIn: 3600,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};