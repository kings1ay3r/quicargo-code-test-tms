import { Service } from '@app/server/services/service.js'
import { Prisma } from '@prisma/client'
import {
  CreateLocationRequest,
  ListResponse,
  Location,
  RequestContext,
  UpdateLocationRequest,
} from '@dtos/'

export default class LocationService extends Service {
  constructor() {
    super('LocationService')
  }

  //TODO: (SanityEnhancements) Implement filters, pagination, populate hasMore
  async getLocations(ctx: RequestContext): Promise<ListResponse<Location>> {
    return {
      data: (
        await this.repository.location.find(
          ctx,
          {},
          { trucksAtLocation: { select: { uid: true } } },
        )
      ).map(({ id, ...resp }) => resp) as Location[],
      count: await this.repository.location.count(),
      hasMore: false,
    }
  }

  async getLocation(ctx: RequestContext, id: string): Promise<Location> {
    const { id: _, ...resp } = await this.repository.location.findByUid(ctx, id, {
      trucksAtLocation: { select: { uid: true, name: true } },
    })
    return { data: [resp] }
  }

  async createLocation(
    ctx: RequestContext,
    data: CreateLocationRequest,
    relations: Prisma.LocationDefaultArgs['include'],
  ): Promise<Location> {
    const { id, ...resp } = await this.repository.location.create(ctx, data, relations)
    return { data: [resp] }
  }

  async updateLocation(
    ctx: RequestContext,
    uuid: string,
    data: UpdateLocationRequest,
  ): Promise<Location> {
    const existing = await this.repository.location.findByUid(ctx, uuid)
    const { id, ...resp } = this.repository.location.update(ctx, { ...existing, ...data })
    return { data: [resp] }
  }

  async deleteLocation(ctx: RequestContext, uuid: string): Promise<boolean> {
    const existing = await this.repository.location.findByUid(ctx, uuid)
    return (await this.repository.location.delete(ctx, existing.id)).deleteAt !== null
  }
}
