import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from "@nestjs/mongoose";

// import schemas
import { ProductSchema } from "./shemas/product.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product', schema: ProductSchema
      }
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
