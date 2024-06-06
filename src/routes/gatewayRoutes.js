require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();
const controller = require("../controllers/audit.controller.js");

async function handleRequestAndAuditTrail(req, res, requestHandler) {
  try {
    const saveAuditRequest = await controller.saveAuditRequest(req);
    req["logId"] = saveAuditRequest;
    const response = await requestHandler();
    await controller.saveAuditResponse(response, req.logId);
    res.send(response.data);
  } catch (error) {
    const saveAuditTrail = await controller.saveAuditResponse(
      error.response.data,
      req.logId
    );
    res.status(error.response.status).send(error.response.data);
  }
}

// Routes
router.post("/signup", async (req, res) => {
  await handleRequestAndAuditTrail(req, res, () =>
    axios.post(`http://${process.env.HOST}:${process.env.IDP_PORT}/api/user/signup`, req.body)
  );
});

router.post("/login", async (req, res) => {
  await handleRequestAndAuditTrail(req, res, () =>
    axios.post(`http://${process.env.HOST}:${process.env.IDP_PORT}/api/user/login`, req.body)
  );
});

router.get("/view-profile", async (req, res) => {
  await handleRequestAndAuditTrail(req, res, () =>
    axios.get(`http://${process.env.HOST}:${process.env.IDP_PORT}/api/user/view-profile`, {
      headers: req.headers,
    })
  );
});

router.put("/edit-profile", async (req, res) => {
  await handleRequestAndAuditTrail(req, res, () =>
    axios.put(`http://${process.env.HOST}:${process.env.IDP_PORT}/api/user/edit-profile`, req.body, {
      headers: req.headers,
    })
  );
});

router.get("/video", async (req, res) => {
  await handleRequestAndAuditTrail(req, res, () =>
    axios.get(`http://${process.env.HOST}:${process.env.VIDEO_PROVIDER_PORT}/api/video`, { params: req.query })
  );
});

router.get("/video/:id", async (req, res) => {
  const config = {
    headers: {
      'User-Data': JSON.stringify(req.user)
    }
  };
  await handleRequestAndAuditTrail(req, res, () =>
    axios.get(`http://${process.env.HOST}:${process.env.VIDEO_PROVIDER_PORT}/api/video/${req.params.id}`,config)
  );
});

router.patch("/video/:id", async (req, res) => {
  await handleRequestAndAuditTrail(req, res, () =>
    axios.patch(`http://${process.env.HOST}:${process.env.VIDEO_PROVIDER_PORT}/api/video/${req.params.id}`, req.body)
  );
});

router.post("/comment/:id", async (req, res) => {
  const config = {
    headers: {
      'User-Data': JSON.stringify(req.user)
    }
  };
  await handleRequestAndAuditTrail(req, res, () =>
    axios.post(`http://${process.env.HOST}:${process.env.VIDEO_PROVIDER_PORT}/api/comment/${req.params.id}`, req.body, config)
  );
});

router.get("/comment/:id", async (req, res) => {
  await handleRequestAndAuditTrail(req, res, () =>
    axios.get(`http://${process.env.HOST}:${process.env.VIDEO_PROVIDER_PORT}/api/comment/${req.params.id}`)
  );
});

router.patch("/comment/:id", async (req, res) => {
  const config = {
    headers: {
      'User-Data': JSON.stringify(req.user)
    }
  };
  await handleRequestAndAuditTrail(req, res, () =>
    axios.patch(`http://${process.env.HOST}:${process.env.VIDEO_PROVIDER_PORT}/api/comment/${req.params.id}`, req.body, config)
  );
});

router.post("/reply/:id", async (req, res) => {
  await handleRequestAndAuditTrail(req, res, () =>
    axios.post(`http://${process.env.HOST}:${process.env.VIDEO_PROVIDER_PORT}/api/reply/${req.params.id}`, req.body)
  );
});

router.post("/payment/initiate", async (req, res) => {
  await handleRequestAndAuditTrail(req, res, () =>
    axios.post(`http://${process.env.HOST}:${process.env.PAYMENT_PROVIDER_PORT}/payment/initiate`, req.body)
  );
});

router.post("/payment/execute", async (req, res) => {
  const config = {
    headers: {
      'User-Data': JSON.stringify(req.user)
    }
  };
  await handleRequestAndAuditTrail(req, res, () =>
    axios.post(`http://${process.env.HOST}:${process.env.PAYMENT_PROVIDER_PORT}/payment/execute`, req.body, config)
  );
});

router.post("/payment/status", async (req, res) => {
  const config = {
    headers: {
      'User-Data': JSON.stringify(req.user)
    }
  };
  await handleRequestAndAuditTrail(req, res, () =>
    axios.post(`http://${process.env.HOST}:${process.env.PAYMENT_PROVIDER_PORT}/payment/status`, req.body, config)
  );
});




module.exports = router;
