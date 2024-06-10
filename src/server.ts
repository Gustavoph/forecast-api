import './util/module-alias'

import { Server } from '@overnightjs/core'
import express, { type Application } from 'express'
import { ForecastController } from './controllers/forecast'

export class SetupServer extends Server {
  constructor(private readonly port = 3000) {
    super()
  }

  public init() {
    this.setupExpress()
    this.setupControllers()
  }

  private setupExpress() {
    this.app.use(express.json())
  }

  private setupControllers() {
    const forecastController = new ForecastController()
    this.addControllers(forecastController)
  }

  public getApp(): Application {
    return this.app
  }
}
