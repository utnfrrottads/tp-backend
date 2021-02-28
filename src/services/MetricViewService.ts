import { getRepository } from 'typeorm';
import { MetricView } from '../entities/MetricView';
import stripObject from '../helpers/stripObject';

export class MetricViewService {
  private metricViewRepository = getRepository(MetricView);

  public async findById(id: number) {
    return this.metricViewRepository.findOne(id);
  }
  public async existsById(id: number) {
    return (await this.metricViewRepository.count({ where: { id } })) === 1;
  }
  public async find(where: MetricView) {
    return this.metricViewRepository.find({ where: stripObject(where) });
  }
  public async deleteById(id: number) {
    return this.metricViewRepository.delete(id);
  }
  public async update(id: number, metricView: MetricView) {
    return this.metricViewRepository.update(id, metricView);
  }
  public async create(metricView: MetricView) {
    return this.metricViewRepository.save(metricView);
  }
}
