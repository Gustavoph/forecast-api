import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { Beach } from '@src/models/beach'
import { Forecast } from '@src/services/forecast'

const forecast = new Forecast()

@Controller('forecasts')
export class ForecastController {
  @Get('')
  public async getForecastForLoggedUser(_: Request, res: Response) {
    try {
      const beaches = await Beach.find({})
      const forecastData = await forecast.processForecastForBeaches(beaches)
      res.status(200).send(forecastData)
    } catch (err) {
      res.status(500).send({ error: 'Something went wrong!' })
    }
  }
}
