import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class Link {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  url: string

  @Column({
    unique: true
  })
  slug: string

  @Column()
  createdAt: Date
}