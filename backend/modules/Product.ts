import { dbQuery } from "../database/database";

export class Product
{
    name: string = "";
    category: string = "";
    brand: string = "";
    description: string = "";

    static async getProducts()
    {
        let sql = `select * from products;`;
        let products;

        try
        {
            products = await dbQuery(sql);
        }
        catch(error)
        {
            return error;
        }

        if (products.rows)
        {
            return products.rows;
        }
        else
        {
            return null;
        }
    }
}