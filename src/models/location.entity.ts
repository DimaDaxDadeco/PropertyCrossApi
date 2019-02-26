import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Property } from './property.entity';

@Entity()
export class Location {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', default: 0 })
  centerLat: number;

  @Column({ type: 'float', default: 0 })
  centerLong: number;

  @Column({ type: 'text', nullable: true })
  longTitle: string;

  @Column({ type: 'text', unique: true })
  placeName: string;

  @Column({ type: 'text', nullable: true })
  title: string;

  @OneToMany(type => Property, property => property.location)
  properties: Property[];
}
