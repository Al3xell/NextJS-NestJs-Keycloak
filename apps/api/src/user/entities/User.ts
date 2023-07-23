import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "USER" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    phone: string;
}