import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from './Customer';
import { Room } from './Room';

@Table({
    tableName: 'reservation'
})
export class Reservation extends Model<Reservation> {
    @Column({ primaryKey: true, autoIncrement: true })
    r_id!: number;

    @ForeignKey(() => Customer)
    @Column
    cust_id!: number;

    @ForeignKey(() => Room)
    @Column
    room_id!: number;

    @Column(DataType.DATE)
    booking_date!: Date;

    @Column(DataType.DATE)
    start_date!: Date;

    @Column(DataType.DATE)
    end_date!: Date;

    @Column(DataType.FLOAT)
    amount!: number;

    @BelongsTo(() => Customer)
    customer!: Customer;

    @BelongsTo(() => Room)
    room!: Room;
}