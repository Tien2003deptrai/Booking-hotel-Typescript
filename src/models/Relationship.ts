import { Admin } from "./Admin";
import { Customer } from "./Customer";
import { Facilities } from "./Facilities";
import { Hotel } from "./Hotel";
import { Reservation } from "./Reservation";
import { Room } from "./Room";
import { RoomStatus } from "./RoomStatus";
import { RoomType } from "./RoomType";
import { Servents } from "./Servents";

// Relationships
Admin.belongsTo(Hotel, { foreignKey: 'hotel_id' });
Customer.hasMany(Reservation, { foreignKey: 'cust_id' });
Reservation.belongsTo(Customer, { foreignKey: 'cust_id' });
Reservation.belongsTo(Room, { foreignKey: 'room_id' });
Room.belongsTo(Hotel, { foreignKey: 'hotel_id' });
Room.belongsTo(RoomType, { foreignKey: 'type_id' });
Room.belongsTo(Facilities, { foreignKey: 'facility_id' });
Room.belongsTo(RoomStatus, { foreignKey: 'status_id' });
Servents.belongsTo(Hotel, { foreignKey: 'hotel_id' });
