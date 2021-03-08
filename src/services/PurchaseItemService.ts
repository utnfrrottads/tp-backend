import { getRepository } from 'typeorm';
import { Client } from '../entities/Client';
import { Purchase } from '../entities/Purchase';
import { PurchaseItem } from '../entities/PurchaseItem';
import stripObject from '../helpers/stripObject';

export class PurchaseItemService {
    private purchaseItemRepository = getRepository(PurchaseItem);
    private purchaseRepository = getRepository(Purchase);

    public async findByIdAndPurchaseIdAndClientId(id: number, purchaseId: number, clientId: number) {
        return this.purchaseItemRepository.findOne({
            where: { id, purchase: { id: purchaseId, client: { id: clientId } } },
        });
    }
    public async existsByIdAndPurchaseIdAndClientId(id: number, purchaseId: number, clientId: number) {
        return (
            (await this.purchaseItemRepository.count({
                where: { id, purchase: { id: purchaseId, client: { id: clientId } } },
            })) === 1
        );
    }
    public async find(where: PurchaseItem, purchaseId: number, clientId: number) {
        return this.purchaseItemRepository.find({
            where: { ...stripObject(where), purchase: { id: purchaseId, client: { id: clientId } } },
        });
    }
    public async deleteByIdAndPurchaseIdAndClientId(id: number, purchaseId: number, clientId: number) {
        return this.purchaseItemRepository.delete({
            id,
            purchase: { id: purchaseId, client: { id: clientId } }
        });
    }
    public async updateByIdAndPurchaseIdAndClientId(id: number, purchaseId: number, clientId: number, purchaseItem: PurchaseItem) {
        return this.purchaseItemRepository.update(
            { purchase: { id: purchaseId, client: { id: clientId } } }, purchaseItem
        );
    }
    public async createByIdAndPurchaseIdAndClientId(purchaseItem: PurchaseItem, purchaseId: number, clientId: number) {
        const purchase = await this.purchaseRepository.findOne({ where: { id: purchaseId, client: { id: clientId } } });
        purchaseItem.purchase = purchase;
        return this.purchaseItemRepository.save(purchaseItem);
    }
}
