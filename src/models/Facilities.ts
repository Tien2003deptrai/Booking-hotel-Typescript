import { Table, Model, Column, DataType } from 'sequelize-typescript';


@Table({
    tableName: 'facilities'
})
export class Facilities extends Model<Facilities> {
    @Column({ primaryKey: true, autoIncrement: true })
    facility_id!: number;

    @Column(DataType.STRING(20))
    facility!: string;

    @Column(DataType.FLOAT)
    facility_cost!: number;
}