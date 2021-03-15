# Backend side

## Installation

### Sample users

```
Ola Nordmann {
  email: "ola@gmail.com",
  passowrd: "password"
}

Kari Nordmann {
  email: "kari@gmail.com",
  password: "password"
}
```

### Run server

```

cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

```

If you get syntax error, try:

```

cd backend
pipenv shell
pipenv install

```

```

```
