import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import stripObject from '../helpers/stripObject';

export class ProductService {
  private productRepository = getRepository(Product);

  public async findById(id: number) {
    return this.productRepository.findOne(id);
  }
  public async existsById(id: number) {
    return (await this.productRepository.count({ where: { id } })) === 1;
  }
  public async find(where: Product) {
    return this.productRepository.find({ where: stripObject(where) });
  }
  public async deleteById(id: number) {
    return this.productRepository.delete(id);
  }
  public async update(id: number, product: Product) {
    return this.productRepository.update(id, product);
  }
  public async create(product: Product) {
    return this.productRepository.save(product);
  }
}
