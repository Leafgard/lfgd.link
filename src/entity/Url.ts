import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { IsDate, IsUrl, Length } from 'class-validator'

@Entity()
@Unique(['slug'])
export class Url {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsUrl()
  @Length(1, 255)
  url: string

  @Column()
  @Length(6, 16)
  slug: string

  @Column()
  @IsDate()
  createdAt: Date

}
