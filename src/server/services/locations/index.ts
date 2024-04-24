import {
  CreateLocationRequest,
  ListResponse,
  Location,
  RequestContext,
  UpdateLocationRequest,
} from '@app/dtos/'
import repository, { Repository } from '@app/server/repository/prismaClient'
import { Service } from '@app/server/services/service'

class LocationService extends Service {
  repository: Repository = repository

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
      ).map(({ id, ...resp }: { id: number }) => resp) as Location[],
      count: await this.repository.location.count(),
      hasMore: false,
    }
  }

  async getLocation(ctx: RequestContext, id: string): Promise<{ data: Omit<Location, 'id'>[] }> {
    const { id: _, ...resp } = await this.repository.location.findByUid(ctx, id, {
      trucksAtLocation: { select: { uid: true, name: true } },
    })
    return { data: [resp] }
  }

  async createLocation(
    ctx: RequestContext,
    data: CreateLocationRequest,
  ): Promise<{ data: Omit<Location, 'id'>[] }> {
    const { id, ...resp } = await this.repository.location.create(ctx, data)
    return { data: [resp] }
  }

  async updateLocation(
    ctx: RequestContext,
    uuid: string,
    data: UpdateLocationRequest,
  ): Promise<{ data: Omit<Location, 'id'>[] }> {
    const existing = await this.repository.location.findByUid(ctx, uuid)
    const { id, ...resp } = await this.repository.location.update(ctx, { ...existing, ...data })
    return { data: [resp] }
  }

  async deleteLocation(ctx: RequestContext, uuid: string): Promise<boolean> {
    const existing = await this.repository.location.findByUid(ctx, uuid)
    return (await this.repository.location.delete(ctx, existing.id)).deletedAt !== null
  }
}

export default LocationService
