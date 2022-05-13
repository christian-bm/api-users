import { Request, Response } from "express";
import { IProduct } from "../../interfaces/product";
import { AppError, handleError } from "../../errors/appError";
import productCreateService from "../../services/products/productCreate.service";

const productCreateController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const product: IProduct = await productCreateService(data);

    return res.status(201).json(product);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default productCreateController;
