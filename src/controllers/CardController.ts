import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  QueryParams,
} from 'routing-controllers';
import { Card } from '../entities/Card';
import EntityNotFoundError from '../errors/EntityNotFoundError';
import { CardService } from '../services/CardService';

@JsonController('/cards')
export class CardController {
  private cardService = new CardService();

  @Get('/')
  public async getAll(@QueryParams({ validate: false }) query: Card) {
    return this.cardService.find(query);
  }

  @Get('/:id')
  public async getOne(@Param('id') id: string) {
    const card = await this.cardService.findById(id);
    if (!card) throw new EntityNotFoundError();
    return card;
  }

  @Post('/')
  public async post(@Body() card: Card) {
    return this.cardService.create(card);
  }

  @Put('/:id')
  public async put(@Param('id') id: string, @Body() card: Card) {
    if (!this.cardService.existsById(id)) throw new EntityNotFoundError();
    const safeEntity = { ...card, id };
    return this.cardService.update(id, safeEntity);
  }

  @Delete('/:id')
  public async remove(@Param('id') id: string) {
    if (!this.cardService.existsById(id)) throw new EntityNotFoundError();
    return this.cardService.deleteById(id);
  }
}
