import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "./User";
import { Issue } from "./Issue";

@Entity()
@Unique(["userId", "issueId"])
export class IssueMapping {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "integer" })
  userId!: number;

  @Column({ type: "integer" })
  issueId!: number;

  @ManyToOne(() => User, (user) => user.issueMappings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Issue, (issue) => issue.assignees, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "issueId" })
  issue!: Issue;
}
