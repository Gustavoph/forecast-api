import './util/module-alias'
import { Server } from '@overnightjs/core'
import { Application, json } from 'express'
import { ForecastController } from '@src/controllers/forecast'
import * as database from '@src/database'
import { BeachesController } from '@src/controllers/beaches'

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super()
  }

  public async init(): Promise<void> {
    this.setupExpress()
    this.setupControllers()
    await this.databaseSetup()
  }

  private setupExpress(): void {
    this.app.use(json())
    this.setupControllers()
  }

  private setupControllers(): void {
    const forecastController = new ForecastController()
    const beachesController = new BeachesController()
    this.addControllers([forecastController, beachesController])
  }

  public getApp(): Application {
    return this.app
  }

  private async databaseSetup(): Promise<void> {
    await database.connect()
  }

  public async close(): Promise<void> {
    await database.close()
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening at port:', this.port)
    })
  }
}
