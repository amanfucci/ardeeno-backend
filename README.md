# ardeeno-backend
## Version: 0.1.0

### /utente

#### POST
##### Description

Create a new user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| x-access-token | header |  | No | string |
| body | body |  | No | [Utente](#utente) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | CREATED | [Utente](#utente) |
| 401 | Token non presente |  |
| 403 | FORBIDDEN |  |
| 500 | INTERNAL SERVER ERROR |  |

#### GET
##### Description

Get all users in system

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| x-access-token | header |  | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [Utente](#utente) ] |
| 401 | Token non presente |  |
| 403 | FORBIDDEN |  |
| 500 | INTERNAL SERVER ERROR |  |

#### DELETE
##### Description

Delete all users in system

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| x-access-token | header |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 401 | Token non presente |
| 403 | FORBIDDEN |
| 500 | INTERNAL SERVER ERROR |

### /utente/{email}

#### GET
##### Description

Get user with {email}

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| x-access-token | header |  | No | string |
| email | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [Utente](#utente) |
| 401 | Token non presente |  |
| 403 | FORBIDDEN |  |
| 500 | INTERNAL SERVER ERROR |  |

#### DELETE
##### Description

Delete user with {email}

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| x-access-token | header |  | No | string |
| email | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 401 | Token non presente |
| 403 | FORBIDDEN |
| 500 | INTERNAL SERVER ERROR |

### /auth

#### POST
##### Description

Authenticate and receive a token

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK |  |
| 401 | Email not correct |  |
| 403 | Password not correct |  |
| 500 | INTERNAL SERVER ERROR |  |

### Models

#### Utente

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| nome | string |  | No |
| cognome | string |  | No |
| telefono | string |  | No |
| email | string |  | No |
| indirizzo | string |  | No |
| password | string |  | No |
| tipo | string | _Enum:_ `"cliente"`, `"tecnico"`, `"supervisore"`, `"amministratore"` | No |
| email_confermata | boolean |  | No |
| cf | string |  | No |
| attivo | boolean |  | No |
