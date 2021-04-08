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
import { PurchaseItem } from '../entities/PurchaseItem';
import EntityNotFoundError from '../errors/EntityNotFoundError';
import { PurchaseItemService } from '../services/PurchaseItemService';

@JsonController('/clients/:clientId/purchases/:purchaseId/purchase-items')
export class PurchaseItemController {
  private purchaseItemService = new PurchaseItemService();

  @Get('/')
  public async getAll(
    @Param('clientId') clientId: number,
    @Param('purchaseId') purchaseId: number,
    @QueryParams({ validate: false }) query: Client
  ) {
    return this.purchaseItemService.find(query, purchaseId, clientId);
  }

  @Get('/:id')
  public async getOne(
    @Param('clientId') clientId: number,
    @Param('purchaseId') purchaseId: number,
    @Param('id') id: number
  ) {
    const client = await this.purchaseItemService.findByIdAndPurchaseIdAndClientId(
      id,
      purchaseId,
      clientId
    );
    if (!client) throw new EntityNotFoundError();
    return client;
  }

  @Post('/')
  public async post(
    @Param('clientId') clientId: number,
    @Param('purchaseId') purchaseId: number,
    @Body() purchaseItem: PurchaseItem
  ) {
    delete purchaseItem.id;
    return await this.purchaseItemService.createByIdAndPurchaseIdAndClientId(
      purchaseItem,
      purchaseId,
      clientId
    );
  }

  @Put('/:id')
  public async put(
    @Param('clientId') clientId: number,
    @Param('purchaseId') purchaseId: number,
    @Param('id') id: number,
    @Body() purchaseItem: PurchaseItem
  ) {
    if (
      !this.purchaseItemService.existsByIdAndPurchaseIdAndClientId(
        id,
        purchaseId,
        clientId
      )
    )
      throw new EntityNotFoundError();
    const safeEntity = { ...purchaseItem, id };
    return this.purchaseItemService.updateByIdAndPurchaseIdAndClientId(
      id,
      clientId,
      purchaseId,
      safeEntity
    );
  }

  @Delete('/:id')
  public async remove(
    @Param('clientId') clientId: number,
    @Param('purchaseId') purchaseId: number,
    @Param('id') id: number
  ) {
    if (
      !this.purchaseItemService.existsByIdAndPurchaseIdAndClientId(
        id,
        purchaseId,
        clientId
      )
    )
      throw new EntityNotFoundError();
    return this.purchaseItemService.deleteByIdAndPurchaseIdAndClientId(
      id,
      purchaseId,
      clientId
    );
  }
}