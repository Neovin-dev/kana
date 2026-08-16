import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Organization } from "./Organization";
import { Section } from "./Section";
import { Issue } from "./Issue";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "integer" })
  organizationId!: number;

  // One board can be owned by one organization. And This will have static sectiosn for now.
  @ManyToOne(() => Organization, (organization) => organization.boards, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "organizationId" })
  organization!: Organization;

  @OneToMany(() => Issue, (issue) => issue.board)
  issues!: Issue[];

  @OneToMany(() => Section, (section) => section.board)
  sections!: Section[];
}
