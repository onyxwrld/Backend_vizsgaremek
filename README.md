
# BeerCycle backend

A backend kezeli a felhasználók regisztrációját, bejelentkezését. Felhasználói kosár bővitését, módositását, törlését. Foglalások leadását amely leadást követően eltárolódnak az adatbázisban, igy a felhasználó nyomon követhezi saját rekord listáját. Szintúgy képes tömb visszaadására amely felhasználható frontend oldalon listázásra.





## Features

- Törzs adatok kezelése
- Biciklik kezelése
- Felhasználói vélemények kezelése
- Jogosultságok


## Installation

1. A fejelesztő dokumentáció megtekintéséhez előszőr telepitse a csomagokat.

```console
    npm i
```
2. Adatbázisba importálja a beerCycleDB.sql fájlt, majd inditsa el az adatbázist. Irja át az adatbázisban létre hozott tábla nevére a .env fájlban található url-t.
```console
DATABASE_URL="mysql://root@localhost/adatbázisod_neve"
```
3. Végül adja ki a szerver inditásához.
```console
    npm run start:dev
```
    
## Documentation


Ha a server sikeresen elindult nyissa meg a 
[Swagger ui dokumentációt](https://localhost:3000/api)

## Authors

- [Szabó Béla](https://github.com/onyxwrld)
- [Csontos Tibor](https://github.com/T-dogwest)
- [Szupkai Ricsi](https://github.com/Bluver11)


## License

[MIT](https://choosealicense.com/licenses/mit/)

