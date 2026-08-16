import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "./Board";
import { Issue } from "./Issue";

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "integer" })
  boardId!: number;

  @ManyToOne(() => Board, (board) => board.sections, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "boardId" })
  board!: Board;

  @OneToMany(() => Issue, (issue) => issue.section)
  issues!: Issue[];
}
