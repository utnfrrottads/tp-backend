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
import { MetricView } from '../entities/MetricView';
import EntityNotFoundError from '../errors/EntityNotFoundError';
import { MetricViewService } from '../services/MetricViewService';

@JsonController('/metricViews')
export class MetricViewController {
  private metricViewService = new MetricViewService();

  @Get('/')
  public async getAll(@QueryParams() query: MetricView) {
    return this.metricViewService.find(query);
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    const metricView = await this.metricViewService.findById(id);
    if (!metricView) throw new EntityNotFoundError();
    return metricView;
  }

  @Post('/')
  public async post(@Body() metricView: MetricView) {
    delete metricView.id;
    return await this.metricViewService.create(metricView);
  }

  @Put('/:id')
  public async put(@Param('id') id: number, @Body() metricView: MetricView) {
    if (!this.metricViewService.existsById(id)) throw new EntityNotFoundError();
    const safeEntity = { ...metricView, id };
    return this.metricViewService.update(id, safeEntity);
  }

  @Delete('/:id')
  public async remove(@Param('id') id: number) {
    if (!this.metricViewService.existsById(id)) throw new EntityNotFoundError();
    return this.metricViewService.deleteById(id);
  }
}
