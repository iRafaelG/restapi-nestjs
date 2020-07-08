import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// import interfaces
import { IProduct } from "./interfaces/product.interface";

// import dtos
import { ProductDTO } from "./dtos/product.dto";

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly ProductModel: Model<IProduct>) {}

    async getProduct(id: string): Promise<IProduct> {
        return await this.ProductModel.findById(id);
    }

    async getProducts(): Promise<IProduct[]> {
        return await this.ProductModel.find();
    }

    async createProduct(productDTO: ProductDTO): Promise<IProduct> {
        let newProduct = new this.ProductModel(productDTO);
        return await newProduct.save();
    }

    async deleteProduct(id: string): Promise<IProduct> {
        return await this.ProductModel.findByIdAndDelete(id);
    }

    async updateProduct(id: string, productDTO: ProductDTO): Promise<IProduct> {
        return await this.ProductModel.findByIdAndUpdate(id, productDTO, { new: true });
    }
}
