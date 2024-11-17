import { Router } from "express";
import { Request, Response } from "express";
import { Product } from "../modules/Product";

export const productRoute = Router();

productRoute.get("/getProducts", async (req: Request, res: Response) =>
{
    let products;
    try
    {
        products = await Product.getProducts();
    }
    catch(error)
    {
        return res.status(500).json({success: false, message: "Internal Server error."});
    }

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

productRoute.post("/postProduct", async (req: Request, res: Response) =>
{
    let name: string;
    let category: string;
    let brand: string;
    let description: string;

    try
    {
        name = req.body.name;
        category = req.body.category;
        brand = req.body.brand;
        description = req.body.description;
    }
    catch (error)
    {
        return res.status(400).json({success: false, message: "The server didn't received all necessary fields. Check it and try again"});
    }
    
    if (name && category && brand && description)
    {
        let product = await Product.insertProduct(name, category, brand, description);

        if (product instanceof Error)
        {
            return res.status(500).json({success: false, error: product.message});
        }
        else if (product != null)
        {
            return res.status(200).json({success: true, product});
        }
        else
        {
            return res.status(500).json({success: false, message: "An error has occured while inserting product. Check the params and try again."});
        }
    }
    else
    {
        return res.status(400).json({success: false, message: "The server didn't received all necessary fields. Check it and try again"});
    }
});

productRoute.put("/editProduct", async (req: Request, res: Response) =>
{
    let id: number;
    let name: string;
    let category: string;
    let brand: string;
    let description: string;

    try
    {
        name = req.body.name;
        category = req.body.category;
        brand = req.body.brand;
        description = req.body.description;
        id = req.body.id;
    }
    catch (error)
    {
        return res.status(400).json({success: false, message: "The server didn't received all necessary fields. Check it and try again"});
    }
    
    if (name && category && brand && description && id)
    {
        let product = await Product.editProduct(name, category, brand, description, id);

        if (product instanceof Error)
        {
            return res.status(500).json({success: false, error: product.message});
        }
        else if (product != null)
        {
            return res.status(200).json({success: true, product});
        }
        else
        {
            return res.status(500).json({success: false, message: "An error has occured while updating the product. Check the params and try again."});
        }
    }
    else
    {
        return res.status(400).json({success: false, message: "The server didn't received all necessary fields. Check it and try again"});
    }
});

productRoute.delete("/deleteProduct", async (req: Request, res: Response) =>
{
    let id: number;

    try
    {
        id = req.body.id;
    }
    catch (error)
    {
        return res.status(400).json({success: false, message: "The server didn't received all necessary fields. Check it and try again"});
    }
    
    if (id)
    {
        let deleted: any = await Product.deleteProduct(id);

        if (deleted instanceof Error)
        {
            return res.status(500).json({success: false, error: deleted.message});
        }
        else if (deleted.success)
        {
            return res.status(200).json({success: true, deleted});
        }
        else
        {
            return res.status(500).json({success: false, message: "There aren't any products with this ID in the database."});
        }
    }
    else
    {
        return res.status(400).json({success: false, message: "The server didn't received all necessary fields. Check it and try again"});
    }
});
