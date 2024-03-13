# LOGEMENTS

## `GET /logements` get all logements

`200` - returns the list of all logements in the body:
```ts
{
   id: number,
   images: string[],
   secteur: string,
   description: string,
   tarif_bas: number,
   tarif_moyen: number,
   tarif_haut: number,
   m_carre: number,
   chambre: number,
   salle_de_bain: number,
   categorie: string,
   type: string,
   equipements: Equipements[]
}
```

## `GET /logements/:id` get an logement by id

### body:
```ts
{
   id: number,
   images: string[],
   secteur: string,
   description: string,
   tarif_bas: number,
   tarif_moyen: number,
   tarif_haut: number,
   m_carre: number,
   chambre: number,
   salle_de_bain: number,
   categorie: string,
   type: string,
   equipements: Equipements[]
}
```
### return:
- `404`: Logement not found

## `GET /logements/:id/reservations` get the details of the reservations of an logement by id

### body:
```ts
{
   id: number,
   images: string[],
   secteur: string,
   description: string,
   tarif_bas: number,
   tarif_moyen: number,
   tarif_haut: number,
   m_carre: number,
   chambre: number,
   salle_de_bain: number,
   categorie: string,
   type: string,
   equipements: Equipements[]
}
```
### return:
- `404`: Logement not found

## `POST /logements` create an logement

### body:
```ts
{
   id: number,
   images: string[],
   secteur: string,
   description: string,
   tarif_bas: number,
   tarif_moyen: number,
   tarif_haut: number,
   m_carre: number,
   chambre: number,
   salle_de_bain: number,
   categorie: string,
   type: string,
   equipements: Equipements[]
}
```
### return:
- `201`: Logement created
- `400`: Error missing something in the body: 'missing "images" field', 'missing "secteur" field', 'missing "description" field' ect. 

## `PUT /logements/:id` update the details of an logement by id

### body:
```ts
{
   id: number,
   images: string[],
   secteur: string,
   description: string,
   tarif_bas: number,
   tarif_moyen: number,
   tarif_haut: number,
   m_carre: number,
   chambre: number,
   salle_de_bain: number,
   categorie: string,
   type: string,
   equipements: Equipements[]
}
```
### return:

- `200`: OK which confirms that the change has been made.
- `400`: Error missing something in the body: 'missing "images" field', 'missing "secteur" field', 'missing "description" field' ect.  
- `404`: Logement not found

## `DELETE /logements/:id` delete an logement by id

### return:

- `200`: OK Logement has been removed
- `404`: Logement not found