# USERS

## `GET /users` get all users

`200` - returns the list of all users in the body:
```ts
{
   id: number,
   email: string,
   name: string,
   tel: string,
   password: string,
   is_admin: boolean
}
```

## `POST /users` create an user

### body:
```ts
{
   id: number,
   email: string,
   name: string,
   tel: string,
   password: string,
   is_admin: boolean
}
```

### return:
- `201`: User created
- `400`: Error missing something in the body: 'missing "email" field', 'missing "name" field', 'missing "tel" field' ect. 

## `GET /users/:id` get an user by id

### body:
```ts
{
   id: number,
   email: string,
   name: string,
   tel: string,
   password: string,
   is_admin: boolean
}
```
### return:
- `404`: User not found

## `PUT /users/:id` update the details of an user by id

### body:
```ts
{
   id: number,
   email: string,
   name: string,
   tel: string,
   password: string,
   is_admin: boolean
}
```
### return:

- `200`: OK which confirms that the change has been made.
- `400`: Error missing something in the body: 'missing "email" field', 'missing "name" field', 'missing "tel" field' ect. 
- `404`: User not found

## `DELETE /users/:id` delete an user by id

### return:
- `200`: OK User has been removed
- `404`: User not found