// controllers/productController.js
const { Product, Vendor } = require("../models");

const API = "http://localhost:5000";

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      // const user = await User.findByPk(vendorId);

      // if (!user) {
      //   return res.status(404).json({ message: "User not found" });
      // }

      // Check if files were uploaded
      const imageFile = req.file;
      const imagePath = `${API}/uploads/${imageFile.filename}`;
      try {
        const newProduct = await Product.create({
          vendorId: 1,
          category_id,
          subcategory_id,
          childcategory_id,
          tax_id,
          brand_id,
          name,
          slug,
          sku,
          tags,
          video,
          sort_details,
          specification_name,
          specification_description,
          is_specification,
          details,
          photo: imagePath,
          discount_price,
          previous_price,
          stock,
          meta_keywords,
          meta_description,
          status,
          is_type,
          date,
          file,
          link,
          file_type,
          license_name,
          license_key,
          item_type,
          thumbnail,
          affiliate_link
        });

        await user.addProduct(newProduct);

        res.status(201).json(newProduct);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  createProduct: async (req, res) => {
    const {  
      category_id,
      subcategory_id,
      childcategory_id,
      tax_id,
      brand_id,
      name,
      slug,
      sku,
      tags,
      video,
      sort_details,
      specification_name,
      specification_description,
      is_specification,
      details,
      photo,
      discount_price,
      previous_price,
      stock,
      meta_keywords,
      meta_description,
      status,
      is_type,
      date,
      file,
      link,
      file_type,
      license_name,
      license_key,
      item_type,
      thumbnail,
      affiliate_link,
      } =
      req.body;

    const vendorId = 1;

    const vendor = await Vendor.findByPk(vendorId);

    if (!vendor) {
      return res.status(404).json({ error: "Vendor Not Found" });
    }
    const imageFile = req.file;
    const imagePath = `${API}/uploads/${imageFile.filename}`;
    try {
      const newProduct = await Product.create({
        vendorId: vendor.id,
        category_id,
        subcategory_id,
        childcategory_id,
        tax_id,
        brand_id,
        name,
        slug,
        sku,
        tags,
        video,
        sort_details,
        specification_name,
        specification_description,
        is_specification,
        details,
        photo: imagePath,
        discount_price,
        previous_price,
        stock,
        meta_keywords,
        meta_description,
        status,
        is_type,
        date,
        file,
        link,
        file_type,
        license_name,
        license_key,
        item_type,
        thumbnail,
        affiliate_link
      });

      return res.status(201).json(newProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal Server Error");
    }
  },

  getProductById: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const {  
      category_id,
      subcategory_id,
      childcategory_id,
      tax_id,
      brand_id,
      name,
      slug,
      sku,
      tags,
      video,
      sort_details,
      specification_name,
      specification_description,
      is_specification,
      details,
      photo,
      discount_price,
      previous_price,
      stock,
      meta_keywords,
      meta_description,
      status,
      is_type,
      date,
      file,
      link,
      file_type,
      license_name,
      license_key,
      item_type,
      thumbnail,
      affiliate_link,
       } =
      req.body;

    try {
      // Check if a file was uploaded
      const imageFile = req.file;
      const imagePath = imageFile
        ? `${API}/uploads/${imageFile.filename}`
        : null;

      // Check if the product with the given ID exists
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: "Product Not Found" });
      }

      // Update the product with the new information
      const updatedProductData = {
        category_id,
        subcategory_id,
        childcategory_id,
        tax_id,
        brand_id,
        name,
        slug,
        sku,
        tags,
        video,
        sort_details,
        specification_name,
        specification_description,
        is_specification,
        details,
        photo: imagePath,
        discount_price,
        previous_price,
        stock,
        meta_keywords,
        meta_description,
        status,
        is_type,
        date,
        file,
        link,
        file_type,
        license_name,
        license_key,
        item_type,
        thumbnail,
        affiliate_link
      };

      // Only update the image if a file was uploaded
      if (imageFile) {
        updatedProductData.image = imagePath;
      }

      const updatedProduct = await product.update(updatedProductData);

      return res.status(200).json(updatedProduct);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.destroy();

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = productController;
