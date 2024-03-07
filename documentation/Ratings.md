# RATINGS

## `GET /ratings` get all ratings

`200` - returns the list of all ratings in the body:
```ts
{
   id: number,
   rated: number,
   text: string,
   logement: Logements,
   reservation: Reservations,
   user: Users
}
```

## `POST /ratings` create an rating

### body:
```ts
{
   id: number,
   rated: number,
   text: string,
   logement: Logements,
   reservation: Reservations,
   user: Users
}
```
### return:
- `201`: Rating created
- `400`: 
   - Error missing something in the body: 'missing "rated" field', 'missing "text" field', 'missing "logement" field' ect. 
   - Error 'Invalid "logement" ID', 'Invalid "reservation" ID', 'Invalid "User" ID'

## `GET /ratings/:id` get an rating by id

### body:
```ts
{
   id: number,
   rated: number,
   text: string,
   logement: Logements,
   reservation: Reservations,
   user: Users
}
```
### return:
- `404`: Rating not found

## `PUT /ratings/:id` update the details of an rating by id

### body:
```ts
{
   id: number,
   rated: number,
   text: string,
   logement: Logements,
   reservation: Reservations,
   user: Users
}
```
### return:

- `200`: OK which confirms that the change has been made.
- `400`: Error missing something in the body: 'missing "rated" field', 'missing "text" field', 'missing "logement" field' ect.   
- `404`: Rating not found

## `DELETE /ratings/:id` delete an rating by id

### return:

- `200`: OK Rating has been removed
- `404`: Rating not found