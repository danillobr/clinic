import { v4 as uuidV4 } from "uuid";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("services")
class Service {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column()
  time: number;

  @Column()
  percentage: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Service };
