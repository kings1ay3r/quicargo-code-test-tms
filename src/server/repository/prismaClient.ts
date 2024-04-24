import { Prisma, PrismaClient } from '@prisma/client'

import {
  CreateLocationRequest,
  RequestContext,
  UpdateLocationRequest,
  UpdateTruckRequest,
} from '@app/dtos'

type TruckCreateInput = Prisma.TruckCreateInput
type TruckData = Omit<TruckCreateInput, 'createdBy'>

type LocationRelations = Prisma.LocationDefaultArgs['include']
type TruckRelations = Prisma.TruckDefaultArgs['include']

type TruckFilters = Prisma.TruckWhereInput
type LocationFilters = Prisma.LocationWhereInput

const prisma = new PrismaClient()

class Location {
  async delete(ctx: RequestContext, id: number) {
    const trucksAtLocation = await prisma.truck.count({
      where: {
        location: {
          id,
        },
        deletedAt: null,
      },
    })
    if (trucksAtLocation > 0) {
      throw new Error('unable to delete location with trucks assigned')
    }
    return prisma.location.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
        deletedBy: ctx.accessor.uid,
      },
    })
  }

  async findByUid(ctx: RequestContext, uid: string, relations: LocationRelations = {}) {
    const data = await prisma.location.findFirstOrThrow({
      where: { uid, deletedAt: null },
      include: relations,
    })
    return data
  }

  async find(ctx: RequestContext, filters: LocationFilters, relations: LocationRelations = {}) {
    filters = filters ? { ...filters, deletedAt: null } : { deletedAt: null }
    return prisma.location.findMany({
      where: filters,
      include: relations,
    })
  }

  async create(
    ctx: RequestContext,
    data: CreateLocationRequest,
    relations: LocationRelations = {},
  ) {
    return prisma.location.create({
      data: {
        ...data,
        createdBy: ctx.accessor?.uid,
      } as Prisma.LocationCreateInput,
      include: relations,
    })
  }

  async update(ctx: RequestContext, data: UpdateLocationRequest & { id: number }) {
    if (!data.id) {
      throw new Error('ID Missing in update data')
    }
    return prisma.location.update({
      where: { id: data.id, deletedAt: null },
      data: {
        ...data,
        createdBy: ctx.accessor.uid,
      },
    })
  }

  async count() {
    return prisma.location.count({ where: { deletedAt: null } })
  }
}

class Truck {
  async delete(ctx: RequestContext, id: number) {
    return prisma.truck.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
        deletedBy: ctx.accessor.uid,
      },
    })
  }

  async findByUid(ctx: RequestContext, uid: string, relations: TruckRelations = {}) {
    const data = await prisma.truck.findFirstOrThrow({
      where: { uid, deletedAt: null },
      include: relations,
    })
    return data
  }

  async find(ctx: RequestContext, filters: TruckFilters, relations: TruckRelations = {}) {
    filters = filters ? { ...filters, deletedAt: null } : { deletedAt: null }
    return prisma.truck.findMany({
      where: filters,
      include: relations,
    })
  }

  async create(
    ctx: RequestContext,
    data: Omit<Prisma.TruckCreateInput, 'createdBy' | 'location'>,
    relations: TruckRelations = {},
  ) {
    return prisma.truck.create({
      data: {
        ...data,
        createdBy: ctx.accessor.uid,
      } as Prisma.TruckCreateInput,
      include: relations,
    })
  }

  async update(
    ctx: RequestContext,
    data: UpdateTruckRequest & { id: number },
    relations: TruckRelations = {},
  ) {
    if (!data.id) {
      throw new Error('ID Missing in update data')
    }
    const { id, ...payload } = data
    return prisma.truck.update({
      where: { id, deletedAt: null },
      data: {
        ...payload,
        createdBy: ctx.accessor.uid,
      },
      include: relations,
    })
  }

  async count() {
    return prisma.truck.count({ where: { deletedAt: null } })
  }
}

export class Repository {
  private static instance: Repository
  truck: Truck = new Truck()
  location: Location = new Location()

  private constructor() {}

  public static getInstance(): Repository {
    if (!Repository.instance) {
      Repository.instance = new Repository()
    }

    return Repository.instance
  }
}

export default Repository.getInstance()
