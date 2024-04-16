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

  async findByUid(ctx: RequestContext, uid: string, relations) {
    const data = await prisma.location.findFirstOrThrow({
      where: { uid, deletedAt: null },
      include: relations,
    })
    return data
  },

  async find(ctx: RequestContext, filters, relations) {
    filters = filters ? { ...filters, deletedAt: null } : { deletedAt: null }
    return prisma.location.findMany({
      where: filters,
      include: relations,
    })
  },

  async create(ctx: RequestContext, data, relations) {
    return prisma.location.create({
      data: {
        ...data,
        createdBy: ctx.accessor?.uid,
      },
      include: relations,
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

  async count() {
    return prisma.location.count({ where: { deletedAt: null } })
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

  async findByUid(ctx: RequestContext, uid: string, relations) {
    const data = await prisma.truck.findFirstOrThrow({
      where: { uid, deletedAt: null },
      include: relations,
    })
    return data
  },

  async find(ctx: RequestContext, filters, relations) {
    filters = filters ? { ...filters, deletedAt: null } : { deletedAt: null }
    return prisma.truck.findMany({
      where: filters,
      include: relations,
    })
  },

  async create(ctx: RequestContext, data, relations) {
    return prisma.truck.create({
      data: {
        ...data,
        createdBy: ctx.accessor.uid,
      },
      include: relations,
    })
  },

  async update(ctx: RequestContext, data, relations) {
    if (!data.id) {
      throw new Error('ID Missing in update data')
    }
    return prisma.truck.update({
      where: { id: data.id, deletedAt: null },
      data: {
        ...data,
        createdBy: ctx.accessor.uid,
      },
      include: relations,
    })
  },
  async count() {
    return prisma.truck.count({ where: { deletedAt: null } })
  },
}

module.exports = {
  location,
  truck,
}
