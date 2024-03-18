export class CreateBasketDto {
    menu:number;
    menuPrice:number;
    total_amount:number;
    userid:number;
}
 /*id             Int @id @default(autoincrement())
  total_amount Int //tárolt eljárás

  menu Menu[]
  user User @relation(fields: [userId],references: [id])
  userId Int @unique
  */