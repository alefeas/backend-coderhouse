const { Router } = require("express");
const router = Router()
const ProductManager = require("../../productManager/ProductManager");
const manager = new ProductManager('products.json')

router.get("/", async (req, res) => {
  const prods = await manager.getProducts();
  const limit = Number(req.query.limit);
  
  if (limit) {
    const limitProducts = prods.slice(0, limit);
    return res.json({
      status: "success",
      data: limitProducts,
    });
  }
  res.json({
  status: "success",
  data: prods,
  })
});

router.get("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  const data = await manager.getProductById(pid);

  if (isNaN(pid)) {
    res.status(400).send("El ID debe ser un número");
  }

  if (data) {
    res.json({
      status: "success",
      data: data,
    });
  } else {
    res.status(400).send("ID no encontrado.");
  }
});

router.post("/", async (req, res) => {
  const product = req.body;
  if (
    !product.title ||
    !product.description ||
    !product.price ||
    !product.code ||
    !product.status ||
    !product.category ||
    !product.thumbnails
  ) {
    res.status(400).send("todos los campos deben ser obligatorios");
  } else if (isNaN(product.price)) {
    res.status(400).send("El precio debe ser un número");
  } else {
    res.json({
      status: "success",
      data: await manager.addProduct(product),
    });
  }
});

router.put("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  const fieldsToUpdate = req.body;
  const foundId = fieldsToUpdate.hasOwnProperty("id");
  const data = await manager.updateProduct(pid, fieldsToUpdate)
  console.log(data)

  if (foundId) {
    res.status(400).send("No se puede modificar la propiedad id");
  } else {
    if(data){
      res.json({
        status: "success",
        data: data
      });
    } else {
      res.status(400).send("No se encontro el producto")
    }
  }
});

router.delete("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);

  if (isNaN(pid)) {
    res.status(400).send("El parametro debe ser un numero");
  } else {
    res.json({
      status: "success",
      data: await manager.deleteProduct(pid),
    });
  }
});

module.exports = router;