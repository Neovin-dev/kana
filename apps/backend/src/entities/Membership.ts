import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "./User";
import { Organization } from "./Organization";

export enum MembershipRole {
  MEMBER = "member",
  ADMIN = "admin",
}

@Entity()
// to avoid the duplicate of the userID and organisationID pairs
@Unique(["userId", "organizationId"])
export class Membership {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "integer" })
  userId!: number;

  @Column({ type: "integer" })
  organizationId!: number;

  @Column({
    type: "enum",
    enum: MembershipRole,
    default: MembershipRole.MEMBER,
  })
  role!: MembershipRole;

  @ManyToOne(() => User, (user) => user.memberships, {
    onDelete: "CASCADE",
  })
  //   We are joining the table so we can establish what table has relationship with with table in the column
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Organization, (organization) => organization.memberships, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "organizationId" })
  organization!: Organization;
}
