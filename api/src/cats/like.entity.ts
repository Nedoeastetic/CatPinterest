import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number | undefined;  // Явно указываем возможную undefined

  @Column()
  cat_id!: string;  // Definite assignment assertion

  @Column({ 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false 
  })
  created_at!: Date;
}