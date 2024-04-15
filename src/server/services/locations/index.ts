import { Service } from '@app/server/services/service.js'
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

  async getLocations(ctx: RequestContext): Promise<ListResponse<Location>> {
    return {
      data: [],
      count: 0,
      hasMore: false,
    }
  }

  async getLocation(ctx: RequestContext, id: string): Promise<Location> {
    return { data: true }
  }

  async createLocation(ctx: RequestContext, data: CreateLocationRequest): Promise<Location> {
    return { data: true } as Location
  }

  async updateLocation(ctx: RequestContext, data: UpdateLocationRequest): Promise<Location> {
    return { data: true } as Location
  }

  async deleteLocation(ctx: RequestContext, id: string): Promise<boolean> {
    return true
  }
}
