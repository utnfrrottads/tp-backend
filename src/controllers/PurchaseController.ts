import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams
} from 'routing-controllers';
import { Client } from '../entities/Client';
import { Purchase } from '../entities/Purchase';
import EntityNotFoundError from '../errors/EntityNotFoundError';
import { PurchaseService } from '../services/PurchaseService';

  @JsonController('/clients/:clientId/purchases')
  export class PurchaseController {
    private purchaseService = new PurchaseService();

    @Get('/')
    public async getAll(
      @Param('clientId') clientId: number,
      @QueryParams({ validate: false }) query: Client
    ) {
      return this.purchaseService.find(query, clientId);
    }

    @Get('/:id')
    public async getOne(
      @Param('clientId') clientId: number,
      @Param('id') id: number
    ) {
      const client = await this.purchaseService.findByIdAndClientId(
        id,
        clientId
      );
      if (!client) throw new EntityNotFoundError();
      return client;
    }

    @Post('/')
    public async post(
      @Param('clientId') clientId: number,
      @Body() purchase: Purchase
    ) {
      delete purchase.id;
      return await this.purchaseService.createByIdAndClientId(
        purchase,
        clientId
      );
    }

    @Put('/:id')
    public async put(
      @Param('clientId') clientId: number,
      @Param('id') id: number,
      @Body() purchase: Purchase
    ) {
      if (!this.purchaseService.existsByIdAndClientId(id, clientId))
        throw new EntityNotFoundError();
      const safeEntity = { ...purchase, id };
      return this.purchaseService.updateByIdAndClientId(
        id,
        clientId,
        safeEntity
      );
    }

    @Delete('/:id')
    public async remove(
      @Param('clientId') clientId: number,
      @Param('id') id: number
    ) {
      if (!this.purchaseService.existsByIdAndClientId(id, clientId))
        throw new EntityNotFoundError();
      return this.purchaseService.deleteByIdAndClientId(id, clientId);
    }
  }