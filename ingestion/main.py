
import pandas as pd
from kafka_service import KafkaService
import ast


def main():
    broker = KafkaService()
    rows1 = 0
    for df in pd.read_csv("artists.csv", chunksize=1000):
        df: pd.DataFrame = df
        rows1 += len(df.index)
        # for _, row in df.iterrows():
        #     data = {
        #         'id': row['id'],
        #         'name': row['name'],
        #         'popularity': row['popularity'],
        #         'followers': row['followers']
        #     }
            # broker.send_message(topic='artists', value=data)
    print(f"Artists: {rows1}")

    rows2 = 0
    for df in pd.read_csv("tracks.csv", chunksize=1000):
        df: pd.DataFrame = df
        rows2 += len(df.index)
        # for _, row in df.iterrows():
        #     data = {
        #         'id': row['id'],
        #         'name': row['name'],
        #         'popularity': row['popularity'],
        #         'duration': row['duration_ms'],
        #         'explicit': row['explicit'],
        #         'release_date': row['release_date'],
        #         'artist_id': ast.literal_eval(row['id_artists'])[0]
        #     }
    
            # broker.send_message(topic='tracks', value=data)
    print(f"Tracks: {rows2}")

if __name__ == '__main__':
    main()
