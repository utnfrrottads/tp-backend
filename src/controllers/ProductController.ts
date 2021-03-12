import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
} from 'routing-controllers';
import { Product } from '../entities/Product';
import EntityNotFoundError from '../errors/EntityNotFoundError';
import { ProductService } from '../services/ProductService';

@JsonController('/products')
export class ProductController {
  private productService = new ProductService();

  @Get('/')
  public async getAll(@QueryParams() query: Product) {
    return this.productService.find(query);
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    const product = await this.productService.findById(id);
    if (!product) throw new EntityNotFoundError();
    return product;
  }

  @Post('/')
  public async post(@Body() product: Product) {
    delete product.id;
    return await this.productService.create(product);
  }

  @Put('/:id')
  public async put(@Param('id') id: number, @Body() product: Product) {
    if (!this.productService.existsById(id)) throw new EntityNotFoundError();
    const safeEntity = { ...product, id };
    return this.productService.update(id, safeEntity);
  }

  @Delete('/:id')
  public async remove(@Param('id') id: number) {
    if (!this.productService.existsById(id)) throw new EntityNotFoundError();
    return this.productService.deleteById(id);
  }
}
