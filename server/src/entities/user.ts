import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    token!: string;

    @Column()
    password_digest!: string;

    @CreateDateColumn()
    created_at!: Date;
}
