FROM python:3.11.3-slim

WORKDIR /app 

COPY requirements.txt ./

RUN pip3 install -r requirements.txt

COPY . . 

EXPOSE 8001

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]