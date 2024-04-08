import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'room_type'
})
export class RoomType extends Model<RoomType> {
    @Column({ primaryKey: true, autoIncrement: true })
    type_id!: number;

    @Column(DataType.STRING(10))
    type_name!: string;

    @Column(DataType.FLOAT)
    cost!: number;
}