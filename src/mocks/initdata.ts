import * as fs from 'fs';
import * as path from 'path';
import { Location, Property } from '../models';
import { getRepository } from 'typeorm';

export const initData = async () => {

  const rawData = fs.readFileSync(path.join(__dirname, 'locations.json'));
  const locations = JSON.parse(rawData.toString());
  const propertiesRepository = getRepository(Property);
  const propertiesCount = await propertiesRepository.count() > 0;
  const locationRepository = getRepository(Location);
  const locationsCount = await locationRepository.count() > 0;
  if (propertiesCount && locationsCount) {
    console.log('Database exists');
    return;
  }
  const locPromises = locations.map((location: any) => {
    const newLocation = locationRepository.create(
      {
        centerLat: location.center_lat,
        centerLong: location.center_long,
        longTitle: location.long_title,
        placeName: location.place_name,
        title: location.title,
      },
    );
    return locationRepository.save(newLocation);
  });
  await Promise.all(locPromises);
  console.log('Locations from location.json added');
  await initProperties('albury_guildford');
  await initProperties('albury_newbury');
  await initProperties('albury_ware');
  await initProperties('shifnal');
};

const initProperties = async (fileName: string) => {
  const rawData = fs.readFileSync(path.join(__dirname, `${fileName}.json`));
  const properties = JSON.parse(rawData.toString());
  const propertiesRepository = getRepository(Property);
  const locationRepository = getRepository(Location);

  const location = await locationRepository
    .createQueryBuilder('location')
    .where('location.placeName = :placeName', { placeName: fileName })
    .getOne();

  const propPromises = properties.map((property: any) => {
    const newProperty = propertiesRepository.create(
      {
        location,
        bathroomNumber: +property.bathroom_number,
        bedroomNumber: +property.bedroom_number,
        carSpaces: +property.car_spaces,
        comission: property.comission,
        constructionYear: property.construction_year,
        dataSourcesName: property.datasource_name,
        imgHeight: property.img_height,
        imgUrl: property.img_url,
        imgWidth: property.img_width,
        keywords: property.keywords,
        latitude: property.latitude,
        listerName: property.lister_name,
        listerUrl: property.lister_url,
        listingType: property.listing_type,
        locationAccuracy: property.location_accuracy,
        longitude: property.longitude,
        price: property.price,
        priceCurrency: property.price_currency,
        priceFormatted: property.price_formatted,
        priceHigh: property.price_high,
        priceLow: property.price_low,
        priceType: property.price_type,
        propertyType: property.property_type,
        size: property.size,
        sizeType: property.size_type,
        summary: property.summary,
        thumbHeight: property.thumb_height,
        thumbUrl: property.thumb_url,
        thumbWidth: property.thumb_width,
        title: property.title,
        updatedInDays: property.updated_in_days,
        updatedInDaysFormatted: property.updated_in_days_formatted,
      },
    );
    return propertiesRepository.save(newProperty);
  });

  await Promise.all(propPromises);
  console.log(`Properties from ${fileName}.json added`);
};
