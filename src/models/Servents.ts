import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Hotel } from './Hotel';

@Table({
    tableName: 'servents'
})
export class Servents extends Model<Servents> {
    @Column({ primaryKey: true, autoIncrement: true })
    s_id!: number;

    @ForeignKey(() => Hotel)
    @Column
    hotel_id!: number;

    @Column(DataType.STRING(20))
    s_name!: string;

    @Column(DataType.INTEGER)
    s_phone!: number;

    @Column(DataType.STRING(20))
    s_adhar!: string;

    @Column(DataType.INTEGER)
    s_age!: number;

    @Column(DataType.FLOAT)
    s_salary!: number;

    @BelongsTo(() => Hotel)
    hotel!: Hotel;
}