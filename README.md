# DDB Knowledge Graph Editor

This repo contains the code for an online editor for
triples extracted from the [Deutsche Digitale Bibliothek](https://www.deutsche-digitale-bibliothek.de/).

## Environment Variables

Before running any code, make sure you have all required environment files setup and the included environment variables defined based on your setup.

Create a copy of the .template.env-file, rename it to .env, and fill in the variable values accordingly.

## Installation

There are two ways to install the required dependencies and
run the application servers:
individually or via Docker Compose.

### Individual setup (useful for development)

#### Backend Server

Navigate into the backend directory.

Create a [virtual environment](https://docs.python.org/3/library/venv.html)
by executing the following command:

```bash
python3 -m venv venv
```

To activate the virtual environment, execute:

```bash
source venv/bin/activate
```

Then, install all python libraries, the project relies on using
the package manager [pip](https://pip.pypa.io/en/stable/):

```bash
pip3 install -r requirements.txt
```

#### Frontend

Navigate into the frontend directory.

To install all required dependencies, run

```bash
npm install
```

### Docker Compose (recommended)

Before you get started, make sure you have
[Docker](https://www.docker.com/) and
[Docker Compose](https://docs.docker.com/compose/) installed.

To build the containers, from the project directory execute

```bash
docker-compose build
```

## Usage

### Individual setup (useful for development)

#### Backend

Navigate into the backend directory.

From there, activate your virtual environment and run

```bash
uvicorn server:app --reload -p 8000
```

#### Frontend

Navigate into the frontend directory.

From there, run

```bash
npm run start
```

The frontend should be available at _http://localhost:4200_.

### Setup and Usage with Docker Compose (recommended)

From within the project directory, run

```bash
docker-compose up
```

The frontend should be available at _http://localhost:80_.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
