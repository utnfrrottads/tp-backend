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
  import { Purchase } from '../entities/Purchase';
  import EntityNotFoundError from '../errors/EntityNotFoundError';
  import { PurchaseService } from '../services/PurchaseService';

  @JsonController('/purchases')
  export class PurchaseController {
    private purchaseService = new PurchaseService();

    @Get('/')
    public async getAll(@QueryParams() query: Purchase) {
      return this.purchaseService.find(query);
    }

    @Get('/:id')
    public async getOne(@Param('id') id: number) {
      const purchase = await this.purchaseService.findById(id);
      if (!purchase) throw new EntityNotFoundError();
      return purchase;
    }

    @Post('/')
    public async post(@Body() purchase: Purchase) {
      delete purchase.id;
      return await this.purchaseService.create(purchase);
    }

    @Put('/:id')
    public async put(@Param('id') id: number, @Body() purchase: Purchase) {
      if (!this.purchaseService.existsById(id)) throw new EntityNotFoundError();
      const safeEntity = { ...purchase, id };
      return this.purchaseService.update(id, safeEntity);
    }

    @Delete('/:id')
    public async remove(@Param('id') id: number) {
      if (!this.purchaseService.existsById(id)) throw new EntityNotFoundError();
      return this.purchaseService.deleteById(id);
    }
  }
