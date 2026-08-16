import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "./Board";
import { IssueMapping } from "./IssueMapping";
import { Section } from "./Section";
import { Comment } from "./Comment";

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "integer" })
  boardId!: number;

  @Column({ type: "integer" })
  sectionId!: number;

  @ManyToOne(() => Board, (board) => board.issues, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "boardId" })
  board!: Board;

  @ManyToOne(() => Section, (section) => section.issues, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "sectionId" })
  section!: Section;

  @OneToMany(() => IssueMapping, (mapping) => mapping.issue)
  assignees!: IssueMapping[];

  @OneToMany(() => Comment, (comment) => comment.issue)
  comments!: Comment[];
}
