import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Hotel } from './Hotel';

@Table({
    tableName: 'admin'
})
export class Admin extends Model<Admin> {
    @Column({ primaryKey: true, autoIncrement: true })
    admin_id!: number;

    @Column(DataType.STRING(20))
    admin_name!: string;

    @Column(DataType.STRING(20))
    admin_email!: string;

    @Column(DataType.STRING(255))
    admin_password!: string;

    @ForeignKey(() => Hotel)
    @Column
    hotel_id!: number;

    @BelongsTo(() => Hotel)
    hotel!: Hotel;

}
