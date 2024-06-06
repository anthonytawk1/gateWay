const jwtGenerator = require('./jwtGenerator'); // Assuming you have a module to generate JWT tokens

// Modify the handleRequestAndAuditTrail function
async function handleRequestAndAuditTrail(req, res, requestHandler, generateNewToken = false) {
  try {
    const saveAuditRequest = await controller.saveAuditRequest(req);
    req["logId"] = saveAuditRequest;

    // Generate a new token if required
    let jwt = null;
    if (generateNewToken) {
      jwt = jwtGenerator.generateToken(); // Call your function to generate a new token
    }

    // Add JWT to request headers if provided
    if (jwt) {
      req.headers['Authorization'] = `Bearer ${jwt}`;
    }

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

// Example route handler with token generation
router.get("/video/:id", async (req, res) => {
  await handleRequestAndAuditTrail(req, res, async () => {
    // Generate a new token
    const newToken = jwtGenerator.generateToken(); // Call your function to generate a new token
    
    // Make the request with the new token
    return axios.get(`http://${process.env.HOST}:${process.env.VIDEO_PROVIDER_PORT}/api/video/${req.params.id}`, {
      headers: {
        ...req.headers,
        'Authorization': `Bearer ${newToken}`
      }
    });
  }, true); // Pass true to indicate that a new token should be generated
});
