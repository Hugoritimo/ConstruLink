import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileName: string;

    @Column()
    sharepointUrl: string;

    @Column()
    uploadDate: Date;
}
