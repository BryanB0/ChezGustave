# EQUIPEMENTS

## `GET /equipements` get all equipements

`200` - returns the list of all equipements in the body:
```ts
{
   id: number,
   name: string
}
```

## `GET /equipements/:id` get an equipement by id

### body:
```ts
{
   id: number,
   name: string
}
```
### return:
- `404`: Equipement not found

## `POST /equipements` create an equipement

### body:
```ts
{
   id: number,
   name: string
}
```
### return:
- `201`: Equipement created
- `400`: Error missing something in the body: 'missing "name" field'. 

## `PUT /equipements/:id` update the details of an equipement by id

### body:
```ts
{
   id: number,
   name: string
}
```
### return:

- `200`: OK which confirms that the change has been made.
- `400`: Error missing something in the body: 'missing "name" field'. 
- `404`: Equipement not found

## `DELETE /equipements/:id` delete an equipement by id

### return:

- `200`: OK Equipement has been removed
- `404`: Equipement not found