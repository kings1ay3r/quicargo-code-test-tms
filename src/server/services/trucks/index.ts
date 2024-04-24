import { Service } from '@app/server/services/service'
import {
  CreateTruckRequest,
  ListResponse,
  RequestContext,
  Truck,
  UpdateTruckRequest,
} from '@app/dtos/'

type ResponseItem = Omit<Truck, 'id' | 'locationId'>
type Response = Promise<{ data: ResponseItem[] }>

export default class TruckService extends Service {
  constructor() {
    super('TruckService')
  }

  // TODO: (SanityEnhancements) Implement filters, pagination, populate hasMore
  async getTrucks(ctx: RequestContext): Promise<ListResponse<ResponseItem>> {
    return {
      data: (
        await this.repository.truck.find(ctx, {}, { location: { select: { uid: true } } })
      ).map(({ id, locationId, ...resp }: Truck) => resp),
      count: await this.repository.truck.count(),
      hasMore: false,
    }
  }

  async getTruck(ctx: RequestContext, uuid: string): Response {
    const { id, locationId, ...resp } = await this.repository.truck.findByUid(ctx, uuid, {
      location: { select: { uid: true } },
    })
    return { data: [resp] }
  }

  async createTruck(ctx: RequestContext, _data: CreateTruckRequest): Response {
    const { locationUuid, ...data } = _data
    const location =
      locationUuid !== undefined
        ? await this.repository.location.findByUid(ctx, locationUuid)
        : undefined

    const locationPayload = location !== undefined ? { locationId: location.id } : {}

    const { id, locationId, ...resp } = await this.repository.truck.create(
      ctx,
      { ...data, ...locationPayload },
      {
        location: { select: { uid: true } },
      },
    )
    return { data: [resp] }
  }

  async updateTruck(ctx: RequestContext, uuid: string, _data: UpdateTruckRequest): Response {
    const existing = await this.repository.truck.findByUid(ctx, uuid)
    const { locationUuid, ...data } = _data
    const payload = { ...existing, ...data }
    if (locationUuid !== undefined) {
      const { id: locationId } = await this.repository.location.findByUid(ctx, locationUuid)
      payload.locationId = locationId
    }
    const { id, locationId, ...resp } = await this.repository.truck.update(ctx, payload, {
      location: { select: { uid: true } },
    })
    return { data: [resp] }
  }

  async deleteTruck(ctx: RequestContext, uuid: string): Promise<boolean> {
    const existing = await this.repository.truck.findByUid(ctx, uuid)
    return (await this.repository.truck.delete(ctx, existing.id)).deletedAt !== null
  }
}
