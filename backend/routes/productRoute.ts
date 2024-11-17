import { Router } from "express";
import { Request, Response } from "express";
import { Product } from "../modules/Product";

export const productRoute = Router();

productRoute.get("/getProducts", async (req: Request, res: Response) =>
{
    let products = await Product.getProducts();

    if (products instanceof Error)
    {
        return res.status(500).json({success: false, error: products.message, message: "Internal Server error."});
    }
    else if (products != null)
    {
        return res.status(200).json({success: true, products});
    }
    else
    {
        return res.status(404).json({success: false, message: "Error. There aren't any products in the database."});
    }
});
