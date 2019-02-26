import * as Koa from 'koa';
import { getRepository, Like, Between, Repository } from 'typeorm';
import * as HttpStatus from 'http-status-codes';
import { Location, Property } from '../models';
import { BadRequestError, LocationsNotFoundError, PropertiesNotFoundError } from '../errors';

export const searchLocationsByName = async (ctx: Koa.Context) => {
  if (ctx.query.placeName) {
    const { placeName } = ctx.query;
    const locationRepo: Repository<Location> = getRepository(Location);
    const locations = await locationRepo.find(
      {
        placeName: Like(`%${placeName}%`),
      },
    );
    if (!locations.length) {
      ctx.status = HttpStatus.NOT_FOUND;
      ctx.body = new LocationsNotFoundError();
      return;
    }
    ctx.body = locations;
    ctx.status = HttpStatus.OK;
  } else {
    ctx.status = HttpStatus.BAD_REQUEST;
    ctx.body = new BadRequestError();
  }
};

export const searchLocationByCoordinates = async (ctx: Koa.Context) => {
  if (ctx.query.lat && ctx.query.long) {
    const { lat, long } = ctx.query;
    const locationRepo: Repository<Location> = getRepository(Location);
    const locations = await locationRepo.find(
      {
        centerLat: Between(lat - 0.01, lat + 0.01),
        centerLong: Between(long - 0.01, long + 0.01),
      },
    );
    if (!locations.length) {
      ctx.status = HttpStatus.NOT_FOUND;
      ctx.body = new LocationsNotFoundError();
      return;
    }
    ctx.body = locations;
    ctx.status = HttpStatus.OK;
  } else {
    ctx.status = HttpStatus.BAD_REQUEST;
    ctx.body = new BadRequestError();
  }
};

export const getPropertiesByLocation = async (ctx: Koa.Context) => {
  const { page } = ctx.query;
  const propertyRepo: Repository<Property> = getRepository(Property);
  const locationRepo: Repository<Location> = getRepository(Location);
  const location = await locationRepo.findOne({ placeName: ctx.params.placeName });
  const [result, total] = await propertyRepo.findAndCount(
    {
      where: { location },
      skip: 10 * (page - 1),
      take: 10,
    },
  );
  if (!result.length) {
    ctx.status = HttpStatus.NOT_FOUND;
    ctx.body = new PropertiesNotFoundError();
    return;
  }
  ctx.body = {
    page,
    properties: result,
    totalResults: total,
  };
  ctx.status = HttpStatus.OK;
};

export const getPropertyById = async (ctx: Koa.Context) => {
  const propertyRepo: Repository<Property> = getRepository(Property);
  const locationRepo: Repository<Location> = getRepository(Location);
  const location = await locationRepo.findOne({ placeName: ctx.params.placeName });
  const property = await propertyRepo.findOne({ location, id: ctx.params.id });
  if (!property) {
    ctx.status = HttpStatus.NOT_FOUND;
    ctx.body = new PropertiesNotFoundError();
    return;
  }
  ctx.body = property;
  ctx.status = HttpStatus.OK;
};
