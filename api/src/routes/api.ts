import express, { Express, Request, Response, Router } from 'express';

export const apiRouter = Router()

apiRouter.get('/config', (req: Request, res: Response) => {
  res.json({
    contractAddress: process.env.CONTRACT_ADDRESS,
  })
})
