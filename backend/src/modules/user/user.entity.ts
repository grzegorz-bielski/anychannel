import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public firstName!: string;

    @Column({ nullable: true })
    public type!: string;

    @Column({ default: false })
    public isCool!: boolean;

    @Column()
    public lastName!: string;

    @Column()
    public age!: number;
}
