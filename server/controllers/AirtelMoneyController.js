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
    try {
      const accessToken = await airtelMoneyController.getAuthToken();
      const {
        reference,
        customerPhoneNumber,
        amount,
        transactionId,
      } = req.body;

      const generateTransactionId = () => {
        let result = "";
        for (let i = 0; i < 10; i++) {
          // You can adjust the length of the transaction ID as needed
          result += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
        }
        return result;
      };

      const collectResults = await airtelMoneyController.collectMoneyHelper(
        accessToken,
        (reference = "Tom Otieno"),
        (customerPhoneNumber = "0780967277"),
        (amount = "10"),
        (transactionId = generateTransactionId())
      );
      console.log(collectResults);
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
    try {
      const accessToken = await airtelMoneyController.getAuthToken();
      const { id } = req.params;

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
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET_KEY,
      grant_type: "client_credentials",
    };

    try {
      const response = await axios.post(url, data, { headers });
      if (response.status === 200) {
        return response.data.access_token;
      } else {
        throw new Error("Failed to obtain access token");
      }
    } catch (ex) {
      console.error(ex);
      throw new Error("Failed to obtain access token");
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
      "X-Country": "KE", // Kenya
      "X-Currency": "KES", // Kenyan Shilling
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      reference: reference,
      subscriber: {
        country: "KE",
        currency: "KES",
        msisdn: parseInt(customerPhoneNumber),
      },
      transaction: {
        amount: parseInt(amount),
        country: "KE",
        currency: "KES",
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
      "X-Country": "KE",
      "X-Currency": "KES",
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
      ? "https://openapi.airtel.africa"
      : "https://openapi.airtel.africa";
  },
};

module.exports = airtelMoneyController;
