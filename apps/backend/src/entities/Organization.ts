import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./Board";
import { Membership } from "./Membership";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @OneToMany(() => Membership, (membership) => membership.organization)
  memberships!: Membership[];

  @OneToMany(() => Board, (board) => board.organization)
  boards!: Board[];
}
