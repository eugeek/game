import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Unique,
    BaseEntity
} from 'typeorm';

@Entity('users')
@Unique(["name", "email"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    token!: string;

    @Column()
    password_digest!: string;

    @CreateDateColumn()
    created_at!: Date;
}
