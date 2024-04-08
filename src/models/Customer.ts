import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'customer'
})
export class Customer extends Model<Customer> {
    @Column({ primaryKey: true, autoIncrement: true })
    cust_id!: number;

    @Column(DataType.STRING(20))
    cust_name!: string;

    @Column(DataType.STRING(30))
    cust_email!: string;

    @Column(DataType.STRING(15))
    cust_phone!: string;

    @Column(DataType.STRING(20))
    cust_password!: string;
}
