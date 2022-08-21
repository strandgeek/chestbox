import { Request, Response, Router } from 'express';
import proxy from 'express-http-proxy'
import { prisma } from '../db';

export const metadataRouter = Router()

const propertiesToAlgoStandard = (properties: any) => {
  if (!properties || !properties.fields || properties.fields.length === 0) {
    return {}
  }
  const props = {} as { [name: string]: any }
  properties.fields.forEach((p: any) => {
    props[p.name] = p.type === 'number' ? parseFloat(p.value) : p.value
  })
  return props
}



metadataRouter.get('/:assetId', async (req: Request, res: Response) => {
  const asset = await prisma.projectAsset.findUnique({
    where: {
      id: req.params.assetId,
    }
  })
  if (!asset) {
    return res.status(404).json({
      error: 'Not Found',
    })
  }
  res.json({
    name: asset.name,
    description: asset.description,
    image: asset.imageUrl,
    properties: propertiesToAlgoStandard(asset.properties),
  })
})

metadataRouter.use('/:assetId/image', async (req: Request, res: Response) => {
  const asset = await prisma.projectAsset.findUnique({
    where: {
      id: req.params.assetId,
    }
  })
  if (!asset) {
    return res.status(404).json({
      error: 'Not Found',
    })
  }
  return proxy(asset.imageUrl, {
    proxyReqPathResolver(req) {
      const {
        pathname
      } = new URL(asset.imageUrl)
        return pathname
    },
    preserveHostHdr: false,
  })(req, res, () => null)
})
