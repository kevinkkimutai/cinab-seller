const axios = require("axios");

const airtelMoneyController = {
  authorize: async (req, res) => {
    try {
      const authResults = await airtelMoneyController.getAuthToken();
      console.log(authResults);
      if (authResults.success) {
        res.json(authResults.data);
      } else {
        res.status(500).json({ error: authResults.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  collectMoney: async (req, res) => {
    const {
      accessToken,
      reference,
      customerPhoneNumber,
      amount,
      transactionId,
    } = req.body;

    try {
      const collectResults = await airtelMoneyController.collectMoneyHelper(
        accessToken,
        reference,
        customerPhoneNumber,
        amount,
        transactionId
      );
      if (collectResults.success) {
        res.json(collectResults.data);
      } else {
        res.status(500).json({ error: collectResults.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  checkCollectionStatus: async (req, res) => {
    const { accessToken, id } = req.params;

    try {
      const collectionStatus =
        await airtelMoneyController.checkCollectionStatusHelper(
          accessToken,
          id
        );
      if (collectionStatus.success) {
        res.json(collectionStatus.data);
      } else {
        res
          .status(collectionStatus.status)
          .json({ error: collectionStatus.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAuthToken: async () => {
    const baseUrl = airtelMoneyController.baseUrl();
    const url = `${baseUrl}/auth/oauth2/token`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    const data = {
      client_id: "98ef8277-2d05-4ec7-a53a-cb2b42e727fa",
      client_secret: "****************************",
      grant_type: "client_credentials",
    };

    try {
      const response = await axios.post(url, data, { headers });
      const success = response.status === 200;
      return { success, data: response.data };
    } catch (ex) {
      console.log(ex);
      return { success: false, message: ex.message };
    }
  },

  collectMoneyHelper: async (
    accessToken,
    reference,
    customerPhoneNumber,
    amount,
    transactionId
  ) => {
    const baseUrl = airtelMoneyController.baseUrl();
    const url = `${baseUrl}/merchant/v1/payments/`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
      "X-Country": "UG", // payer's country in ISO format
      "X-Currency": "UGX", // payer's currency in ISO format
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      reference: reference,
      subscriber: {
        country: "UG",
        currency: "UGX",
        msisdn: parseInt(customerPhoneNumber),
      },
      transaction: {
        amount: parseInt(amount),
        country: "UG",
        currency: "UGX",
        id: transactionId,
      },
    };

    try {
      const response = await axios.post(url, data, { headers });
      const success = response.status === 200;
      return { success, data: response.data };
    } catch (ex) {
      return { success: false, message: ex.message };
    }
  },

  checkCollectionStatusHelper: async (accessToken, id) => {
    const baseUrl = airtelMoneyController.baseUrl();
    const url = `${baseUrl}/standard/v1/payments/${id}`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
      "X-Country": "UG",
      "X-Currency": "UGX",
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await axios.get(url, { headers });
      const success = response.status === 200;
      return {
        success,
        status: response.status,
        data: response.data,
      };
    } catch (ex) {
      return { success: false, status: 500, message: ex.message };
    }
  },

  baseUrl: () => {
    return process.env.DEBUG
      ? "https://openapiuat.airtel.africa"
      : "https://openapi.airtel.africa";
  },
};

module.exports = airtelMoneyController;
