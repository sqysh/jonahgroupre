'use server'

import { LogAction } from '@/app/lib/types/log.types'
import { prisma } from '@/prisma/client'
import { Prisma } from '@prisma/client'

type LogMetadata = Record<string, string | number | boolean | null | undefined>

interface CreateLogParams {
  action: LogAction
  message: string
  entity?: string
  entityId?: string
  metadata?: LogMetadata | null
  ipAddress?: string
  userAgent?: string
}

export async function createLog({
  action,
  message,
  entity,
  entityId,
  metadata,
  ipAddress,
  userAgent
}: CreateLogParams): Promise<void> {
  try {
    await prisma.log.create({
      data: {
        action,
        message,
        entity: entity ?? null,
        entityId: entityId ?? null,
        metadata: metadata ?? Prisma.JsonNull,
        ipAddress: ipAddress ?? null,
        userAgent: userAgent ?? null
      }
    })
  } catch {
    // Logs should never break the main flow
  }
}
