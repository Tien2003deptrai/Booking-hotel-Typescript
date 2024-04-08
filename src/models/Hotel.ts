import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'hotel'
})
export class Hotel extends Model<Hotel> {
    @Column({ primaryKey: true, autoIncrement: true })
    hotel_id!: number;

    @Column(DataType.STRING(45))
    hotel_name!: string;

    @Column(DataType.STRING(130))
    hotel_addr!: string;

    @Column(DataType.STRING(30))
    hotel_email!: string;

    @Column(DataType.STRING(15))
    hotel_phone!: string;
}
