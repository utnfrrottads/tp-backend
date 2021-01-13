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
import { PrizeService } from '../services/PrizeService';

@JsonController('/prizes')
export class PrizeController {
  private prizeService = new PrizeService();

  @Get('/')
  getAll(@QueryParams() query: Prize) {
    return this.prizeService.find(query);
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.prizeService.findById(id);
  }

  @Post('/')
  async post(@Body() prize: Prize) {
    delete prize.id;
    return await this.prizeService.create(prize);
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() prize: Prize) {
    const safeEntity = { ...prize, id };
    return this.prizeService.update(id, safeEntity);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.prizeService.deleteById(id);
  }
}
