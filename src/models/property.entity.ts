import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from './location.entity';

@Entity()
export class Property {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Location, location => location.properties)
  location: Location;

  @Column({ type: 'int', default: 0 })
  bathroomNumber: number;

  @Column({ type: 'int', default: 0 })
  bedroomNumber: number;

  @Column({ type: 'int', default: 0 })
  carSpaces: number;

  @Column({ type: 'int', default: 0 })
  comission: number;

  @Column({ type: 'int', default: 0 })
  constructionYear: number;

  @Column({ type: 'text', nullable: true })
  dataSourcesName: string;

  @Column({ type: 'int', default: 0 })
  imgHeight: number;

  @Column({ type: 'text', nullable: true })
  imgUrl: string;

  @Column({ type: 'int', default: 0 })
  imgWidth: number;

  @Column({ type: 'text', nullable: true })
  keywords: string;

  @Column({ type: 'float', nullable: false })
  latitude: number;

  @Column({ type: 'text', nullable: true })
  listerName: string;

  @Column({ type: 'text', nullable: true })
  listerUrl: string;

  @Column({ type: 'text', nullable: true })
  listingType: string;

  @Column({ type: 'int', default: 0 })
  locationAccuracy: number;

  @Column({ type: 'float', nullable: false })
  longitude: number;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ type: 'text', nullable: true })
  priceCurrency: string;

  @Column({ type: 'text', nullable: true })
  priceFormatted: string;

  @Column({ type: 'int', default: 0 })
  priceHigh: number;

  @Column({ type: 'int', default: 0 })
  priceLow: number;

  @Column({ type: 'text', nullable: true })
  priceType: string;

  @Column({ type: 'text', nullable: true })
  propertyType: string;

  @Column({ type: 'int', default: 0 })
  size: number;

  @Column({ type: 'text', nullable: true })
  sizeType: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'int', default: 0 })
  thumbHeight: number;

  @Column({ type: 'text', nullable: true })
  thumbUrl: string;

  @Column({ type: 'int', default: 0 })
  thumbWidth: number;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'int', default: 0 })
  updatedInDays: number;

  @Column({ type: 'text', nullable: true })
  updatedInDaysFormatted: string;
}
