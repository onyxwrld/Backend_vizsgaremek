
-- Inserts for the menu table
INSERT INTO menu (name, type, price) VALUES ('Pilsner', 'drink', 17769);
INSERT INTO menu (name, type, price) VALUES ('IPA (India Pale Ale)', 'drink', 19469);
INSERT INTO menu (name, type, price) VALUES ('Stout', 'drink', 17059);
INSERT INTO menu (name, type, price) VALUES ('Porter', 'drink', 18557);
INSERT INTO menu (name, type, price) VALUES ('Weissbier', 'drink', 19765);
INSERT INTO menu (name, type, price) VALUES ('Lager', 'drink', 16154);
INSERT INTO menu (name, type, price) VALUES ('Bock', 'drink', 15286);
INSERT INTO menu (name, type, price) VALUES ('Saison', 'drink', 16592);
INSERT INTO menu (name, type, price) VALUES ('Belga Dubbel', 'drink', 19332);
INSERT INTO menu (name, type, price) VALUES ('Amber Ale', 'drink', 13735);
INSERT INTO menu (name, type, price) VALUES ('Mizse Szénsavmentes', 'drink', 0);
INSERT INTO menu (name, type, price) VALUES ('Chio paprikás', 'snack', 7500);
INSERT INTO menu (name, type, price) VALUES ('Chio intense', 'snack', 8500);

-- Inserts for the bicycle table
INSERT INTO bicycle (type, price) VALUES ('Small', 299990);
INSERT INTO bicycle (type, price) VALUES ('Medium', 320990);
INSERT INTO bicycle (type, price) VALUES ('Large', 380990);

-- Inserts for the opening table
INSERT INTO opening (id, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES 
(1, '8:00-22:00', '8:00-16:00', '10:00-14:00', '8:00-16:00', '8:00-16:00', '12:00-23:50', 'Closed');

-- Inserts for the torzsadatok table
INSERT INTO torzsadatok (id, phone_number, email, opening_hours_id, location, user_id) 
VALUES (1, '36204861415', 'ugyintezo@beercycle.com', 1, '1234 Budapest Egyip Tomi utca 23', 1);

INSERT INTO review (`rate`,`content`,`userId`) VALUES (4,"csár",1);
INSERT INTO review (`rate`,`content`,`userId`) VALUES (5,"Mindjárt kész a mobil",2);
INSERT INTO review (`rate`,`content`,`userId`) VALUES (4,"csávó",3);
