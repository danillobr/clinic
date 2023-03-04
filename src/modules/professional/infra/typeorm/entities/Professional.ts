import { v4 as uuidV4 } from "uuid";
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity("professionals")
class Professional {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  fone: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Professional };
