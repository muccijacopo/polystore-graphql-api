
import pandas as pd
from kafka_service import KafkaService
import ast

def process_artists(broker):
    for df in pd.read_csv("artists.csv", chunksize=500):
        df: pd.DataFrame = df
        for _, row in df.iterrows():
            data = {
                'id': row['id'],
                'name': row['name'],
                'popularity': row['popularity'],
                'followers': row['followers']
            }
            broker.send_message(topic='artists', value=data)

def process_tracks(broker):
     for df in pd.read_csv("tracks.csv", chunksize=500):
        df: pd.DataFrame = df
        for _, row in df.iterrows():
            data = {
                'id': row['id'],
                'name': row['name'],
                'popularity': row['popularity'],
                'duration': row['duration_ms'],
                'explicit': row['explicit'],
                'release_date': row['release_date'],
                'artist_id': ast.literal_eval(row['id_artists'])[0]
            }
    
            broker.send_message(topic='tracks', value=data)

def main():
    broker = KafkaService()
    process_artists(broker)
    # process_tracks(broker)

if __name__ == '__main__':
    main()
