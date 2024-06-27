import mongoose, { Document, Schema } from 'mongoose'

export enum BeachPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N',
}

export interface Beach {
  _id?: string
  name: string
  position: BeachPosition
  lat: number
  lng: number
}

export interface ExistingBeach extends Omit<Beach, '_id'>, Document {
  id: string
}

const schema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      },
    },
  }
)

export const Beach = mongoose.model<Beach>('Beach', schema)
