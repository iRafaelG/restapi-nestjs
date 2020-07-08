import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Param,
  Query,
  Body,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { identity } from 'rxjs';

// import dtos
import { ProductDTO } from './dtos/product.dto';

// import services
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getProducts(@Res() res) {
    let products = await this.productService.getProducts();
    res.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:id')
  async getProduct(@Param('id') id, @Res() res) {
    let product = await this.productService.getProduct(id);
    if (!product) {
      throw new NotFoundException('Product does not exists');
    }
    res.status(HttpStatus.OK).json({
      product,
    });
  }

  @Post('/create')
  async createProduct(@Body() productDTO: ProductDTO, @Res() res) {
    let product = await this.productService.createProduct(productDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Created!',
      product,
    });
  }

  @Delete('/delete')
  async deleteProduct(@Query('id') id, @Res() res) {
    let product = await this.productService.deleteProduct(id);
    if (!product) {
      throw new NotFoundException('Product does not exists');
    }
    res.status(HttpStatus.OK).json(product);
  }

  @Put('/update')
  async updateProduct(
    @Query('id') id,
    @Body() productDTO: ProductDTO,
    @Res() res,
  ) {
    let product = await this.productService.updateProduct(id, productDTO);
    if (!product) {
      throw new NotFoundException('Product does not exists');
    }
    res.status(HttpStatus.OK).json(product);
  }
}
