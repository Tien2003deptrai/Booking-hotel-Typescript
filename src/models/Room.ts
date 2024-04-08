import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { RoomType } from './RoomType';
import { Facilities } from './Facilities';
import { RoomStatus } from './RoomStatus';
import { Hotel } from './Hotel';

@Table({
    tableName: 'room'
})
export class Room extends Model<Room> {
    @Column({ primaryKey: true, autoIncrement: true })
    room_id!: number;

    @ForeignKey(() => RoomType)
    @Column
    type_id!: number;

    @ForeignKey(() => Facilities)
    @Column
    facility_id!: number;

    @ForeignKey(() => RoomStatus)
    @Column
    status_id!: number;

    @ForeignKey(() => Hotel)
    @Column
    hotel_id!: number;

    @Column(DataType.STRING(3000))
    images!: string;

    @BelongsTo(() => RoomType)
    roomType!: RoomType;

    @BelongsTo(() => Facilities)
    facilities!: Facilities;

    @BelongsTo(() => RoomStatus)
    roomStatus!: RoomStatus;

    @BelongsTo(() => Hotel)
    hotel!: Hotel;
}
