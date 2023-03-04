import { v4 as uuidV4 } from "uuid";
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  BASIC = "basic",
}

@Entity("attendant")
class Attendant {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.BASIC,
  })
  role: UserRole;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Attendant };
