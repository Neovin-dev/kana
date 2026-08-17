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
  // We don't "do the joins beforehand." We define the relationship once, so TypeORM knows how to perform the join when you need it.
  @ManyToOne(() => Board, (board) => board.sections, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "boardId" })
  board!: Board;

  @OneToMany(() => Issue, (issue) => issue.section)
  issues!: Issue[];
}
