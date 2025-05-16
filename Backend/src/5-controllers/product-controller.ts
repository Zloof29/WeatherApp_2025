import express, { Request, Response, NextFunction } from "express";

class ProductController {
  public readonly router = express.Router();

  public constructor() {
    this.router.get("/products", this.getAllProducts);
  }

  private async getAllProducts(
    request: Request,
    response: Response,
    next: NextFunction
  ) {}
}

export const productController = new ProductController();
