import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Membership } from "./Membership";
import { IssueMapping } from "./IssueMapping";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  email!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  passwordHash!: string;

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships!: Membership[];

  @OneToMany(() => IssueMapping, (mapping) => mapping.user)
  issueMappings!: IssueMapping[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];
}
