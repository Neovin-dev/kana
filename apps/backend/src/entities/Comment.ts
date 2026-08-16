import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Issue } from "./Issue";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "integer" })
  userId!: number;

  @Column({ type: "integer" })
  issueId!: number;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Issue, (issue) => issue.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "issueId" })
  issue!: Issue;
}
