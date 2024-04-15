import { Service } from '@app/server/services/service.js'
import { CreateTruckRequest, ListResponse, RequestContext, Truck, UpdateTruckRequest } from '@dtos/'

export default class TruckService extends Service {
  constructor() {
    super('TruckService')
  }

  async getTrucks(ctx: RequestContext): Promise<ListResponse<Truck>> {
    return {
      data: [],
      count: 0,
      hasMore: false,
    }
  }

  async getTruck(ctx: RequestContext, id: string): Promise<Truck> {
    return { data: true }
  }

  async createTruck(ctx: RequestContext, data: CreateTruckRequest): Promise<Truck> {
    return { data: true } as Truck
  }

  async updateTruck(ctx: RequestContext, data: UpdateTruckRequest): Promise<Truck> {
    return { data: true } as Truck
  }

  async deleteTruck(ctx: RequestContext, id: string): Promise<boolean> {
    return true
  }
}
