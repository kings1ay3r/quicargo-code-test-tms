import { Service } from '@app/server/services/service.js'
import { CreateTruckRequest, ListResponse, RequestContext, Truck, UpdateTruckRequest } from '@dtos/'

export default class TruckService extends Service {
  constructor() {
    super('TruckService')
  }

  //TODO: (SanityEnhancements) Implement filters, pagination, populate hasMore
  async getTrucks(ctx: RequestContext): Promise<ListResponse<Truck>> {
    return {
      data: (
        await this.repository.truck.find(ctx, {}, { location: { select: { uid: true } } })
      ).map(({ id, locationId, ...resp }) => resp) as Truck[],
      count: await this.repository.truck.count(),
      hasMore: false,
    }
  }

  async getTruck(ctx: RequestContext, uuid: string): Promise<Truck> {
    const { id, locationId, ...resp } = await this.repository.truck.findByUid(ctx, uuid, {
      location: { select: { uid: true } },
    })
    return { data: [resp] }
  }

  async createTruck(ctx: RequestContext, _data: CreateTruckRequest): Promise<Truck> {
    const { locationUuid, ...data } = _data
    if (locationUuid !== undefined) {
      const { id: locationId } = await this.repository.location.findByUid(ctx, locationUuid)
      data.locationId = locationId
    }

    const { id, locationId, ...resp } = await this.repository.truck.create(ctx, data, {
      location: { select: { uid: true } },
    })
    return { data: [resp] }
  }

  async updateTruck(ctx: RequestContext, uuid: string, _data: UpdateTruckRequest): Promise<Truck> {
    const existing = await this.repository.truck.findByUid(ctx, uuid)
    const { locationUuid, ...data } = _data
    if (locationUuid !== undefined) {
      const { id: locationId } = await this.repository.location.findByUid(ctx, locationUuid)
      data.locationId = locationId
    }
    const { id, locationId, ...resp } = await this.repository.truck.update(
      ctx,
      {
        ...existing,
        ...data,
      },
      { location: { select: { uid: true } } },
    )
    return { data: [resp] }
  }

  async deleteTruck(ctx: RequestContext, uuid: string): Promise<boolean> {
    const existing = await this.repository.truck.findByUid(ctx, uuid)
    return this.repository.truck.delete(ctx, existing.id).deletedAt !== null
  }
}
