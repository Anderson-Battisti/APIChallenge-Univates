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

    static async insertProduct(name: string, category: string, brand: string, description: string)
    {
        let product = new Product();
        product.name = name;
        product.category = category;
        product.brand = brand;
        product.description = description;
        
        let sql = `INSERT INTO products (name, category, brand, description) VALUES ($1, $2, $3, $4);`;
        let result;

        try
        {
            result = await dbQuery(sql, [product.name, product.category, product.brand, product.description]);
        }
        catch (error)
        {
            return error;
        }

        if (result.rowCount)
        {
            return product;
        }
        else
        {
            return {success: false, message: "An error has occured while inserting product. Check the params and try again."}; 
        }
    }

    static async editProduct(name: string, category: string, brand: string, description: string, id: number)
    {
        let sql = `UPDATE products set name = $1, category = $2, brand = $3, description = $4 where id = $5`;
        let result;

        let product = new Product();
        product.name = name;
        product.category = category;
        product.brand = brand;
        product.description = description;

        try
        {
            result = await dbQuery(sql, [product.name, product.category, product.brand, product.description, id]);
        }
        catch(error)
        {
            return error;
        }

        if (result.rowCount)
        {
            return product;
        }
        else
        {
            return {success: false, message: "An error has occured while updating the database."};
        }
    }

    static async deleteProduct(id: number)
    {
        let sql = `delete from products where id = $1;`;
        let result: any;

        try
        {
            result = await dbQuery(sql, [id]);
            console.log(result);
        }
        catch(error)
        {
            return error;
        }

        if (result.rowCount > 0)
        {
            return {success: true, id: id, message: "Product deleted successfully."};
        }
        else
        {
            return {success: false, message: "There aren't any products with this ID in the database."};
        }
    }
}