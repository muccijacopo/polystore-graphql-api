from kafka import KafkaProducer
import json

class KafkaService:
    def __init__(self):
        self.producer = KafkaProducer(bootstrap_servers="50.17.90.7:29092", value_serializer=lambda v: json.dumps(v).encode('utf-8'))

    def send_message(self, topic, value):
        self.producer.send(topic, value)
