import { RequestContext } from '@dtos/index.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Custom repository methods
const location = {
  async delete(ctx: RequestContext, id) {
    return prisma.location.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
        deletedBy: ctx.accessor.uid,
      },
    })
  },

  async findByUid(ctx: RequestContext, uid) {
    return prisma.location.findFirst({
      where: { uid, deletedAt: null },
    })
  },

  async find(ctx: RequestContext, filters, relations) {
    filters = filters ? { ...filters, deletedAt: null } : { deletedAt: null }
    return prisma.location.findMany({
      where: filters,
      include: relations,
    })
  },

  async create(ctx: RequestContext, data) {
    return prisma.location.create({
      data: {
        name: 'WarehOuse 1',
        lattitude: 123.456789,
        longitude: 98.7654321,
        createdBy: 'sdfds',
      },
    })
  },

  async update(ctx: RequestContext, data) {
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
  },
}

const truck = {
  async delete(ctx: RequestContext, id) {
    return prisma.truck.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
        deletedBy: ctx.accessor.uid,
      },
    })
  },

  async findByUid(ctx: RequestContext, uid) {
    return prisma.truck.findFirst({
      where: { uid, deletedAt: null },
    })
  },

  async find(ctx: RequestContext, filters, relations) {
    filters = filters ? { ...filters, deletedAt: null } : { deletedAt: null }
    return prisma.truck.findMany({
      where: filters,
      include: relations,
    })
  },

  async create(ctx: RequestContext, data) {
    return prisma.truck.create({
      data: {
        ...data,
        createdBy: ctx.accessor.uid,
      },
    })
  },

  async update(ctx: RequestContext, data) {
    if (!data.id) {
      throw new Error('ID Missing in update data')
    }
    return prisma.truck.update({
      where: { id: data.id, deletedAt: null },
      data: {
        ...data,
        createdBy: ctx.accessor.uid,
      },
    })
  },
}

module.exports = {
  location,
  truck,
}
