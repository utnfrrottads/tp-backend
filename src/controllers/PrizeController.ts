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
import { Prize } from '../entities/Prize';
import EntityNotFoundError from '../errors/EntityNotFoundError';
import { PrizeService } from '../services/PrizeService';

@JsonController('/prizes')
export class PrizeController {
  private prizeService = new PrizeService();

  @Get('/')
  public async getAll(@QueryParams() query: Prize) {
    return this.prizeService.find(query);
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    const prize = await this.prizeService.findById(id);
    if (!prize) throw new EntityNotFoundError();
    return prize;
  }

  @Post('/')
  public async post(@Body() prize: Prize) {
    delete prize.id;
    return await this.prizeService.create(prize);
  }

  @Put('/:id')
  public async put(@Param('id') id: number, @Body() prize: Prize) {
    if (!this.prizeService.existsById(id)) throw new EntityNotFoundError();
    const safeEntity = { ...prize, id };
    return this.prizeService.update(id, safeEntity);
  }

  @Delete('/:id')
  public async remove(@Param('id') id: number) {
    if (!this.prizeService.existsById(id)) throw new EntityNotFoundError();
    return this.prizeService.deleteById(id);
  }
}
