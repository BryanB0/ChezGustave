# RESERVATIONS

## `GET /reservations` get all reservations

`200` - returns the list of all reservations in the body:
```ts
{
   id: number,
   start_date: Date,
   end_date: Date,
   chef_cuisine: boolean,
   visite: Date,
   logement: Logements,
   user: Users,
   rating: Ratings
}
```

## `POST /reservations` create an reservation

### body:
```ts
{
   id: number,
   start_date: Date,
   end_date: Date,
   chef_cuisine: boolean,
   visite: Date,
   logement: Logements,
   user: Users,
   rating: Ratings
}
```
### return:
- `201`: Reservation created
- `400`: 
   - Error missing something in the body: 'missing "start_date" field', 'missing "end_date" field', 'missing "chef_cuisine" field' ect.
   - Error 'Invalid "User" ID', 'Invalid "logement" ID'.
   - Error 'Dates do not match !'.

## `GET /reservations/:id` get an reservation by id

### body:
```ts
{
   id: number,
   start_date: Date,
   end_date: Date,
   chef_cuisine: boolean,
   visite: Date,
   logement: Logements,
   user: Users,
   rating: Ratings
}
```
### return:
- `404`: Reservation not found

## `PUT /reservations/:id` update the details of an reservation by id

### body:
```ts
{
   id: number,
   start_date: Date,
   end_date: Date,
   chef_cuisine: boolean,
   visite: Date,
   logement: Logements,
   user: Users,
   rating: Ratings
}
```
### return:

- `200`: OK which confirms that the change has been made.
- `400`: 
   - Error missing something in the body: 'missing "start_date" field', 'missing "end_date" field', 'missing "chef_cuisine" field' ect.
   - Error 'Dates do not match !'.  
- `404`: Reservation not found

## `DELETE /reservations/:id` delete an reservation by id

### return:

- `200`: OK Reservation has been removed
- `404`: Reservation not found