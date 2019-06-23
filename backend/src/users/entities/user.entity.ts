import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public nick!: string;

    @Column()
    public email!: string;
}
